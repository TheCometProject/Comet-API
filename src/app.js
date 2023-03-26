const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

require('dotenv').config();


// Construct the MongoDB connection string
const connectionString = 'mongodb://127.0.0.1/Testing';


// Connect to the MongoDB database
mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', (error) => {
  console.error('Unable to connect to the database:', error);
});

db.once('open', () => {
  console.log('Connection has been established successfully.');
});

require('./auth/passport');

const middlewares = require('./middlewares');
const api = require('./api');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'Alger',
  });
});

app.use('/api/v1', api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
