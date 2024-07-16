const express = require('express');
const fs = require('fs');
const path = require('path');
const Album = require('./../models/modelAlbum');

const productFilePath = path.join(
  __dirname,
  '..',
  'assets',
  'json',
  'product.json'
);
const productData = JSON.parse(fs.readFileSync(productFilePath, 'utf8'));

exports.getAllAlbums = async (req, res) => {
  try {
    const allAlbum = await Album.find();
    res.status(200).json({
      status: 'success',
      //dataLength: productData.length,
      data: {
        album: allAlbum,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'error',
      message: err,
    });
  }
};

exports.postNewAlbum = async (req, res) => {
  // //console.log(req.body);
  // const newId = productData[productData.length - 1].id + 1;
  // const newBody = Object.assign({ id: newId }, req.body);
  //productData.push(newBody);
  // fs.writeFile(productFilePath, JSON.stringify(productData), (err) => {
  //   res.status(200).json({
  //     status: 'success',
  //     data: {
  //       album: newBody,
  //     },
  //   });
  // });

  try {
    const newAlbum = await Album.create(req.body);
    res.status(200).json({
      status: 'success',
      data: {
        album: newAlbum,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'error',
      message: err,
    });
  }
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
