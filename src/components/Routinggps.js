import React, { useState } from 'react';
import axios from 'axios';

const RoutingMap = () => {
  const [userLocation, setUserLocation] = useState({ lat: null, lon: null });
  const [destination, setDestination] = useState({ lat: '', lon: '' });
  const [routeUrl, setRouteUrl] = useState(null);
  const [error, setError] = useState(null);
  const API_KEY = '52b70eb8d13b4775b59a4a434e01d103'; // Replace with your actual Geoapify API key

  // Function to get user's current location using Geolocation API
  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lon: longitude });
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

  // Function to fetch the route based on user location and destination
  const fetchRoute = async () => {
    const { lat: fromLat, lon: fromLon } = userLocation;
    const toLat = destination.lat; // Use the entered destination latitude
    const toLon = destination.lon; // Use the entered destination longitude

    const routeApiUrl = `https://api.geoapify.com/v1/routing?waypoints=${fromLat},${fromLon}|${toLat},${toLon}&mode=drive&apiKey=${API_KEY}`;
    console.log('Route API URL:', routeApiUrl);

    if (fromLat && fromLon && toLat && toLon) {
      try {
        const response = await axios.get(routeApiUrl);
        const routes = response.data.routes;

        if (Array.isArray(routes) && routes.length > 0) {
          const route = routes[0]; // Get the first route
          const polyline = route.geometry; // Get the geometry for the route
          const routeMapUrl = `https://maps.geoapify.com/v1/staticmap?style=osm-bright&width=600&height=400&center=lonlat:${fromLon},${fromLat}&zoom=13&scaleFactor=2&apiKey=${API_KEY}&path=lonlat:${polyline.map(coord => `${coord[0]},${coord[1]}`).join('|')}`;

          setRouteUrl(routeMapUrl);
          setError(null);
        } else {
          setError('No routes found. Please check the provided locations.');
        }
      } catch (error) {
        console.error('Error fetching route data', error.response ? error.response.data : error.message);
        setError('Failed to fetch route data. Please try again.');
      }
    } else {
      setError('Please make sure both locations are valid.');
    }
  };

  return (
    <div>
      <h2>Route Finder</h2>
      <button onClick={getUserLocation}>Get My Location</button>

      {userLocation.lat && userLocation.lon && (
        <div>
          <h3>Your Location: {userLocation.lat}, {userLocation.lon}</h3>
          <input
            type="text"
            placeholder="Enter destination latitude"
            value={destination.lat}
            onChange={(e) => setDestination({ ...destination, lat: e.target.value })}
          />
          <input
            type="text"
            placeholder="Enter destination longitude"
            value={destination.lon}
            onChange={(e) => setDestination({ ...destination, lon: e.target.value })}
          />
          <button onClick={fetchRoute}>Get Route</button>
        </div>
      )}

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {routeUrl && (
        <div>
          <h3>Route Map:</h3>
          <img src={routeUrl} alt="Route map" style={{ width: '600px', height: '400px' }} />
        </div>
      )}
    </div>
  );
};

export default RoutingMap;
