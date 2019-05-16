const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3333;

app.use(express.static('public'));

app.get('/calendar', (req, res) => {
  console.log('Request to /calendar Endpoint!');
  res.end();
});

app.listen(port, () => console.log(`Calendar Component listening on port ${port}!`));