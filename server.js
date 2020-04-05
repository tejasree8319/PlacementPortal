const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

const route = require('./app/routes');
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(cors());

// Configuring the database
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose
  .connect(dbConfig.url, {
    useNewUrlParser: true
  })
  .then(() => {
    console.log('Successfully connected to the database');
  })
  .catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
  });

const port = 8000;
app.use('/', route);

// app.use(urlencoded({

// }))

app.listen(port, () => {
  console.log('Port listening on ' + port);
});
