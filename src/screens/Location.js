import React, { useState } from 'react';
import axios from 'axios';
import './LocationServices.css'; // CSS file for styling

const API_KEY = '52b70eb8d13b4775b59a4a434e01d103'; // Replace with your actual Geoapify API key

const LocationServices = () => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [mapUrl, setMapUrl] = useState(null);
  const [error, setError] = useState(null);
  const [attractions, setAttractions] = useState([]);
  const [busStops, setBusStops] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [policeStations, setPoliceStations] = useState([]);

  // Function to get user's current location
  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLatitude(latitude);
          setLongitude(longitude);
          setError(null);
          fetchData(latitude, longitude);
        },
        () => setError('Failed to get your location. Please enable location access.')
      );
    } else {
      setError('Geolocation is not supported by this browser.');
    }
  };

  // Unified data fetching function for attractions, bus stops, hotels, police stations, and map
  const fetchData = async (lat, lon) => {
    try {
      // Fetch attractions
      const attractionsData = await axios.get(`https://api.geoapify.com/v2/places?categories=tourism.attraction&filter=circle:${lon},${lat},5000&limit=20&apiKey=${API_KEY}`);
      setAttractions(attractionsData.data.features);

      // Fetch bus stops
      const busStopsData = await axios.get(`https://api.geoapify.com/v2/places?categories=public_transport.bus&filter=circle:${lon},${lat},2000&limit=20&apiKey=${API_KEY}`);
      setBusStops(busStopsData.data.features);

      // Fetch hotels
      const boundingBox = `${lon - 0.05},${lat - 0.05},${lon + 0.05},${lat + 0.05}`;
      const hotelsData = await axios.get(`https://api.geoapify.com/v2/places?categories=accommodation.hotel&filter=rect:${boundingBox}&limit=20&apiKey=${API_KEY}`);
      setHotels(hotelsData.data.features);

      // Fetch police stations
      const policeData = await axios.get(`https://api.geoapify.com/v2/places?categories=service.police&filter=circle:${lon},${lat},3000&limit=20&apiKey=${API_KEY}`);
      setPoliceStations(policeData.data.features);

      // Set map URL
      setMapUrl(`https://maps.geoapify.com/v1/staticmap?style=osm-bright&width=600&height=400&center=lonlat:${lon},${lat}&zoom=13.3806&scaleFactor=2&apiKey=${API_KEY}`);
    } catch (err) {
      setError('Error fetching data. Please try again.');
      console.error(err);
    }
  };

  return (
    <div className="location-services">
      <button className="location-button" onClick={getUserLocation}>Get My Location & Search Nearby Details</button>
      {error && <p className="error-message">{error}</p>}

      {/* Display Latitude and Longitude */}
      {latitude && longitude && (
        <div className="location-coordinates">
          <h3>Your Location:</h3>
          <p>Latitude: {latitude.toFixed(6)}</p>
          <p>Longitude: {longitude.toFixed(6)}</p>
        </div>
      )}

      {/* Map Section */}
      {mapUrl && (
        <div className="map-section">
          <h2>Map of Your Location</h2>
          <img src={mapUrl} alt="Map showing current location" />
        </div>
      )}

      {/* Attractions Section */}
      {attractions.length > 0 && (
        <div className="data-section">
          <h3>Nearby Attractions</h3>
          <ul>
            {attractions.map((attraction, index) => (
              <li key={index}>{attraction.properties.name || 'Unnamed'} - {attraction.properties.street || 'Unknown street'}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Bus Stops Section */}
      {busStops.length > 0 && (
        <div className="data-section">
          <h3>Nearby Bus Stops</h3>
          <ul>
            {busStops.map((stop, index) => (
              <li key={index}>{stop.properties.name || 'Unnamed'} - {stop.properties.street || 'Unknown street'}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Hotels Section */}
      {hotels.length > 0 && (
        <div className="data-section">
          <h3>Nearby Hotels</h3>
          <ul>
            {hotels.map((hotel, index) => (
              <li key={index}>{hotel.properties.name || 'Unnamed'} - {hotel.properties.street || 'Unknown street'}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Police Stations Section */}
      {policeStations.length > 0 && (
        <div className="data-section">
          <h3>Nearby Police Stations</h3>
          <ul>
            {policeStations.map((station, index) => (
              <li key={index}>{station.properties.name || 'Unnamed'} - {station.properties.street || 'Unknown street'}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default LocationServices;
