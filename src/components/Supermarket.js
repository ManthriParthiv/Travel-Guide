import React, { useState } from 'react';
import axios from 'axios';

const SupermarketSearch = () => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [supermarkets, setSupermarkets] = useState([]);
  const [error, setError] = useState(null);

  const API_KEY = '52b70eb8d13b4775b59a4a434e01d103';

  // Function to get user's current location using Geolocation API
  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
          setError(null); // Clear any previous errors
          fetchSupermarkets(position.coords.latitude, position.coords.longitude); // Fetch supermarkets after getting location
        },
        (err) => {
          setError('Failed to get your location. Please enable location access.');
        }
      );
    } else {
      setError('Geolocation is not supported by this browser.');
    }
  };

  // Function to fetch supermarkets based on latitude and longitude
  const fetchSupermarkets = async (lat, lon) => {
    const boundingBox = `${lon - 0.05},${lat - 0.05},${lon + 0.05},${lat + 0.05}`;
    const API_URL = `https://api.geoapify.com/v2/places?categories=commercial.supermarket&filter=rect:${boundingBox}&limit=20&apiKey=${API_KEY}`;

    try {
      const response = await axios.get(API_URL);
      setSupermarkets(response.data.features);
      console.log(latitude);
      console.log(longitude);
    } catch (err) {
      setError('Error fetching supermarkets. Please try again.');
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Find Supermarkets Near You</h2>
      
      <button onClick={getUserLocation}>Get My Location & Search</button>
        
      {error && <p style={{color: 'red'}}>{error}</p>}

      {supermarkets.length > 0 && (
        <div>
          <h3>Supermarkets Found:</h3>
          <ul>
            {supermarkets.map((market, index) => (
              <li key={index}>
                {market.properties.name || 'Unnamed'} - {market.properties.street || 'Unknown street'}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SupermarketSearch;
