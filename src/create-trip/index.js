import React, { useEffect, useState } from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { SelectBudgetList, SelectTravelList } from '../constants/options';
import "./index.css";
import { AIPrompt } from '../service/AImodel';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../service/firebaseConfig';
import { useNavigate} from 'react-router-dom';
import Chatbot from '../components/Chatbot';
import Navbar2 from '../components/Navbar2';
import Footer from '../components/Footer';

function Createtrip() {
  const [place, setplace] = useState();
  const [FormData, SetFormData] = useState({});
  const [selectedBudget, setSelectedBudget] = useState(null);
  const [selectedTravelType, setSelectedTravelType] = useState(null);  
  const [loading, setLoading] = useState(false);
  const [generatedPlan, setGeneratedPlan] = useState(null);
  const [chatHistory,setChatHistory] = useState([]);
  const navigate = useNavigate();

  const GoogleMapsApiKey = process.env.REACT_APP_GOOGLE_API_KEY;


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
    console.error("Failed to parse Gemini response as JSON:", err);
    return null;
  }
};

  const OnGenerate = async () => {
  setLoading(true);
  try {
    const genAI = new GoogleGenerativeAI(
   process.env.REACT_APP_GEMINI_API_KEY,
);

    console.log("API KEY:", process.env.REACT_APP_GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const chat = model.startChat({ history: [] });

    const FINAL_PROMPT = AIPrompt(
      FormData?.location?.label,
      FormData?.noOfDays,
      FormData?.Traveller,
      FormData?.Budget
    );


    const result = await chat.sendMessage(FINAL_PROMPT);

    if (!result || !result.response) {
      throw new Error("No response from Gemini model");
    }

    const response = result.response;
    const text = await response.text();
    console.log("Generated Plan:", text);

    // Save AI trip to Firebase
    await SaveAItrip(text);

    setGeneratedPlan(text);
  } catch (error) {
    console.error("Error generating trip:", error);
    console.dir(error, { depth: null });
    alert("Something went wrong while generating trip.");
  } finally {
    setLoading(false);
  }
};

// SaveAItrip function should be OUTSIDE of OnGenerate
const SaveAItrip = async (TripData) => {
  setLoading(true);
  const Docid = Date.now().toString();
  
  const parsedData = cleanGeminiResponse(TripData);
  
  if (!parsedData) {
    console.error("TripData could not be saved due to invalid JSON.");
    setLoading(false);
    return;
  }

  await setDoc(doc(db, "AItrips", Docid), {
    userSelection: FormData,
    tripdata: parsedData
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
    <div>
      <Navbar2/>
    <div className="trip-planner-container">
      <h1 className="page-title">Plan Your Perfect Trip</h1>
      
      <div className="form-section">
        <h2 className="section-title">Enter The Place to Travel:</h2>
        <div className="input-container">
          <GooglePlacesAutocomplete
            apiKey={GoogleMapsApiKey}
            selectProps={{
              place,
              onChange: (v) => { setplace(v); handleInputChange('location', v) },
              className: 'location-search-input',
              placeholder: 'Search for a destination...'
            }}
          />
        </div>
      </div>

      <div className="form-section">
        <h2 className="section-title">Number of Days</h2>
        <input 
          type='number' 
          placeholder='Days'
          className="days-input"
          min="1"
          onChange={(e) => handleInputChange('noOfDays', e.target.value)}
        />
      </div>

      <div className="form-section">
        <h2 className="section-title">Select Your Budget:</h2>
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

      <div className="form-section">
        <h2 className="section-title">Traveling With:</h2>
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

      <div className="action-section">
        <button 
          className="generate-button"
          onClick={OnGenerate}
          disabled={!FormData.location || !FormData.noOfDays || !FormData.Budget || !FormData.Traveller || loading}
        >
          {loading ? "Generating..." : "Generate Trip Plan"}
        </button>
      </div>

      {generatedPlan && (
        <div className="result-section">
          <h2>Generated Trip Plan:</h2>
          <pre>{generatedPlan}</pre>
        </div>
      )}
    </div>
  <div>
    <Chatbot chatHistory={chatHistory} setChatHistory={setChatHistory}/>
  </div>
    <Footer/>
</div>
  );
}

export default Createtrip;
