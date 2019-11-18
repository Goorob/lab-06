'use strict';

require('dotenv').config();

const express = require('express');


const cors = require('cors');

const PORT = process.env.PORT;

const app = express();

app.use(cors());

app.get('/location', (request, response) => {
    const locationData = require('./data/geo.json');
    const location = new Location(locationData);
    response.status(200).json(location);
});

function Location(data) {
    this.search_query = 'lynnwood';
    this.formatted_query = data.results[0].formatted_address;
    this.latitude = data.results[0].geometry.location.lat;
    this.longitude = data.results[0].geometry.location.lng;
}

// app.use( (error, request, response) => {
//   response.status(500).send(error);

// });


app.listen(PORT, () => console.log(`App Listening on ${PORT}`));