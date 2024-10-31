const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
const port = 4000;

app.use(cors());

app.get('/proxy/:stationCode', async (req, res) => {
  const { stationCode } = req.params;
  const API_KEY = '875b449782667e2df87ee7093b299b8f'; // Replace with your API key
  const url = `https://indianrailapi.com/api/v2/StationLocationOnMap/apikey/${API_KEY}/StationCode/${stationCode}`;

  try {
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching data' });
  }
});

app.listen(port, () => {
  console.log(`Proxy server running on port ${port}`);
});
