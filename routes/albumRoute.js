const express = require('express');
const albumRouter = express.Router();
const fs = require('fs');
const path = require('path');

const productFilePath = path.join(
  __dirname,
  '..',
  'assets',
  'json',
  'product.json'
);
const productData = JSON.parse(fs.readFileSync(productFilePath, 'utf8'));

////////////////////////
const getAllAlbums = (req, res) => {
  res.status(200).json({
    status: 'success',
    dataLength: productData.length,
    data: {
      album: productData,
    },
  });
};

const postNewAlbum = (req, res) => {
  //console.log(req.body);
  const newId = productData[productData.length - 1].id + 1;
  const newBody = Object.assign({ id: newId }, req.body);

  productData.push(newBody);

  fs.writeFile(productFilePath, JSON.stringify(productData), (err) => {
    res.status(200).json({
      status: 'success',
      data: {
        album: newBody,
      },
    });
  });
};

const getSingleAlbum = (req, res) => {
  //console.log(req.params);

  const searchID = req.params.id * 1;
  const singleAlbum = productData.find((el) => el.id === searchID);

  if (searchID > productData.length) {
    res.status(400).json({
      status: 'fail',
      message: 'invalid ID',
    });
  }

  res.status(200).json({
    success: 'success',
    data: {
      singleAlbum,
    },
  });
};

const updateAlbum = (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Entry updated',
  });
};

const deleteAlbum = (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Entry deleted',
  });
};

///////////////////////

albumRouter.route('/').get(getAllAlbums).post(postNewAlbum);

albumRouter.route('/:id').get(getSingleAlbum).get(updateAlbum).get(deleteAlbum);

module.exports = albumRouter;
