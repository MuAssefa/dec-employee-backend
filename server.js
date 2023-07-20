const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const port = 5000;

//setup our server
app.listen(port, () => 
      console.log(`App listening at http://localhost:${port}`)
      );

//connecting to the mongodb database
mongoose
     .connect(process.env.MONGODB_URI)
     .then( console.log('Database connection is successful'))
     .catch((err) => console.log(err));

// Routing
app.get('/', (req, res) => res.send('Home Page'));
app.get('/about', (req, res) => res.send('About Page'));



