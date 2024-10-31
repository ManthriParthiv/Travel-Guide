import React, { useState } from 'react';
import axios from 'axios';

const BusStopSearch = () => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [busStops, setBusStops] = useState([]);
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
          fetchBusStops(position.coords.latitude, position.coords.longitude); // Fetch bus stops after getting location
        },
        (err) => {
          setError('Failed to get your location. Please enable location access.');
        }
      );
    } else {
      setError('Geolocation is not supported by this browser.');
    }
  };

  // Function to fetch bus stops within a specified radius (1-5 km)
  const fetchBusStops = async (lat, lon) => {
    const radius = 2000; // 5000 meters (5 km) range
    const API_URL = `https://api.geoapify.com/v2/places?categories=public_transport.bus&filter=circle:${lon},${lat},${radius}&limit=20&apiKey=${API_KEY}`;

    try {
      const response = await axios.get(API_URL);
      setBusStops(response.data.features);
      console.log(latitude);
      console.log(longitude);
    } catch (err) {
      setError('Error fetching bus stops. Please try again.');
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Bus Stops Found Near you:</h2>
      
      <button onClick={getUserLocation}>Get My Location & Search</button>
        
      {error && <p style={{color: 'red'}}>{error}</p>}

      {busStops.length > 0 && (
        <div>
          <h3>Bus Stops Found:</h3>
          <ul>
            {busStops.map((stop, index) => (
              <li key={index}>
                {stop.properties.name || 'Unnamed'} - {stop.properties.street || 'Unknown street'}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default BusStopSearch;
