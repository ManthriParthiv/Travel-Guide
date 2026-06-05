# ✈️ AI Travel Guide & Trip Planner (MERN Stack)

[![React Version](https://img.shields.io/badge/react-18.3.1-blue.svg?logo=react)](https://reactjs.org/)
[![Node Version](https://img.shields.io/badge/node-%3E%3D18.0.0-green.svg?logo=node.js)](https://nodejs.org/)
[![Database](https://img.shields.io/badge/database-MongoDB-green?logo=mongodb)](https://www.mongodb.com/)
[![AI Integration](https://img.shields.io/badge/AI-Google_Gemini-violet?logo=google-gemini)](https://deepmind.google/technologies/gemini/)

Welcome to **Travel Guide v2**, a state-of-the-art MERN (MongoDB, Express, React, Node.js) web application designed to simplify and elevate the travel planning experience. Powered by Google Gemini AI, this application constructs detailed itineraries, provides real-time weather forecasts, and acts as your personal AI travel assistant.

---

## 🌟 Key Features

*   🤖 **AI Trip Planner**: Instantly generate detailed day-by-day travel itineraries based on destination, duration, and user preferences using **Google Gemini AI**.
*   💬 **AI Travel Chatbot**: A persistent conversational assistant that answers queries, suggests packing lists, and gives context-specific travel tips.
*   🌦️ **Live Weather Integration**: Real-time forecast tracking for target cities utilizing the OpenWeatherMap API.
*   🗺️ **Dynamic Maps & Tracking**: Map tracking using the **Geoapify API** to help you visualize locations and explore nearby attractions.
*   🏨 **Smart Media & Image Mapping**: Dynamically maps generated destinations to high-quality visual cards.
*   🔒 **Dual Auth System**: Secure user authentication options integrating Firebase Auth on the frontend and custom JWT + bcryptjs sessions via Express/MongoDB on the backend.
*   🎫 **Booking Portals**: Unified screens to search flights, buses, trains, and hotel accommodations.

---

## 🛠️ Technology Stack

### Frontend
*   **React (v18.3.1)**: Component-based UI rendering.
*   **React Router DOM (v6)**: Declarative routing.
*   **React Bootstrap & Bootstrap (v5)**: Clean, responsive layout styling.
*   **React Helmet**: Dynamic head-tag management for SEO.
*   **Google Places Autocomplete**: Seamless search input autocomplete for locations.
*   **Firebase SDK**: Robust customer login integration.

### Backend
*   **Express & Node.js**: Fast, minimalist web framework.
*   **Mongoose & MongoDB**: Object modeling and persistent database storage for user metadata.
*   **JWT & bcryptjs**: Secure password encryption and stateless authentication tokens.
*   **Axios**: Server-side proxy API requests (e.g., bypassing CORS for weather queries).

---

## 📁 Repository Structure

```text
Travel-Guide-v2/
├── backend/                   # Node.js + Express backend server
│   ├── models/                # Mongoose Database Models (Users)
│   ├── Routes/                # Express Route Handlers (Authentication)
│   ├── db.js                  # MongoDB Connection configuration
│   ├── index.js               # Express application entrypoint
│   └── proxyServer.js         # Proxy handling utilities
├── public/                    # Static public assets
└── src/                       # Frontend React application source code
    ├── components/            # Reusable components (Chatbot, Weather, Navbar, Footer)
    ├── create-trip/           # Page flow for planning trips
    ├── screens/               # Main application screens (Home, Login, Signup, Nearby, Tracking, Travelbooking)
    ├── view-trip/             # Detailed trip summary views with AI-generated itinerary
    ├── App.js                 # App Routing setup
    └── index.js               # Client React entrypoint
```

---

## 🚀 Getting Started

### 📋 Prerequisites
*   [Node.js](https://nodejs.org/en/download/) (v18.0.0 or higher recommended)
*   [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account or local MongoDB server

### ⚙️ Environment Configuration

You will need to set up environment variables for both the **Frontend** and the **Backend**.

#### 1. Frontend Configuration
Create a `.env.local` file in the project **root** directory and add your API keys:

```env
REACT_APP_GOOGLE_API_KEY='your_google_places_api_key'
REACT_APP_GEMINI_API_KEY='your_gemini_api_key'
REACT_APP_GROQ_API_KEY='your_groq_api_key'
REACT_APP_API_URL='http://localhost:5005'
REACT_APP_GEOAPIFY_API_KEY='your_geoapify_key'
REACT_APP_WEATHER_API_KEY='your_openweathermap_key'

# Firebase Configurations
REACT_APP_FIREBASE_API_KEY='your_firebase_api_key'
REACT_APP_FIREBASE_AUTH_DOMAIN='your_firebase_auth_domain'
REACT_APP_FIREBASE_PROJECT_ID='your_firebase_project_id'
REACT_APP_FIREBASE_STORAGE_BUCKET='your_firebase_storage_bucket'
REACT_APP_FIREBASE_MESSAGING_SENDER_ID='your_sender_id'
REACT_APP_FIREBASE_APP_ID='your_app_id'
REACT_APP_FIREBASE_MEASUREMENT_ID='your_measurement_id'
```

#### 2. Backend Configuration
Create a `.env` file inside the `backend/` directory:

```env
PORT=5005
MONGO_URI='your_mongodb_connection_string'
WEATHER_API_KEY='your_openweathermap_key'
INDIAN_RAIL_API_KEY='your_rail_api_key'
```

---

## 🏃 Run the Application

### 1. Launch the Backend Server
Navigate to the `backend/` directory, install dependencies, and start the development server:
```bash
cd backend
npm install
npm run dev
```
The server will start, by default running on port `5005`.

### 2. Launch the Frontend Application
In a separate terminal, navigate to the root directory, install frontend dependencies, and run:
```bash
npm install
npm start
```
This launches the React app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

---

## 🛡️ Security Note
Never commit your `.env` or `.env.local` files to Github or any public repository. Make sure they are listed in your `.gitignore`.
