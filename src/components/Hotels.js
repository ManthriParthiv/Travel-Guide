import React, { useState } from 'react';
import axios from 'axios';

const HotelSearch = () => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [hotels, setHotels] = useState([]);
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
          fetchHotels(position.coords.latitude, position.coords.longitude); // Fetch hotels after getting location
        },
        (err) => {
          setError('Failed to get your location. Please enable location access.');
        }
      );
    } else {
      setError('Geolocation is not supported by this browser.');
    }
  };

  // Function to fetch hotels based on latitude and longitude
  const fetchHotels = async (lat, lon) => {
    const boundingBox = `${lon - 0.05},${lat - 0.05},${lon + 0.05},${lat + 0.05}`;
    const API_URL = `https://api.geoapify.com/v2/places?categories=accommodation.hotel&filter=rect:${boundingBox}&limit=20&apiKey=${API_KEY}`;

    try {
      const response = await axios.get(API_URL);
      setHotels(response.data.features);
      console.log(latitude);
      console.log(longitude);
    } catch (err) {
      setError('Error fetching hotels. Please try again.');
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Find Hotels Near You</h2>
      
      <button onClick={getUserLocation}>Get My Location & Search</button>
        
      {error && <p style={{color: 'red'}}>{error}</p>}

      {hotels.length > 0 && (
        <div>
          <h3>Hotels Found:</h3>
          <ul>
            {hotels.map((hotel, index) => (
              <li key={index}>
                {hotel.properties.name || 'Unnamed'} - {hotel.properties.street || 'Unknown street'}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default HotelSearch;
