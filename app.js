const express = require('express');
const app = express();
const fs = require('fs');
const morgan = require('morgan');
const path = require('path');
const albumRouter = require('./routes/albumRoute');

app.use(morgan('dev'));
app.use(express.json());

app.use('/api/v1/albums', albumRouter);

app.all('*', (req, res, next) => {
  res.status(400).json({
    status: 'NOT FOUND!',
    message: `Can't find ${req.originalUrl} form this server !`,
  });
});

module.exports = app;
