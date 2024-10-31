import React, { useState } from 'react';

const MapView = () => {
  const [mapUrl, setMapUrl] = useState(null);
  const [error, setError] = useState(null);
  const API_KEY = '52b70eb8d13b4775b59a4a434e01d103'; // Replace with your actual Geoapify API key

  // Function to get user's current location and fetch map
  const getMap = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          // Construct the map URL
          const mapApiUrl = `https://maps.geoapify.com/v1/staticmap?style=osm-bright&width=600&height=400&center=lonlat:${longitude},${latitude}&zoom=13.3806&scaleFactor=2&apiKey=${API_KEY}`;
          console.log(mapApiUrl); // Debugging: Log the map URL
          setMapUrl(mapApiUrl);
          setError(null); // Clear any previous errors
        },
        (err) => {
          setError('Failed to get your location. Please enable location access.');
        }
      );
    } else {
      setError('Geolocation is not supported by this browser.');
    }
  };

  return (
    <div>
      <h2>Map of Your Current Location</h2>
      <button onClick={getMap}>Show My Location on Map</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {mapUrl && (
        <div>
          <img src={mapUrl} alt="Map showing current location" style={{ width: '600px', height: '400px' }} />
        </div>
      )}
    </div>
  );
};

export default MapView;
