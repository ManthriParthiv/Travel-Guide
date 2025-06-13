import React from "react";
import "./infosection.css";
import SmartImage from './SmartImage';

function TripDetails({ trip }) {
  // Safely extract data with proper fallbacks
  const tripdata = trip?.tripdata || {};
  const userSelection = trip?.userSelection || {};
  const hotels = tripdata.hotelOptions || [];
  const itinerary = tripdata.itinerary || {};

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
                {hotel.geoCoordinates?.latitude && hotel.geoCoordinates?.longitude && (
                  <a
                    href={`https://www.google.com/maps?q=${hotel.geoCoordinates.latitude},${hotel.geoCoordinates.longitude}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="map-link"
                  >
                    View on Map
                  </a>
                )}
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