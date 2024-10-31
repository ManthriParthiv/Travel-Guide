import React, { useState } from 'react';
import axios from 'axios';

const PoliceStationSearch = () => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [policeStations, setPoliceStations] = useState([]);
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
          fetchPoliceStations(position.coords.latitude, position.coords.longitude); // Fetch police stations after getting location
        },
        (err) => {
          setError('Failed to get your location. Please enable location access.');
        }
      );
    } else {
      setError('Geolocation is not supported by this browser.');
    }
  };

  // Function to fetch police stations within a specified radius (1-5 km)
  const fetchPoliceStations = async (lat, lon) => {
    const radius = 3000; // 5000 meters (5 km) range
    const API_URL = `https://api.geoapify.com/v2/places?categories=service.police&filter=circle:${lon},${lat},${radius}&limit=20&apiKey=${API_KEY}`;

    try {
      const response = await axios.get(API_URL);
      setPoliceStations(response.data.features);
      console.log(latitude);
      console.log(longitude);
    } catch (err) {
      setError('Error fetching police stations. Please try again.');
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Police Stations Near You</h2>
      
      <button onClick={getUserLocation}>Get My Location & Search</button>
        
      {error && <p style={{color: 'red'}}>{error}</p>}

      {policeStations.length > 0 && (
        <div>
          <h3>Police Stations Found:</h3>
          <ul>
            {policeStations.map((station, index) => (
              <li key={index}>
                {station.properties.name || 'Unnamed'} - {station.properties.street || 'Unknown street'}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PoliceStationSearch;
