import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.REACT_APP_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

// Initialize Gemini (preserved as import configuration fallback if needed)
export const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
});

export const generationConfig = {
  temperature: 0.7,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

// Generate refined, complete travel plan prompt
export const AIPrompt = (place, days, travelers, budgetType, interests = [], season = '', diet = '', accessibility = '') => {
  return `Generate a complete Travel Plan for Location: ${place}, for exactly ${days} full days for ${travelers} with a ${budgetType} budget.
Additional Trip Preferences:
- Travelers interests / activities: ${interests.length > 0 ? interests.join(', ') : 'General sightseeing'}
- Desired travel season: ${season || 'Any season'}
- Dietary restriction: ${diet || 'None'}
- Special requirements/accessibility: ${accessibility || 'None'}

CRITICAL REQUIREMENT:
- The 'itinerary' object MUST contain exactly ${days} days, using keys: 'day1', 'day2', ..., 'day${days}'.
- You must generate plans for all ${days} days. Do not generate fewer than ${days} days, and do not generate more than ${days} days.
- If you fail to follow this day count constraint, the parsing engine will fail.
- Each day must contain a theme and at least 3-4 activities matching their interests and preferences.
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
      "theme": "Theme for Day 1",
      "plan": [
        {
          "placeName": "Name of Attraction",
          "placeDetails": "Brief details",
          "placeImageUrl": "URL or empty string",
          "geoCoordinates": { "latitude": "Lat coordinate", "longitude": "Lng coordinate" },
          "ticketPricing": "Price or Free",
          "rating": "Rating out of 5",
          "timeToVisit": "Suggested time",
          "bestTimeToVisit": "Best hour of day",
          "travelTimeFromHotel": "Travel duration",
          "travelTimeFromPrevious": "Travel duration"
        }
      ]
    },
    "day2": {
      "theme": "Theme for Day 2",
      "plan": [
        {
          "placeName": "Name of Attraction",
          "placeDetails": "Brief details",
          "placeImageUrl": "URL or empty string",
          "geoCoordinates": { "latitude": "Lat coordinate", "longitude": "Lng coordinate" },
          "ticketPricing": "Price or Free",
          "rating": "Rating out of 5",
          "timeToVisit": "Suggested time",
          "bestTimeToVisit": "Best hour of day",
          "travelTimeFromHotel": "Travel duration",
          "travelTimeFromPrevious": "Travel duration"
        }
      ]
    },
    // Continue adding structured day plan blocks exactly up to day${days} (i.e. day3, day4, ..., day${days} depending on the requested number of days)
    "day${days}": {
      "theme": "Theme for Day ${days}",
      "plan": [
        {
          "placeName": "Name of Attraction",
          "placeDetails": "Brief details",
          "placeImageUrl": "URL or empty string",
          "geoCoordinates": { "latitude": "Lat coordinate", "longitude": "Lng coordinate" },
          "ticketPricing": "Price or Free",
          "rating": "Rating out of 5",
          "timeToVisit": "Suggested time",
          "bestTimeToVisit": "Best hour of day",
          "travelTimeFromHotel": "Travel duration",
          "travelTimeFromPrevious": "Travel duration"
        }
      ]
    }
  }
}
`;
};
