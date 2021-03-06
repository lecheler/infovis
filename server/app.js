// server/app.js
const express = require('express');
var bodyParser = require("body-parser");
const morgan = require('morgan');
const path = require('path');
require('dotenv').config()

const app = express();

// Setup logger
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));

// Serve static assets
app.use(express.static(path.resolve(__dirname, '..', 'build')));


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// API Routes
require('./routes')(app);

// Always return the main index.html, so react-router render the route in the client
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Luke's awesome infovis-research app listening on port ${PORT}!`);
});

