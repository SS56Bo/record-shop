const express = require('express');
const albumRouter = express.Router();
const albumControl = require('./../controllers/albumController');
const AppError = require('./../utils/appError');
const globalErrorHandler = require('./../controllers/errorController');

albumRouter
  .route('/select-albums')
  .get(albumControl.aliasTopAlbum, albumControl.getAllAlbums);

albumRouter
  .route('/top-5-cheaps')
  .get(albumControl.getCheapAlbums, albumControl.getAllAlbums);

albumRouter.route('/get-stats').get(albumControl.getAlbumStats);

albumRouter
  .route('/')
  .get(albumControl.getAllAlbums)
  .post(albumControl.postNewAlbum);

albumRouter
  .route('/:id')
  .get(albumControl.getSingleAlbum)
  .patch(albumControl.updateSingleAlbum)
  .delete(albumControl.deleteAlbum);

albumRouter.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

albumRouter.use(globalErrorHandler);

module.exports = albumRouter;
