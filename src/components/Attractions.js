import React, { useState } from 'react';
import axios from 'axios';

const AttractionSearch = () => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [attractions, setAttractions] = useState([]);
  const [error, setError] = useState(null);

  const API_KEY = '52b70eb8d13b4775b59a4a434e01d103'; // Replace with your API key

  // Function to get user's current location using Geolocation API
  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
          setError(null); // Clear any previous errors
          fetchAttractions(position.coords.latitude, position.coords.longitude); // Fetch attractions after getting location
        },
        (err) => {
          setError('Failed to get your location. Please enable location access.');
        }
      );
    } else {
      setError('Geolocation is not supported by this browser.');
    }
  };

  // Function to fetch attractions within a specified radius (1-5 km)
  const fetchAttractions = async (lat, lon) => {
    const radius = 5000; // 5000 meters (5 km) range
    const API_URL = `https://api.geoapify.com/v2/places?categories=tourism.attraction&filter=circle:${lon},${lat},${radius}&limit=20&apiKey=${API_KEY}`;

    try {
      const response = await axios.get(API_URL);
      setAttractions(response.data.features);
      console.log(latitude);
      console.log(longitude);
    } catch (err) {
      setError('Error fetching attractions. Please try again.');
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Famous Attractions Near You </h2>
      
      <button onClick={getUserLocation}>Get My Location & Search</button>
        
      {error && <p style={{color: 'red'}}>{error}</p>}

      {attractions.length > 0 && (
        <div>
          <h3>Attractions Found:</h3>
          <ul>
            {attractions.map((attraction, index) => (
              <li key={index}>
                {attraction.properties.name || 'Unnamed'} - {attraction.properties.street || 'Unknown street'}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AttractionSearch;
