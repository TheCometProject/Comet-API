const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const api = require('./api');
const app = express();
const { errorHandler } = require("./utils/error")
require('./auth/passport');


// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(helmet());
app.use(cors({
  origin: "http://localhost:3000", // <-- the react app
  credentials: true,
}));


// routes
app.use('/api/v1', api);
app.get('/', (req, res) => {
  res.json({
    message: 'Alger',
  });
});

app.use(errorHandler);

module.exports = app;