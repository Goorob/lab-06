'use strict';

require('dotenv').config();

const express = require('express');


const cors = require('cors');

const PORT = process.env.PORT;

const app = express();

app.use(cors());

app.get('/location', locationinfo);

function locationinfo(request, response) {
    let locationData = getlocationinfo(request.query.data)
    response.status(200).json(locationData);
}

function getlocationinfo(city) {
    let data = require('./data/geo.json');
    return new Location(city, data);

}

function Location(city, data) {
    this.search_query = city;
    this.formatted_query = data.results[0].formatted_address;
    this.latitude = data.results[0].geometry.location.lat;
    this.longitude = data.results[0].geometry.location.lng;
}



app.listen(PORT, () => console.log(`App Listening on ${PORT}`));