// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();
const port = 3000;

/* Middleware*/
// JSON parsing
app.use(express.json());

// Initialize the main project folder
app.use(express.static('dist'));

/* Routes */

// Setup Server
app.listen(port, () => {
  console.log(`app listening on http://localhost:${port}`);
});
