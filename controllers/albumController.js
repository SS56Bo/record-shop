const express = require('express');
const path = require('path');
const Album = require('./../models/modelAlbum');
const APIFeatures = require('./../utils/APIFeatures');
const { group } = require('console');

exports.aliasTopAlbum = (req, res, next) => {
  req.query.limit = 5;
  req.query.sort = 'ratings,-price';
  req.query.fields = 'title,artist,rating,description,price';
  next();
};

exports.getCheapAlbums = (req, res, next) => {
  req.query.limit = 5;
  req.query.sort = 'rating,price';
  req.query.fields = 'title,artist,rating,description,price';
  next();
};

exports.getAllAlbums = async (req, res) => {
  try {
    console.log(req.query);

    const features = new APIFeatures(Album.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const allAlbum = await features.query;

    res.status(200).json({
      status: 'success',
      results: allAlbum.length,
      data: {
        album: allAlbum,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'Error',
      message: err,
    });
  }
};

exports.postNewAlbum = async (req, res) => {
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
      status: 'Error. Update unsuccessfull!',
      message: err,
    });
  }
};

exports.deleteAlbum = async (req, res) => {
  try {
    await Album.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: 'success',
      message: 'Entry deleted',
      data: null,
    });
  } catch (err) {
    res.status(400).json({
      status: 'Error. Deletion unsuccessfull!',
      message: err,
    });
  }
};

exports.getAlbumStats = async (req, res) => {
  try {
    const stat = await Album.aggregate([
      {
        $match: { rating: { $gte: 4.0 } },
      },
      {
        $group: {
          _id: '$genre',
          numTours: { $sum: 1 },
          avgRating: { $avg: '$rating' },
          avgPrice: { $avg: '$price' },
          minPrice: { $min: '$price' },
          maxPrice: { $max: '$price' },
        },
      },
      {
        $sort: { avgPrice: 1 },
      },
    ]);

    res.status(200).json({
      status: 'success',
      message: 'Entry deleted',
      data: stat,
    });
  } catch (err) {
    res.status(404).json({
      status: 'Failed to fetch.......',
      message: err,
    });
  }
};
