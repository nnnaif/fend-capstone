// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();
/* Middleware*/
// Initialize the main project folder
app.use(express.static('dist'));

/* Routes */
app.get('/', (req, res) => {
  res.sendFile('dist/index.html');
});

module.exports = app;
