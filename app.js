// server/app.js
const express = require('express');
const morgan = require('morgan');
const path = require('path');

const app = express();

// Setup logger
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));

// Serve static assets
app.use(express.static(path.resolve(__dirname, 'build')));

console.log(process.env.DATABASE_URL);

app.get('/api/*', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({ a: 1 }));
});

// Always return the main index.html, so react-router render the route in the client
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Luke's awesome app listening on port ${PORT}!`);
});