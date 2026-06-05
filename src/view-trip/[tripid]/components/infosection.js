import React, { useState, useEffect } from "react";
import "./infosection.css";
import SmartImage from './SmartImage';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function TripDetails({ trip }) {
  const navigate = useNavigate();
  // Safely extract data with proper fallbacks
  const tripdata = trip?.tripdata || {};
  const userSelection = trip?.userSelection || {};
  const hotels = tripdata.hotelOptions || [];
  const itinerary = tripdata.itinerary || {};

  const [forecast, setForecast] = useState([]);
  const [weatherLoading, setWeatherLoading] = useState(false);
  const [weatherError, setWeatherError] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      const cityLabel = userSelection.location?.label;
      if (!cityLabel) return;
      const city = cityLabel.split(',')[0].trim();
      setWeatherLoading(true);
      setWeatherError(null);
      try {
        const apiKey = process.env.REACT_APP_WEATHER_API_KEY || 'a1f4f24f1c19b4815aaa1b634a70b454';
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&units=metric&appid=${apiKey}`
        );
        
        // Filter to get one forecast per day (around 12:00:00 noon)
        const dailyData = response.data.list.filter(item => item.dt_txt.includes("12:00:00"));
        setForecast(dailyData);
      } catch (err) {
        console.error("Error fetching weather forecast:", err);
        setWeatherError("Failed to fetch weather forecast.");
      } finally {
        setWeatherLoading(false);
      }
    };

    fetchWeather();
  }, [userSelection.location?.label]);

  const getMapUrl = (item, defaultName) => {
    const lat = parseFloat(item.geoCoordinates?.latitude);
    const lng = parseFloat(item.geoCoordinates?.longitude);
    
    // Check if coordinates are valid numbers, not 0 (commonly used as fallback), and within valid range
    if (!isNaN(lat) && !isNaN(lng) && lat !== 0 && lng !== 0 && Math.abs(lat) <= 90 && Math.abs(lng) <= 180) {
      return `https://www.google.com/maps?q=${lat},${lng}`;
    }
    
    const searchQuery = `${item.placeName || item.hotelName || defaultName} ${userSelection.location?.label || ''}`;
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(searchQuery)}`;
  };

  // Sort itinerary days numerically (day1, day2, etc.)
  const sortedItinerary = Object.entries(itinerary)
    .sort(([dayA], [dayB]) => {
      const numA = parseInt(dayA.replace('day', ''));
      const numB = parseInt(dayB.replace('day', ''));
      return numA - numB;
    })
    // Ensure we only process valid day plans
    .filter(([_, dayPlan]) => dayPlan?.plan?.length > 0);

  // Format day count correctly
  const formatDayCount = (count) => count === 1 ? `${count} Day` : `${count} Days`;

  return (
    <div className="trip-container">
      <button className="trip-back-button" onClick={() => navigate('/create-trip')}>
        ← Back to Planner
      </button>
      {/* Trip Overview Header */}
      <div className="info-section">
        <div className="info-header">
          <h1 className="destination-title">
            ✈️ {userSelection.location?.label || "Your Trip"}
          </h1>
          <div className="trip-meta">
            <span className="meta-item">
              ⏳ {formatDayCount(sortedItinerary.length)}
            </span>
            <span className="meta-item">
              💰 {userSelection.Budget || "Flexible"} Budget
            </span>
            <span className="meta-item">
              👫 {userSelection.Traveller || "Not specified"}
            </span>
          </div>
        </div>

        <div className="trip-highlights">
          <h2 className="section-title">Trip Overview</h2>
          <div className="highlight-cards">
            <div className="highlight-card">
              <div className="highlight-icon">🏨</div>
              <div className="highlight-content">
                <h3>Hotels</h3>
                <p>{hotels.length} curated options</p>
              </div>
            </div>
            
            <div className="highlight-card">
              <div className="highlight-icon">🗓️</div>
              <div className="highlight-content">
                <h3>Itinerary</h3>
                <p>{sortedItinerary.length} days planned</p>
              </div>
            </div>
            
            <div className="highlight-card">
              <div className="highlight-icon">📍</div>
              <div className="highlight-content">
                <h3>Location</h3>
                <p>{userSelection.location?.label || "Not specified"}</p>
              </div>
            </div>
          </div>
      </div>
    </div>

      {/* Weather Forecast Section */}
      <section className="weather-section">
        <h2 className="section-title">🌦️ 5-Day Weather Forecast ({userSelection.location?.label?.split(',')[0]})</h2>
        {weatherLoading && <p className="text-muted small">Loading weather forecast...</p>}
        {weatherError && <p className="text-danger small">{weatherError}</p>}
        {!weatherLoading && !weatherError && forecast.length === 0 && (
          <p className="text-muted small">No weather forecast available.</p>
        )}
        {!weatherLoading && !weatherError && forecast.length > 0 && (
          <div className="weather-grid">
            {forecast.map((day, idx) => {
              const date = new Date(day.dt * 1000);
              const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
              const formattedDate = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
              const temp = Math.round(day.main.temp);
              const description = day.weather[0].description;
              const iconCode = day.weather[0].icon;
              const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
              
              return (
                <div key={idx} className="weather-card">
                  <div className="weather-day">{dayName}</div>
                  <div className="weather-date">{formattedDate}</div>
                  <img src={iconUrl} alt={description} className="weather-icon-img" />
                  <div className="weather-temp">{temp}°C</div>
                  <div className="weather-desc">{description}</div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Hotels Section */}
      <section className="hotels-section">
        <h2 className="section-title">🏨 Recommended Hotels</h2>
        <div className="hotels-grid">
          {hotels.map((hotel, index) => (
            <div className="hotel-card" key={`hotel-${index}`}>
              <div className="hotel-image-container">
                <SmartImage
                  src={hotel.hotelImageUrl}
                  alt={hotel.hotelName || "Hotel image"}
                  type="hotel"
                  index={index}
                  className="hotel-image"
                />
                {hotel.rating && (
                  <div className="hotel-rating">⭐ {hotel.rating}</div>
                )}
              </div>
              <div className="hotel-details">
                <h3>{hotel.hotelName || "Unnamed Hotel"}</h3>
                {hotel.hotelAddress && (
                  <p className="hotel-address">{hotel.hotelAddress}</p>
                )}
                {hotel.price && (
                  <p className="hotel-price">{hotel.price}</p>
                )}
                {hotel.description && (
                  <p className="hotel-description">{hotel.description}</p>
                )}
                <a
                  href={getMapUrl(hotel, hotel.hotelName)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="map-link"
                >
                  View on Map
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Itinerary Section - Fixed to show all days */}
      <section className="itinerary-section">
        <h2 className="section-title">🗓️ Day-by-Day Itinerary</h2>
        {sortedItinerary.length > 0 ? (
          sortedItinerary.map(([day, dayPlan]) => {
            const dayNumber = day.replace('day', '');
            return (
              <div className="day-plan" key={`day-${dayNumber}`}>
                <div className="day-header">
                  <h3>Day {dayNumber}</h3>
                  {dayPlan.theme && (
                    <p className="theme">{dayPlan.theme}</p>
                  )}
                </div>
                <div className="activities">
                  {dayPlan.plan.map((activity, index) => (
                    <div className="activity-card" key={`activity-${index}`}>
                      <div className="activity-image-container">
                        <SmartImage
                          src={activity.placeImageUrl}
                          alt={activity.placeName || "Activity image"}
                          type="place"
                          index={index}
                          className="activity-image"
                        />
                      </div>
                      <div className="activity-details">
                        <h4>{activity.placeName || "Unnamed Activity"}</h4>
                        <div className="activity-meta">
                          {activity.rating && <span>⭐ {activity.rating}</span>}
                          {activity.timeToVisit && <span>⏱️ {activity.timeToVisit}</span>}
                          {activity.ticketPricing && <span>💰 {activity.ticketPricing}</span>}
                        </div>
                        {activity.placeDetails && (
                          <p className="activity-description">{activity.placeDetails}</p>
                        )}
                        <div className="activity-tips">
                          {activity.bestTimeToVisit && (
                            <p><strong>Best time:</strong> {activity.bestTimeToVisit}</p>
                          )}
                          {index > 0 && activity.travelTimeFromPrevious && (
                            <p><strong>Travel from previous:</strong> {activity.travelTimeFromPrevious}</p>
                          )}
                          {index === 0 && activity.travelTimeFromHotel && (
                            <p><strong>Travel from hotel:</strong> {activity.travelTimeFromHotel}</p>
                          )}
                        </div>
                        <a
                          href={getMapUrl(activity, activity.placeName)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="activity-map-link"
                        >
                          📍 View on Map
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })
        ) : (
          <p className="no-itinerary">No itinerary available for this trip</p>
        )}
      </section>
    </div>
  );
}

export default TripDetails;