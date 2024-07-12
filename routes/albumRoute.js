const express = require('express');
const albumRouter = express.Router();
const albumControl = require('./../controllers/albumController');

albumRouter
  .route('/')
  .get(albumControl.getAllAlbums)
  .post(albumControl.postNewAlbum);

albumRouter
  .route('/:id')
  .get(albumControl.getSingleAlbum)
  .get(albumControl.updateAlbum)
  .get(albumControl.deleteAlbum);

module.exports = albumRouter;
