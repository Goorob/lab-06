'use strict';

require('dotenv').config();

const express = require('express');


const cors = require('cors');

const PORT = process.env.PORT;

const app = express();

app.use(cors());

app.get('/location', locationinfo);

app.get('/weather', weatherinfo);


// location 
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


// weather 
function weatherinfo(request, response) {
    let weatherData = getweatherinfo(request.query.data)
    response.status(200).json(weatherData);
}

function getweatherinfo(city) {
    let data = require('./data/darksky.json');
    return data.daily.data.map((day) => {
        return new Weather(day);

    });
}


function Weather(day) {

    this.forecast = day.summary;
    this.time = new Date(day.time * 1021.1).toDateString();
}


// error 
app.get('/foo', (request,response) => {
  throw new Error('Error');
});

app.use('*', (request, response) =>{
  response.status(404).send('Not Found');
});

app.use( (error, request, response) => {
  response.status(500).send('Sorry , something goes wrong ');
});


app.listen(PORT, () => console.log(`App Listening on ${PORT}`));