'use strict';

require('dotenv').config();

const express = require ('express');


const cors = require ('cors');

const PORT = process.env.PORT;

const app = express();

app.use( cors() );

// app.get('/', (request, response) => {
  
//   response.status(200).send('You did a great job');
// });

// app.get('/error', (request,response) => {
//   throw new Error('Whoops');
// });

// app.use('*', (request, response) =>{
//   response.status(404).send('Not Found');
// });

app.use( (error, request, response) => {
  response.status(500).send(error);
  
});


app.listen(PORT , () => console.log(`App Listening on ${PORT}`));
