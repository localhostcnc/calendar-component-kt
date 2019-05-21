const express = require('express');
const bodyParser = require('body-parser');

const app = express();


app.use(express.static('public'));

app.get('/calendar/1', (req, res) => {
  console.log('Request to /calendar Endpoint!');
  res.end();
});

module.exports = app;