const express = require('express');
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

exports.getAllAlbums = (req, res) => {
  res.status(200).json({
    status: 'success',
    dataLength: productData.length,
    data: {
      album: productData,
    },
  });
};

exports.postNewAlbum = (req, res) => {
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

exports.getSingleAlbum = (req, res) => {
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

exports.updateAlbum = (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Entry updated',
  });
};

exports.deleteAlbum = (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Entry deleted',
  });
};
