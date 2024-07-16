const express = require('express');
const fs = require('fs');
const path = require('path');
const Album = require('./../models/modelAlbum');
let count = 2;

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
  try {
    const newAlbum = await Album.create(req.body);
    count = count + 1;
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

exports.getSingleAlbum = async (req, res) => {
  try {
    const singleAlbum = await Album.findById(req.params.id);
    res.status(200).json({
      success: 'success',
      data: {
        singleAlbum,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'error',
      message: err,
    });
  }
};

exports.updateSingleAlbum = async (req, res) => {
  try {
    const updateAlbum = await Album.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: 'success',
      message: 'Entry updated',
      data: {
        updateAlbum,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'Error. Update unsuccessfully!',
      message: err,
    });
  }
};

exports.deleteAlbum = (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Entry deleted',
  });
};
