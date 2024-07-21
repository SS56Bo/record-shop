const express = require('express');
const albumRouter = express.Router();
const albumControl = require('./../controllers/albumController');

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

module.exports = albumRouter;
