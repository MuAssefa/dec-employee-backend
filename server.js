const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 5000;

//setup our server
app.listen(port, () => 
      console.log(`App listening at http://localhost:${port}`)
      );

//connecting to the mongodb database
mongoose.connect("mongodb+srv://employee-app:Fekomeda090920@employee-app.2prpv9u.mongodb.net/?retryWrites=true&w=majority")
     .then( console.log('Database connection is successful'))
     .catch((err) => console.log(err));
// Routing
app.get('/', (req, res) => res.send('Home Page'));
app.get('/about', (req, res) => res.send('About Page'));



