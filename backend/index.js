const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 5000;
const API_KEY = 'a1f4f24f1c19b4815aaa1b634a70b454'; // Keep this private in production
const mongoDB = require('./db');

// ✅ CORS setup for both localhost and Vercel frontend
const allowedOrigins = [
  "http://localhost:3000",
  "https://travel-guide-six-sigma.vercel.app"
];

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Credentials", "true");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});

// 🔧 Middleware
app.use(express.json());

// 🌐 Health check
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// 🔐 User Routes
app.use("/api", require("./Routes/CreateUser"));

// 🌦️ Weather API endpoint
app.get('/api/weather', async (req, res) => {
  const city = req.query.city || 'London'; // Default to London
  try {
    // Step 1: Get coordinates of the city
    const coordResponse = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`);
    const { lat, lon } = coordResponse.data.coord;

    // Step 2: Get forecast using coordinates
    const url = `http://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`;
    const response = await axios.get(url);
    
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching weather data:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'Error fetching weather data' });
  }
});


app.listen(port, () => {
  console.log(`✅ Server listening on port ${port}`);
});
