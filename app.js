const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const albumRouter = require('./routes/albumRoute');

app.use(express.json());

app.use('/api/v1/albums', albumRouter);

module.exports = app;
