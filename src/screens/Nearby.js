import React, { useState } from 'react';
import axios from 'axios';
import './Nearby.css';
import Navbar2 from '../components/Navbar2';
import Footer from '../components/Footer';

const API_KEY = process.env.REACT_APP_GEOAPIFY_API_KEY || '52b70eb8d13b4775b59a4a434e01d103';

const LocationServices = () => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [mapUrl, setMapUrl] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const [attractions, setAttractions] = useState([]);
  const [busStops, setBusStops] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [policeStations, setPoliceStations] = useState([]);
  const [hospitals, setHospitals] = useState([]);
  const [restaurants, setRestaurants] = useState([]);

  // Fetch helper - attractions
  const fetchAttractions = async (lat, lon) => {
    try {
      const res = await axios.get(
        `https://api.geoapify.com/v2/places?categories=tourism.attraction&filter=circle:${lon},${lat},5000&bias=proximity:${lon},${lat}&limit=10&apiKey=${API_KEY}`
      );
      setAttractions(res.data.features || []);
    } catch (err) {
      console.error("Error fetching attractions:", err);
    }
  };

  // Fetch helper - bus stops
  const fetchBusStops = async (lat, lon) => {
    try {
      const res = await axios.get(
        `https://api.geoapify.com/v2/places?categories=public_transport.bus&filter=circle:${lon},${lat},2000&bias=proximity:${lon},${lat}&limit=10&apiKey=${API_KEY}`
      );
      setBusStops(res.data.features || []);
    } catch (err) {
      console.error("Error fetching bus stops:", err);
    }
  };

  // Fetch helper - hotels
  const fetchHotels = async (lat, lon) => {
    try {
      const res = await axios.get(
        `https://api.geoapify.com/v2/places?categories=accommodation.hotel&filter=circle:${lon},${lat},5000&bias=proximity:${lon},${lat}&limit=10&apiKey=${API_KEY}`
      );
      setHotels(res.data.features || []);
    } catch (err) {
      console.error("Error fetching hotels:", err);
    }
  };

  // Fetch helper - police stations
  const fetchPoliceStations = async (lat, lon) => {
    try {
      const res = await axios.get(
        `https://api.geoapify.com/v2/places?categories=service.police&filter=circle:${lon},${lat},5000&bias=proximity:${lon},${lat}&limit=10&apiKey=${API_KEY}`
      );
      setPoliceStations(res.data.features || []);
    } catch (err) {
      console.error("Error fetching police stations:", err);
    }
  };

  // Fetch helper - hospitals
  const fetchHospitals = async (lat, lon) => {
    try {
      const res = await axios.get(
        `https://api.geoapify.com/v2/places?categories=healthcare.hospital,healthcare.clinic&filter=circle:${lon},${lat},5000&bias=proximity:${lon},${lat}&limit=10&apiKey=${API_KEY}`
      );
      setHospitals(res.data.features || []);
    } catch (err) {
      console.error("Error fetching hospitals:", err);
    }
  };

  // Fetch helper - restaurants
  const fetchRestaurants = async (lat, lon) => {
    try {
      const res = await axios.get(
        `https://api.geoapify.com/v2/places?categories=catering.restaurant,catering.cafe&filter=circle:${lon},${lat},3000&bias=proximity:${lon},${lat}&limit=10&apiKey=${API_KEY}`
      );
      setRestaurants(res.data.features || []);
    } catch (err) {
      console.error("Error fetching restaurants:", err);
    }
  };

  // Main trigger to fetch location and data concurrently
  const getUserLocation = () => {
    if (navigator.geolocation) {
      setLoading(true);
      setError(null);
      
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude: lat, longitude: lon } = position.coords;
          setLatitude(lat);
          setLongitude(lon);
          
          // Responsive map URL centering on location
          setMapUrl(
            `https://maps.geoapify.com/v1/staticmap?style=osm-bright&width=1000&height=500&center=lonlat:${lon},${lat}&zoom=14&scaleFactor=2&apiKey=${API_KEY}`
          );
          
          try {
            // Concurrent execution
            await Promise.all([
              fetchAttractions(lat, lon),
              fetchBusStops(lat, lon),
              fetchHotels(lat, lon),
              fetchPoliceStations(lat, lon),
              fetchHospitals(lat, lon),
              fetchRestaurants(lat, lon)
            ]);
          } catch (err) {
            setError('Failed to load some nearby services. Try refreshing.');
            console.error(err);
          } finally {
            setLoading(false);
          }
        },
        (err) => {
          setLoading(false);
          setError('Location access denied. Please enable geolocation in your browser settings.');
          console.error(err);
        },
        { enableHighAccuracy: true, timeout: 10000 }
      );
    } else {
      setError('Geolocation is not supported by this browser.');
    }
  };

  // Helper to format distance nicely
  const formatDistance = (meters) => {
    if (meters === undefined || meters === null) return '';
    return meters < 1000 ? `${Math.round(meters)} m` : `${(meters / 1000).toFixed(1)} km`;
  };

  const getMapsSearchUrl = (place) => {
    const name = place.properties.name || '';
    const address = place.properties.formatted || '';
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${name} ${address}`)}`;
  };

  return (
    <div className="page-wrapper">
      <Navbar2 />
      <div className="nearby-services-container content-wrapper">
        {/* Header Block */}
        <div className="nearby-header">
          <h1 className="nearby-title">📍 Live Nearby Services</h1>
          <p className="nearby-subtitle">Detect your coordinates and explore essential neighborhood amenities, transit points, and safety resources around you in real-time.</p>
          
          <button 
            className="get-location-btn" 
            onClick={getUserLocation} 
            disabled={loading}
          >
            {loading ? (
              <span className="d-flex align-items-center gap-2">
                <span className="spinner-loader"></span> Detecting Location & Fetching Details...
              </span>
            ) : "🔍 Search Local Amenities Now"}
          </button>
          
          {error && <div className="nearby-error-banner">⚠️ {error}</div>}
        </div>

        {latitude && longitude && (
          <div className="nearby-dashboard-layout">
            
            {/* Left Panel: Location Details & Static Map */}
            <div className="nearby-map-panel">
              <div className="coordinates-card">
                <h3>Current Coordinates</h3>
                <div className="coords-row">
                  <div>
                    <span className="coord-label">Latitude</span>
                    <span className="coord-val">{latitude.toFixed(6)}</span>
                  </div>
                  <div>
                    <span className="coord-label">Longitude</span>
                    <span className="coord-val">{longitude.toFixed(6)}</span>
                  </div>
                </div>
              </div>

              {mapUrl && (
                <div className="static-map-card">
                  <h3>Interactive Area Map</h3>
                  <div className="map-img-wrapper">
                    <img src={mapUrl} alt="Static Map of Current Area" />
                  </div>
                </div>
              )}
            </div>

            {/* Right Panel: 2x2 Services Grid */}
            <div className="nearby-grid-panel">
              
              {/* Attractions Card */}
              <div className="service-card attractions-card">
                <div className="service-card-header">
                  <span className="service-icon">🎭</span>
                  <h3>Nearby Attractions</h3>
                </div>
                <div className="service-list-container">
                  {attractions.length === 0 ? (
                    <p className="empty-list-txt">No attractions found within 5km.</p>
                  ) : (
                    <ul className="service-list">
                      {attractions.map((item, idx) => (
                        <li key={idx} className="service-item">
                          <div className="item-text">
                            <h4>{item.properties.name || 'Unnamed Place'}</h4>
                            <p>{item.properties.street || item.properties.formatted || 'Unknown address'}</p>
                          </div>
                          <div className="item-actions">
                            <span className="distance-badge">{formatDistance(item.properties.distance)}</span>
                            <a href={getMapsSearchUrl(item)} target="_blank" rel="noopener noreferrer" className="item-map-btn">📍 Map</a>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              {/* Restaurants Card */}
              <div className="service-card restaurants-card">
                <div className="service-card-header">
                  <span className="service-icon">🍕</span>
                  <h3>Dining & Cafés</h3>
                </div>
                <div className="service-list-container">
                  {restaurants.length === 0 ? (
                    <p className="empty-list-txt">No dining options found within 3km.</p>
                  ) : (
                    <ul className="service-list">
                      {restaurants.map((item, idx) => (
                        <li key={idx} className="service-item">
                          <div className="item-text">
                            <h4>{item.properties.name || 'Restaurant/Cafe'}</h4>
                            <p>{item.properties.street || item.properties.formatted || 'Unknown street'}</p>
                          </div>
                          <div className="item-actions">
                            <span className="distance-badge">{formatDistance(item.properties.distance)}</span>
                            <a href={getMapsSearchUrl(item)} target="_blank" rel="noopener noreferrer" className="item-map-btn">📍 Map</a>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              {/* Transit Stops Card */}
              <div className="service-card transit-card">
                <div className="service-card-header">
                  <span className="service-icon">🚌</span>
                  <h3>Nearby Bus Stops</h3>
                </div>
                <div className="service-list-container">
                  {busStops.length === 0 ? (
                    <p className="empty-list-txt">No transit stops found within 2km.</p>
                  ) : (
                    <ul className="service-list">
                      {busStops.map((item, idx) => (
                        <li key={idx} className="service-item">
                          <div className="item-text">
                            <h4>{item.properties.name || 'Bus Stop'}</h4>
                            <p>{item.properties.street || item.properties.formatted || 'Unknown street'}</p>
                          </div>
                          <div className="item-actions">
                            <span className="distance-badge">{formatDistance(item.properties.distance)}</span>
                            <a href={getMapsSearchUrl(item)} target="_blank" rel="noopener noreferrer" className="item-map-btn">📍 Map</a>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              {/* Hotels Card */}
              <div className="service-card hotel-service-card">
                <div className="service-card-header">
                  <span className="service-icon">🏨</span>
                  <h3>Accommodations</h3>
                </div>
                <div className="service-list-container">
                  {hotels.length === 0 ? (
                    <p className="empty-list-txt">No accommodations found within 5km.</p>
                  ) : (
                    <ul className="service-list">
                      {hotels.map((item, idx) => (
                        <li key={idx} className="service-item">
                          <div className="item-text">
                            <h4>{item.properties.name || 'Unnamed Hotel'}</h4>
                            <p>{item.properties.street || item.properties.formatted || 'Unknown street'}</p>
                          </div>
                          <div className="item-actions">
                            <span className="distance-badge">{formatDistance(item.properties.distance)}</span>
                            <a href={getMapsSearchUrl(item)} target="_blank" rel="noopener noreferrer" className="item-map-btn">📍 Map</a>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              {/* Hospitals Card */}
              <div className="service-card hospitals-card">
                <div className="service-card-header">
                  <span className="service-icon">🏥</span>
                  <h3>Medical & Hospitals</h3>
                </div>
                <div className="service-list-container">
                  {hospitals.length === 0 ? (
                    <p className="empty-list-txt">No medical centers found within 5km.</p>
                  ) : (
                    <ul className="service-list">
                      {hospitals.map((item, idx) => (
                        <li key={idx} className="service-item">
                          <div className="item-text">
                            <h4>{item.properties.name || 'Hospital/Clinic'}</h4>
                            <p>{item.properties.street || item.properties.formatted || 'Unknown street'}</p>
                          </div>
                          <div className="item-actions">
                            <span className="distance-badge warning-badge">{formatDistance(item.properties.distance)}</span>
                            <a href={getMapsSearchUrl(item)} target="_blank" rel="noopener noreferrer" className="item-map-btn">📍 Map</a>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              {/* Police Card */}
              <div className="service-card police-card">
                <div className="service-card-header">
                  <span className="service-icon">🚨</span>
                  <h3>Safety & Police</h3>
                </div>
                <div className="service-list-container">
                  {policeStations.length === 0 ? (
                    <p className="empty-list-txt">No emergency resources found within 5km.</p>
                  ) : (
                    <ul className="service-list">
                      {policeStations.map((item, idx) => (
                        <li key={idx} className="service-item">
                          <div className="item-text">
                            <h4>{item.properties.name || 'Police Station'}</h4>
                            <p>{item.properties.street || item.properties.formatted || 'Unknown street'}</p>
                          </div>
                          <div className="item-actions">
                            <span className="distance-badge warning-badge">{formatDistance(item.properties.distance)}</span>
                            <a href={getMapsSearchUrl(item)} target="_blank" rel="noopener noreferrer" className="item-map-btn">📍 Map</a>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

            </div>

          </div>
        )}

      </div>
      <Footer />
    </div>
  );
};

export default LocationServices;