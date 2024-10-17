import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/weather.css'

const WeatherReport = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState('London');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const getWeather = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=a1f4f24f1c19b4815aaa1b634a70b454&units=metric`);
      setWeatherData(response.data);
    } catch (error) {
      console.error('Error fetching weather data', error);
      setError('Failed to fetch weather data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getWeather();
  }, [city]);

  return (
    <div>
      <h2>Weather Forecast for {city}</h2>
      <input
        type="text"
        placeholder="Enter city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={getWeather}>Get Weather</button>

      {loading && <p>Loading weather data...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {weatherData ? (
        <div>
          <h3>{weatherData.name}</h3>
          <p>Temperature: {weatherData.main.temp}°C</p>
          <p>Weather: {weatherData.weather[0].description}</p>
        </div>
      ) : (
        !loading && <p>No weather data available.</p>
      )}
    </div>
  );
};

export default WeatherReport;
