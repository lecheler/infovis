// server/app.js
const express = require('express');
const morgan = require('morgan');
const path = require('path');
require('dotenv').config()

const app = express();

// Setup logger
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));

// Serve static assets
app.use(express.static(path.resolve(__dirname, 'build')));


// API Testing
const pgp = require('pg-promise')();
const cn = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  ssl: true
};
const db = pgp(cn);

app.get('/api/questions', (req, res) => {
  db.any("select * from test_table", [true])
    .then(function (data) {
      res.json(data);
    })
    .catch(function (error) {
      console.log(error);
    });
});


// Always return the main index.html, so react-router render the route in the client
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Luke's awesome app listening on port ${PORT}!`);
});