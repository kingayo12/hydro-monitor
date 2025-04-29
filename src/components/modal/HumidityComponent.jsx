import React, { useState } from 'react';
import axios from 'axios';

const HumidityComponent = () => {
  const [soilPhData, setSoilPhData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchSoilPhData = async () => {
    setLoading(true);
    setError(null);

    try {
      const API_KEY = 'YOUR_API_KEY'; // Replace with your actual API key
      const response = await axios.get(
        `https://sdmdataaccess.nrcs.usda.gov/Tabular/ssldata?&limit=1&apikey=${API_KEY}`
      );
      if (response.data && response.data.features && response.data.features.length > 0) {
        // Assuming the API returns an array of features, and the pH data is available in 'phh2o'
        setSoilPhData(response.data.features[0].attributes.phh2o);
      } else {
        setError('No soil pH data available.');
      }
      setLoading(false);
    } catch (err) {
      setError('Error fetching soil pH data.');
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Soil pH Data</h2>
      <button onClick={fetchSoilPhData} disabled={loading}>
        {loading ? 'Fetching...' : 'Get Soil pH Data'}
      </button>
      {error && <p>{error}</p>}
      {soilPhData && <p>Soil pH: {soilPhData}</p>}
    </div>
  );
};

export default HumidityComponent;
