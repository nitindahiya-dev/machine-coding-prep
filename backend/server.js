const express = require('express');
const fetch = require('node-fetch');
const app = express();

// Enable CORS for all origins (or specify your app's domain)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

// Proxy endpoint to fetch plant data
app.get('/api/plants', async (req, res) => {
  try {
    const apiUrl = 'https://api.npoint.io/02010a1fe85eeaedb9d9'; // Hardcode or use environment variable
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Proxy server running on port ${port}`));