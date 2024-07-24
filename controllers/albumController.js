const express = require('express');
const path = require('path');
const Album = require('./../models/modelAlbum');
const APIFeatures = require('./../utils/APIFeatures');
const catchAsyncError = require('./../utils/catchAsyncError');
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

// const catchAsyncError

exports.getAllAlbums = catchAsyncError(async (req, res, next) => {
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
});

exports.postNewAlbum = catchAsyncError(async (req, res, next) => {
  const newAlbum = await Album.create(req.body);
  res.status(200).json({
    status: 'success',
    data: {
      album: newAlbum,
    },
  });
});

exports.getSingleAlbum = catchAsyncError(async (req, res, next) => {
  const singleAlbum = await Album.findById(req.params.id);
  res.status(200).json({
    success: 'success',
    data: {
      singleAlbum,
    },
  });
});

exports.updateSingleAlbum = catchAsyncError(async (req, res) => {
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
});

exports.deleteAlbum = catchAsyncError(async (req, res, next) => {
  await Album.findByIdAndDelete(req.params.id);
  res.status(200).json({
    status: 'success',
    message: 'Entry deleted',
    data: null,
  });
});

exports.getAlbumStats = catchAsyncError(async (req, res, next) => {
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
});
