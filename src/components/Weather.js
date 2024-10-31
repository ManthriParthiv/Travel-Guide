import React, { useState } from 'react';
import axios from 'axios';
import '../styles/weather.css'

const WeatherReport = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to get user's current location and fetch weather data
  const getWeather = async () => {
    setLoading(true);
    setError(null);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const response = await axios.get(
              `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=a1f4f24f1c19b4815aaa1b634a70b454&units=metric`
            );
            setWeatherData(response.data);
          } catch (error) {
            console.error('Error fetching weather data', error);
            setError('Failed to fetch weather data. Please try again.');
          } finally {
            setLoading(false);
          }
        },
        (err) => {
          setLoading(false);
          setError('Failed to get your location. Please enable location access.');
        }
      );
    } else {
      setLoading(false);
      setError('Geolocation is not supported by this browser.');
    }
  };

  return (
    <div>
      <h2>Weather Forecast for Your Location</h2>
      <button onClick={getWeather}>Get Weather</button>

      {loading && <p>Loading weather data...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {weatherData && (
        <div>
          <h3>{weatherData.name}</h3>
          <p>Temperature: {weatherData.main.temp}°C</p>
          <p>Weather: {weatherData.weather[0].description}</p>
        </div>
      )}
      {!loading && !weatherData && !error && <p>No weather data available.</p>}
    </div>
  );
};

export default WeatherReport;
