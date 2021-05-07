/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const express = require('express');
const axios = require('axios');
const app = express();
const port = 8000;

app.get('/api/getLocations', async (req, res) => {
  const { query } = req.query;

  try {
    const { data } = await axios.get(
      `https://www.metaweather.com/api/location/search/?query=${query}`
    );

    res.json(data);
  } catch (error) {
    res.status(error.response.status).send();
  }
});

app.get('/api/getWeatherForecastsByWoeid', async (req, res) => {
  const { woeid } = req.query;

  try {
    const { data } = await axios.get(
      `https://www.metaweather.com/api/location/${woeid}`
    );

    res.json(data);
  } catch (error) {
    res.status(error.response.status).send();
  }
});

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});
