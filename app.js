const express = require('express');
const app = express();
const AppError = require('./utils/appError');
const morgan = require('morgan');
const globalErrorHandler = require('./controllers/errorController');
const albumRouter = require('./routes/albumRoute');

app.use(morgan('dev'));
app.use(express.json());

app.use('/api/v1/albums', albumRouter);

app.all('*', (req, res, next) => {
  // const err = new Error(`Can't find ${req.originalUrl} form this server !`);
  // err.status = 'Fail !';
  // err.statusCode = 404;
  next(new AppError(`Can't find ${req.originalUrl} form this server !`));
});

app.use(globalErrorHandler);

module.exports = app;
