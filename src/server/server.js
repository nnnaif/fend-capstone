const app = require('./app');

const port = 3000;

// Run server
app.listen(port, () => {
  console.log(`app listening on http://localhost:${port}`);
});
