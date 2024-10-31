import React, { useState } from 'react';
import axios from 'axios';

const StationLocation = () => {
  const [stationName, setStationName] = useState(''); // User input for station name
  const [stationCode, setStationCode] = useState(null); // Fetched station code
  const [locationData, setLocationData] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    if (!stationName.trim()) return; // Prevent empty searches

    // This URL fetches the station code based on the station name
    const STATION_CODE_API = `http://localhost:4000/proxy/${stationName}`;

    try {
      // Fetch the station location using the station name
      const stationResponse = await axios.get(STATION_CODE_API);
      if (stationResponse.data.ResponseCode === "200") {
        const fetchedStationCode = stationResponse.data.StationCode;
        setStationCode(fetchedStationCode);
        setLocationData(stationResponse.data);
      } else {
        setError('Station not found');
      }

    } catch (error) {
      setError('Error fetching station data');
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h2>Find Station Location</h2>
      
      <input
        type="text"
        placeholder="Enter Station Name"
        value={stationName}
        onChange={(e) => setStationName(e.target.value)} // Update station name
      />
      <button onClick={handleSearch}>Search</button>

      {error && <div>{error}</div>}

      {locationData && (
        <div>
          <h2>Station Name: {locationData.StationName}</h2>
          <p>Station Code: {locationData.StationCode}</p>
          <a href={locationData.URL} target="_blank" rel="noopener noreferrer">
            View Station Location on Google Maps
          </a>
        </div>
      )}
    </div>
  );
};

export default StationLocation;
