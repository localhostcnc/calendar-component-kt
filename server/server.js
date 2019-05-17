const express = require('express');
const bodyParser = require('body-parser');
const { getListingBookings } = require('../db/helpers.js');

const app = express();
const port = 3333;

app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/calendar/:id', (req, res) => {
  console.log('PARAMS ID: ', req.params.id);
  var paramId = req.params.id;

  getListingBookings(paramId, (err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
  console.log('Request to /calendar Endpoint!');
});

app.listen(port, () => console.log(`Calendar Component listening on port ${port}!`));