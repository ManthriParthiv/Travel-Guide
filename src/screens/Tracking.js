import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Navbar2 from '../components/Navbar2';
import Footer from '../components/Footer';
import { auth, db } from '../service/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import axios from 'axios';
import { GoogleGenerativeAI } from "@google/generative-ai";
import '../styles/Tracking.css';

export default function Tracking() {
  const [user, setUser] = useState(null);
  const [transitType, setTransitType] = useState('flight'); // flight, train, bus
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [resultData, setResultData] = useState(null);
  const [loadingStep, setLoadingStep] = useState(0);

  // Auth state listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Loading messages loop
  useEffect(() => {
    let interval;
    if (loading) {
      interval = setInterval(() => {
        setLoadingStep((prev) => (prev + 1) % 4);
      }, 2000);
    } else {
      setLoadingStep(0);
    }
    return () => clearInterval(interval);
  }, [loading]);

  const loadingMessages = [
    "📡 Connecting to global transit database...",
    "🔍 Querying safety audit logs and vehicle parameters...",
    "🗺️ Formatting route timeline stops and visual itinerary...",
    "✍️ Assembling precautions and traveler considerations..."
  ];

  const cleanResponse = (text) => {
    try {
      const jsonMatch = text.match(/```json([\s\S]*?)```/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[1].trim());
      }
      return JSON.parse(text.trim());
    } catch (err) {
      console.error("Failed to parse response as JSON:", err);
      // Try to isolate the JSON object
      try {
        const startBracket = text.indexOf('{');
        const endBracket = text.lastIndexOf('}');
        if (startBracket !== -1 && endBracket !== -1) {
          const rawJson = text.substring(startBracket, endBracket + 1);
          return JSON.parse(rawJson);
        }
      } catch (innerErr) {
        console.error("Inner parsing fallback failed:", innerErr);
      }
      return null;
    }
  };

  const makePrompt = (type, identifier) => {
    return `You are an expert transit AI analyzer. Retrieve and output comprehensive journey information for this specific transit:
Transit Type: ${type}
Transit Identifier: ${identifier}

Provide real or typical journey facts including duration, safety assessment, step-by-step stops/route details, and precautions.
You must return ONLY a valid, raw JSON object matching the requested schema. Do not include markdown formatting tags like \`\`\`json, notes, or introductory text.

Requested JSON Schema:
{
  "identifier": "${identifier}",
  "type": "${type}",
  "name": "Official Service Name (e.g., Shatabdi Express 12002 or Emirates Flight EK506)",
  "duration": "Total journey duration (e.g., 6 hours 40 mins)",
  "safetyRating": "Safety rating out of 5 (e.g., 4.7/5)",
  "safetyDescription": "Detailed overview of the safety track record, vehicle conditions, security measures, and reliability.",
  "canBeTrue": true,
  "route": {
    "origin": "Origin City/Station",
    "destination": "Destination City/Station",
    "stops": [
      {
        "name": "Station/Stop/Airport name",
        "type": "Origin | Destination | Intermediate",
        "time": "Departure/Arrival time or duration offset (e.g. 06:00 AM or +2h)",
        "description": "Brief info about this station or stop"
      }
    ]
  },
  "precautions": [
    "Specific precaution or safety measure 1",
    "Specific precaution or safety measure 2",
    "Specific precaution or safety measure 3"
  ],
  "considerations": [
    "Important passenger consideration 1 (e.g., dining, baggage limits, comfort, typical delays)",
    "Important passenger consideration 2",
    "Important passenger consideration 3"
  ]
}

Note: Set "canBeTrue" to true if the entered transit identifier represents a real-world known service/number/route (e.g. a real flight like EK506, a real Indian train like 12002, or a standard city bus route). Set "canBeTrue" to false if the identifier is hypothetical, unrecognized, or completely fake.`;
  };

  const SaveTrackingData = async (trackingData) => {
    try {
      const docId = Date.now().toString();
      const userEmail = auth.currentUser?.email || 'anonymous';
      const userId = auth.currentUser?.uid || 'anonymous';
      await setDoc(doc(db, "AITracking", docId), {
        searchQuery: searchQuery.trim(),
        transitType,
        result: trackingData,
        userEmail,
        userId,
        createdAt: new Date().toISOString()
      });
      console.log("Transit query saved to database:", docId);
    } catch (e) {
      console.error("Error saving tracking details to database:", e);
    }
  };

  const handleAITrack = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setLoading(true);
    setError('');
    setResultData(null);

    const FINAL_PROMPT = makePrompt(transitType, searchQuery.trim());

    try {
      const groqApiKey = process.env.REACT_APP_GROQ_API_KEY;
      const geminiApiKey = process.env.REACT_APP_GEMINI_API_KEY;
      let responseText = '';

      if (groqApiKey) {
        // Groq API Call
        const response = await axios.post(
          'https://api.groq.com/openai/v1/chat/completions',
          {
            messages: [
              {
                role: "system",
                content: "You are a helpful travel planning assistant. You must return ONLY a valid, raw JSON object matching the requested schema. Do not output any notes, markdown code blocks, or introductory text."
              },
              {
                role: "user",
                content: FINAL_PROMPT
              }
            ],
            model: 'llama-3.3-70b-versatile',
            temperature: 0.7,
            response_format: { type: "json_object" }
          },
          {
            headers: {
              Authorization: `Bearer ${groqApiKey}`,
              'Content-Type': 'application/json'
            }
          }
        );
        responseText = response.data.choices[0].message.content;
      } else if (geminiApiKey) {
        // Gemini API Fallback
        const genAI = new GoogleGenerativeAI(geminiApiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
        const result = await model.generateContent(FINAL_PROMPT);
        responseText = result.response.text();
      } else {
        throw new Error("API Keys are not configured. Please ensure REACT_APP_GROQ_API_KEY or REACT_APP_GEMINI_API_KEY is present in your environment configurations.");
      }

      const parsedData = cleanResponse(responseText);
      if (!parsedData) {
        throw new Error("Unable to decode the journey plan correctly. Please try clicking Track again.");
      }

      setResultData(parsedData);
      
      // Save data to Firebase database to allow cross-checking elsewhere
      await SaveTrackingData(parsedData);

    } catch (err) {
      console.error("AI Tracking Error:", err);
      setError(err.message || "Failed to analyze the journey ID with AI.");
    } finally {
      setLoading(false);
    }
  };

  const getPlaceholder = () => {
    switch (transitType) {
      case 'flight':
        return 'Enter Flight Number (e.g. AI101, EK506, LH756)';
      case 'train':
        return 'Enter Train Name/No. (e.g. 12002, 12626, Rajdhani)';
      default:
        return 'Enter Bus Route/Company (e.g. Route 502, Greyhound)';
    }
  };

  const getTransitIcon = (type) => {
    switch (type) {
      case 'flight': return '✈️';
      case 'train': return '🚆';
      default: return '🚌';
    }
  };

  return (
    <div className="page-wrapper">
      {user ? <Navbar2 /> : <Navbar />}

      <main className="content-wrapper container py-5" style={{ marginTop: '5.5rem' }}>
        
        {/* Header Hero */}
        <section className="tracking-hero text-center mb-5">
          <h1 className="tracking-title">🛰️ AI Journey Analyzer</h1>
          <p className="tracking-subtitle">
            Input any flight, train, or bus identification code to retrieve complete route structures, duration metrics, safety reports, precautions, and other key travel considerations powered by AI.
          </p>
        </section>

        {/* Input Panel */}
        <div className="tracking-content-card glass-panel mb-5">
          <h2 className="section-title text-center mb-4">Select Category & Transit ID</h2>
          
          {/* Category Selectors (Limited to Flights, Trains, and Buses) */}
          <div className="transit-selector-grid mb-4">
            <button 
              type="button" 
              className={`transit-pill-btn ${transitType === 'flight' ? 'active' : ''}`}
              onClick={() => setTransitType('flight')}
            >
              <span className="pill-icon">✈️</span>
              <span className="pill-text">Flights</span>
            </button>
            <button 
              type="button" 
              className={`transit-pill-btn ${transitType === 'train' ? 'active' : ''}`}
              onClick={() => setTransitType('train')}
            >
              <span className="pill-icon">🚆</span>
              <span className="pill-text">Trains</span>
            </button>
            <button 
              type="button" 
              className={`transit-pill-btn ${transitType === 'bus' ? 'active' : ''}`}
              onClick={() => setTransitType('bus')}
            >
              <span className="pill-icon">🚌</span>
              <span className="pill-text">Buses</span>
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleAITrack} className="search-form-wrapper">
            <div className="search-input-group">
              <input 
                type="text" 
                className="form-control tracking-input-lg"
                placeholder={getPlaceholder()}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                required
              />
              <button type="submit" className="btn btn-primary tracking-action-btn" disabled={loading}>
                {loading ? 'Analyzing...' : 'Analyze Journey'}
              </button>
            </div>
          </form>

          {error && (
            <div className="error-alert-box mt-4 text-center">
              <span className="error-icon">⚠️</span>
              <p className="error-msg m-0">{error}</p>
            </div>
          )}
        </div>

        {/* Loading Spinner Screen */}
        {loading && (
          <div className="loading-card-wrapper glass-panel text-center py-5 mb-5">
            <div className="pulsing-loader-circle mb-4">
              <span className="pulse-icon">{getTransitIcon(transitType)}</span>
            </div>
            <h3 className="loading-title mb-2">Analyzing Transit Data</h3>
            <p className="loading-message text-muted font-mono">{loadingMessages[loadingStep]}</p>
          </div>
        )}

        {/* Results display */}
        {resultData && !loading && (
          <div className="results-display-wrapper animate-fade-in">
            
            {/* Summary Overview Card */}
            <div className="result-overview-card glass-panel mb-4">
              <div className="row g-4 align-items-center">
                <div className="col-md-8 text-left">
                  <div className="d-flex align-items-center flex-wrap gap-2 mb-2">
                    <span className="result-type-badge">
                      {getTransitIcon(resultData.type)} {resultData.type?.toUpperCase()}
                    </span>
                    <span className="result-id-badge">
                      ID: {resultData.identifier}
                    </span>
                    
                    {/* canBeTrue verified indicator to allow cross-checking */}
                    {resultData.canBeTrue ? (
                      <span className="badge bg-success text-white py-2 px-3 fw-bold rounded-pill">
                        ✓ Confirmed Service
                      </span>
                    ) : (
                      <span className="badge bg-warning text-dark py-2 px-3 fw-bold rounded-pill">
                        ⚠️ Hypothetical / Unverified Service
                      </span>
                    )}
                  </div>
                  <h2 className="result-name-title mb-3">{resultData.name}</h2>
                  <p className="result-safety-desc mb-0">{resultData.safetyDescription}</p>
                </div>
                <div className="col-md-4 text-center">
                  <div className="overview-stats-grid">
                    <div className="stat-box">
                      <span className="stat-label">⏳ ESTIMATED TIME</span>
                      <span className="stat-value">{resultData.duration}</span>
                    </div>
                    <div className="stat-box mt-3">
                      <span className="stat-label">🛡️ SAFETY RATING</span>
                      <span className="stat-value text-success">{resultData.safetyRating}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Stepper Timeline & Precautions Cards */}
            <div className="row g-4 mb-4">
              
              {/* Stepper Timeline Visual Card */}
              <div className="col-lg-6">
                <div className="result-timeline-card glass-panel h-100 text-left">
                  <h3 className="card-section-title mb-4">🗺️ Visual Travel Timeline</h3>
                  
                  <div className="visual-stepper">
                    <div className="stepper-line"></div>
                    
                    {resultData.route?.stops?.map((stop, index) => {
                      let stopClass = "stop-node";
                      let stopIcon = "📍";
                      if (index === 0) {
                        stopClass = "stop-node origin";
                        stopIcon = "🛫";
                      } else if (index === resultData.route.stops.length - 1) {
                        stopClass = "stop-node destination";
                        stopIcon = "🏁";
                      } else {
                        stopClass = "stop-node intermediate";
                        stopIcon = "🔸";
                      }

                      return (
                        <div key={index} className="stepper-item">
                          <div className={stopClass}>
                            <span className="stop-icon">{stopIcon}</span>
                          </div>
                          <div className="stepper-content py-2">
                            <div className="d-flex justify-content-between align-items-center">
                              <h4 className="stop-name small font-bold">{stop.name}</h4>
                              <span className="stop-time-badge">{stop.time}</span>
                            </div>
                            <p className="stop-desc text-muted m-0">{stop.description}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Safety, Precautions & Other considerations */}
              <div className="col-lg-6">
                <div className="result-precautions-card glass-panel h-100 text-left">
                  <h3 className="card-section-title mb-4">🛡️ Safety Precautions & Measures</h3>
                  
                  <ul className="precaution-list mb-4">
                    {resultData.precautions?.map((precaution, index) => (
                      <li key={index} className="precaution-item">
                        <span className="check-icon">✓</span>
                        <p className="precaution-text m-0">{precaution}</p>
                      </li>
                    ))}
                  </ul>

                  <h3 className="card-section-title mt-5 mb-4">💡 Other Important Considerations</h3>
                  
                  <ul className="considerations-list">
                    {resultData.considerations?.map((consideration, index) => (
                      <li key={index} className="consideration-item">
                        <span className="info-icon">ℹ</span>
                        <p className="consideration-text m-0">{consideration}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

            </div>

          </div>
        )}

      </main>

      <Footer />
    </div>
  );
}
