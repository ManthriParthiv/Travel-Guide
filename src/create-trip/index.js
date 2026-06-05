import React, { useEffect, useState } from 'react';
import { SelectBudgetList, SelectTravelList } from '../constants/options';
import "./index.css";
import { AIPrompt } from '../service/AImodel';
import axios from 'axios';
import { doc, setDoc } from 'firebase/firestore';
import { db, auth } from '../service/firebaseConfig';
import { useNavigate } from 'react-router-dom';
import Navbar2 from '../components/Navbar2';
import Footer from '../components/Footer';
import LoadingSpinner from '../view-trip/[tripid]/components/LoadingSpinner';

function Createtrip() {
  const [place, setplace] = useState();
  const [FormData, SetFormData] = useState({});
  const [selectedBudget, setSelectedBudget] = useState(null);
  const [selectedTravelType, setSelectedTravelType] = useState(null);  
  const [loading, setLoading] = useState(false);
  const [generatedPlan, setGeneratedPlan] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  
  // Refined planning states
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [selectedAccessibility, setSelectedAccessibility] = useState([]);
  const [selectedSeason, setSelectedSeason] = useState('');
  const [selectedDiet, setSelectedDiet] = useState('');

  const navigate = useNavigate();

  const interestsList = [
    { id: 'sightseeing', label: '🧭 Sightseeing' },
    { id: 'adventure', label: '🧗 Adventure' },
    { id: 'food', label: '🍔 Food/Dining' },
    { id: 'relaxation', label: '🏖️ Relaxation' },
    { id: 'shopping', label: '🛍️ Shopping' },
    { id: 'culture', label: '🏛️ History/Culture' },
    { id: 'nightlife', label: '🍷 Nightlife' }
  ];

  const seasonsList = [
    { value: '', label: 'Any Season / Flexible' },
    { value: 'summer', label: '☀️ Summer' },
    { value: 'winter', label: '❄️ Winter' },
    { value: 'spring', label: '🌸 Spring' },
    { value: 'autumn', label: '🍂 Autumn' },
    { value: 'monsoon', label: '🌧️ Monsoon/Rainy' }
  ];

  const dietsList = [
    { value: '', label: 'No Restrictions' },
    { value: 'vegetarian', label: 'Vegetarian' },
    { value: 'vegan', label: 'Vegan' },
    { value: 'gluten-free', label: 'Gluten-Free' }
  ];

  const accessibilityList = [
    { id: 'kid', label: '👶 Kid-Friendly' },
    { id: 'wheelchair', label: '♿ Wheelchair Accessible' },
    { id: 'elderly', label: '👴 Elderly-Friendly' },
    { id: 'pet', label: '🐾 Pet-Friendly' }
  ];

  const fetchSuggestions = async (query) => {
    if (!query || query.length < 2) {
      setSuggestions([]);
      return;
    }
    try {
      const apiKey = process.env.REACT_APP_GEOAPIFY_API_KEY || '52b70eb8d13b4775b59a4a434e01d103';
      const response = await axios.get(
        `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(query)}&apiKey=${apiKey}`
      );
      if (response.data && response.data.features) {
        setSuggestions(response.data.features);
      }
    } catch (error) {
      console.error("Error fetching place suggestions:", error);
    }
  };

  const handleSuggestionClick = (formattedName) => {
    setplace(formattedName);
    handleInputChange('location', { label: formattedName });
    setSuggestions([]);
  };

  const handleInputChange = (name, value) => {
    SetFormData({
      ...FormData,
      [name]: value
    });
  };

  useEffect(() => {
    console.log(FormData);
  }, [FormData]);

  const cleanGeminiResponse = (text) => {
    try {
      const jsonMatch = text.match(/```json([\s\S]*?)```/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[1].trim());
      }
      return JSON.parse(text);
    } catch (err) {
      console.error("Failed to parse response as JSON:", err);
      return null;
    }
  };

  const handleInterestSelect = (interestLabel) => {
    setSelectedInterests(prev => {
      const updated = prev.includes(interestLabel)
        ? prev.filter(i => i !== interestLabel)
        : [...prev, interestLabel];
      handleInputChange('interests', updated);
      return updated;
    });
  };

  const handleAccessibilitySelect = (accessLabel) => {
    setSelectedAccessibility(prev => {
      const updated = prev.includes(accessLabel)
        ? prev.filter(a => a !== accessLabel)
        : [...prev, accessLabel];
      handleInputChange('accessibility', updated);
      return updated;
    });
  };

  const handleSeasonChange = (e) => {
    setSelectedSeason(e.target.value);
    handleInputChange('season', e.target.value);
  };

  const handleDietChange = (e) => {
    setSelectedDiet(e.target.value);
    handleInputChange('diet', e.target.value);
  };

  // Helper to find the day plan case-insensitively and through key name variations
  const findDayPlan = (itinerary, dayNumber) => {
    if (!itinerary) return null;
    
    // 1. Direct match: day1, day2, etc.
    const directKey = `day${dayNumber}`;
    if (itinerary[directKey]) return itinerary[directKey];
    
    // 2. Case-insensitive key searches (e.g. Day1, DAY1)
    const keys = Object.keys(itinerary);
    const lowercaseDirect = directKey.toLowerCase();
    for (const key of keys) {
      if (key.toLowerCase() === lowercaseDirect) {
        return itinerary[key];
      }
    }
    
    // 3. Regex checks for spaces, hyphens, and underlines (e.g. day 1, Day-1, day_1)
    const regex = new RegExp(`day\\s*[-_]?\\s*${dayNumber}`, 'i');
    for (const key of keys) {
      if (regex.test(key)) {
        return itinerary[key];
      }
    }
    
    // 4. Checking if the key is just the index number (e.g. "1", "2")
    for (const key of keys) {
      if (key.trim() === String(dayNumber)) {
        return itinerary[key];
      }
    }
    
    return null;
  };

  const OnGenerate = async () => {
    setLoading(true);
    try {
      const groqApiKey = process.env.REACT_APP_GROQ_API_KEY;
      if (!groqApiKey) {
        throw new Error("Groq API Key is missing. Please add it to your environment variables.");
      }

      // Generate prompt with new refined traveler details
      const FINAL_PROMPT = AIPrompt(
        FormData?.location?.label,
        FormData?.noOfDays,
        FormData?.Traveller,
        FormData?.Budget,
        FormData?.interests,
        FormData?.season,
        FormData?.diet,
        FormData?.accessibility
      );

      // Call Groq Llama 3 API for structured travel plan JSON
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
          max_tokens: 4096, // Increase output token allowance to guarantee full multiday itinerary generation
          response_format: { type: "json_object" }
        },
        {
          headers: {
            Authorization: `Bearer ${groqApiKey}`,
            'Content-Type': 'application/json'
          }
        }
      );

      const text = response.data.choices[0].message.content;
      console.log("Generated Plan (Groq):", text);

      // Save AI trip to Firebase
      await SaveAItrip(text);

      setGeneratedPlan(text);
    } catch (error) {
      console.error("Error generating trip:", error);
      alert(error.message || "Something went wrong while generating trip.");
    } finally {
      setLoading(false);
    }
  };

  const SaveAItrip = async (TripData) => {
    setLoading(true);
    const Docid = Date.now().toString();
    
    const parsedData = cleanGeminiResponse(TripData);
    
    if (!parsedData) {
      console.error("TripData could not be saved due to invalid JSON.");
      setLoading(false);
      return;
    }

    // Strict client-side day validation. Discards extra days, backfills missing days.
    const requestedDays = parseInt(FormData.noOfDays) || 1;
    if (parsedData.itinerary) {
      const cleanedItinerary = {};
      for (let i = 1; i <= requestedDays; i++) {
        const targetDayPlan = findDayPlan(parsedData.itinerary, i);
        const dayKey = `day${i}`;
        if (targetDayPlan) {
          cleanedItinerary[dayKey] = targetDayPlan;
        } else {
          // Backfill placeholder itinerary details for missing days
          cleanedItinerary[dayKey] = {
            theme: "Sightseeing & Local Culture",
            plan: [
              {
                placeName: `Explore ${FormData.location?.label?.split(',')[0] || 'Local Attractions'}`,
                placeDetails: "Enjoy a self-guided discovery of local monuments, galleries, and cafes.",
                placeImageUrl: "",
                ticketPricing: "Free",
                timeToVisit: "Flexible"
              }
            ]
          };
        }
      }
      parsedData.itinerary = cleanedItinerary;
    }

    const userEmail = auth.currentUser?.email || 'anonymous';
    const userId = auth.currentUser?.uid || 'anonymous';

    await setDoc(doc(db, "AItrips", Docid), {
      userSelection: FormData,
      tripdata: parsedData,
      userEmail: userEmail,
      userId: userId,
      createdAt: new Date().toISOString()
    });

    setLoading(false);
    navigate("/view-trip/"+Docid)
  };

  const handleBudgetSelect = (item) => {
    setSelectedBudget(item.id);
    handleInputChange('Budget', item.title);
  };

  const handleTravelTypeSelect = (item) => {
    setSelectedTravelType(item.id);
    handleInputChange('Traveller', item.title);
  };

  return (
    <div className="page-wrapper">
      <Navbar2/>
      {loading && <LoadingSpinner />}
      
      <div className="trip-planner-container content-wrapper">
        <h1 className="page-title">Plan Your Perfect Trip</h1>
        <p className="page-subtitle">Configure your preferences below, and our AI assistant will draft a customized itinerary tailored specifically to your needs.</p>
        
        {/* Destination Search */}
        <div className="form-section">
          <h2 className="section-title">Enter The Place to Travel:</h2>
          <p className="text-muted small mb-3">Where is your next adventure taking you?</p>
          <div className="input-container" style={{ position: 'relative' }}>
            <input
              type="text"
              className="location-text-input"
              placeholder="e.g., Paris, France or Tokyo, Japan"
              value={place || ''}
              onChange={(e) => {
                setplace(e.target.value);
                handleInputChange('location', { label: e.target.value });
                fetchSuggestions(e.target.value);
              }}
              onBlur={() => {
                setTimeout(() => setSuggestions([]), 200);
              }}
            />
            {suggestions.length > 0 && (
              <ul className="suggestions-list">
                {suggestions.map((item, idx) => (
                  <li 
                    key={idx} 
                    className="suggestion-item"
                    onMouseDown={() => handleSuggestionClick(item.properties.formatted)}
                  >
                    📍 {item.properties.formatted}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Days Input */}
        <div className="form-section">
          <h2 className="section-title">Number of Days</h2>
          <p className="text-muted small mb-3">Specify the duration of your stay.</p>
          <input 
            type='number' 
            placeholder='Days'
            className="days-input"
            min="1"
            max="15"
            onChange={(e) => handleInputChange('noOfDays', e.target.value)}
          />
        </div>

        {/* Budget Select */}
        <div className="form-section">
          <h2 className="section-title">Select Your Budget:</h2>
          <p className="text-muted small mb-3">How do you plan to manage your expenses?</p>
          <div className="options-container">
            {SelectBudgetList.map((item) => (
              <div
                key={item.id}
                className={`option-card ${selectedBudget === item.id ? 'selected' : ''}`}
                onClick={() => handleBudgetSelect(item)}
              >
                <div className="option-icon">{item.icon}</div>
                <h3 className="option-title">{item.title}</h3>
                <p className="option-description">{item.description}</p>
                <span className="option-range">{item.range}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Companions Select */}
        <div className="form-section">
          <h2 className="section-title">Traveling With:</h2>
          <p className="text-muted small mb-3">Who is accompanying you on this journey?</p>
          <div className="options-container">
            {SelectTravelList.map((item) => (
              <div
                key={item.id}
                className={`option-card ${selectedTravelType === item.id ? 'selected' : ''}`}
                onClick={() => handleTravelTypeSelect(item)}
              >
                <div className="option-icon">{item.icon}</div>
                <h3 className="option-title">{item.title}</h3>
                <p className="option-description">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* New Refinement: Travel Interests */}
        <div className="form-section">
          <h2 className="section-title">Select Your Travel Interests:</h2>
          <p className="text-muted small mb-3">Choose one or more categories to customize your itinerary activities.</p>
          <div className="pills-container">
            {interestsList.map((item) => (
              <div
                key={item.id}
                className={`pill-card ${selectedInterests.includes(item.label) ? 'selected' : ''}`}
                onClick={() => handleInterestSelect(item.label)}
              >
                {item.label}
              </div>
            ))}
          </div>
        </div>

        {/* New Refinement: Season & Diet Dropdowns */}
        <div className="form-section">
          <h2 className="section-title">Refine Details (Season & Diet):</h2>
          <div className="selector-row">
            <div className="dropdown-wrapper">
              <span className="dropdown-label">Preferred Season</span>
              <select className="planner-dropdown" value={selectedSeason} onChange={handleSeasonChange}>
                {seasonsList.map((season) => (
                  <option key={season.value} value={season.value}>{season.label}</option>
                ))}
              </select>
            </div>
            
            <div className="dropdown-wrapper">
              <span className="dropdown-label">Dietary Preference</span>
              <select className="planner-dropdown" value={selectedDiet} onChange={handleDietChange}>
                {dietsList.map((diet) => (
                  <option key={diet.value} value={diet.value}>{diet.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* New Refinement: Accessibility & Requirements */}
        <div className="form-section">
          <h2 className="section-title">Special Accessibility & Needs:</h2>
          <p className="text-muted small mb-3">Select any specific requirements to tailor your travel plans.</p>
          <div className="pills-container">
            {accessibilityList.map((item) => (
              <div
                key={item.id}
                className={`pill-card ${selectedAccessibility.includes(item.label) ? 'selected' : ''}`}
                onClick={() => handleAccessibilitySelect(item.label)}
              >
                {item.label}
              </div>
            ))}
          </div>
        </div>

        {/* Submit Action */}
        <div className="action-section">
          <button 
            className="generate-button"
            onClick={OnGenerate}
            disabled={!FormData.location || !FormData.noOfDays || !FormData.Budget || !FormData.Traveller || loading}
          >
            {loading ? "Generating Plan..." : "Generate Trip Plan"}
          </button>
        </div>

        {generatedPlan && (
          <div className="result-section">
            <h2>Generated Trip Plan:</h2>
            <pre>{generatedPlan}</pre>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Createtrip;
