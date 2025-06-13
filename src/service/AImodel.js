import { GoogleGenerativeAI } from "@google/generative-ai";

// You should store your API Key in environment variables for security
const apiKey = process.env.REACT_APP_GEMINI_API_KEY; // much safer than hardcoding!
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
});

const generationConfig = {
  temperature: 0.7,  // slightly lower for more deterministic output
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

// Generate safer prompt
export const AIPrompt = (place, days, travelers, budgetType) => {
  return `Generate a complete Travel Plan for Location: ${place}, for exactly ${days} full days for ${travelers} with a ${budgetType} budget.
The response must include:
- An 'itinerary' object with exactly ${days} days: 'day1', 'day2', ..., 'day${days}'.
- Each day must contain a theme and at least 3-4 activities.
- Return strict valid JSON only. Do not include explanations or text before or after JSON.

{
  "hotelOptions": [
    {
      "hotelName": "",
      "hotelAddress": "",
      "price": "",
      "hotelImageUrl": "",
      "geoCoordinates": { "latitude": "", "longitude": "" },
      "rating": "",
      "description": ""
    }
  ],
  "itinerary": {
    "day1": {
      "theme": "",
      "plan": [
        {
          "placeName": "",
          "placeDetails": "",
          "placeImageUrl": "",
          "geoCoordinates": { "latitude": "", "longitude": "" },
          "ticketPricing": "",
          "rating": "",
          "timeToVisit": "",
          "bestTimeToVisit": "",
          "travelTimeFromHotel": "",
          "travelTimeFromPrevious": ""
        }
      ]
    }
  }
}
`;
};

// Generate travel plan safely
export const createTravelPlan = async (place, days, travelers, budgetType) => {
  try {
    const chatSession = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [{ text: AIPrompt(place, days, travelers, budgetType) }],
        },
      ],
    });

    const result = await chatSession.sendMessage("");
    const response = await result.response.text();

    // Extract only JSON using regex
    const jsonMatch = response.match(/{[\s\S]*}/);
    if (!jsonMatch) {
      throw new Error("Invalid JSON output from AI model.");
    }

    const travelPlan = JSON.parse(jsonMatch[0]);
    return travelPlan;

  } catch (error) {
    console.error("Error generating travel plan:", error);
    throw error;
  }
};
