const express = require('express');
const path = require('path');
const Album = require('./../models/modelAlbum');
const { group } = require('console');

exports.aliasTopAlbum = (req, res, next) => {
  req.query.limit = 5;
  req.query.sort = '-ratings,-price';
  req.query.fields = 'title,artist,rating,description,price';
  next();
};

exports.getCheapAlbums = (req, res, next) => {
  req.query.limit = 5;
  req.query.sort = 'rating,price';
  req.query.fields = 'title,artist,rating,description,price';
  next();
};

class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    const queryObj = { ...this.queryString };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((el) => delete queryObj[el]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-rating');
    }
    return this;
  }

  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v');
    }
    return this;
  }

  paginate() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 100;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

exports.getAllAlbums = async (req, res) => {
  try {
    console.log(req.query);

    // // 1 -> FILTERING
    // const objQuery = { ...req.query };
    // const excludedFields = ['page', 'sort', 'limit', 'fields'];
    // excludedFields.forEach((el) => delete objQuery[el]);

    // // 2 -> ADVANCED FILTERING
    // queryStr = JSON.stringify(objQuery);
    // queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    // queryAlbum = Album.find(JSON.parse(queryStr));

    // 3 -> SORTING/
    // if (req.query.sort) {
    //   let sortBy = req.query.sort.split(',').join(' ');
    //   console.log(sortBy);
    //   this.queryAlbum = this.queryAlbum.sort(sortBy);
    // } else {
    //   this.queryAlbum = this.queryAlbum.sort('-rating');
    // }
    // -{paramter to be sorted } for DESC order
    // {paramter to be sorted } for ASC order

    // 4-> FIELD LIMITING
    // if (req.query.fields) {
    //   let fields = req.query.fields.split(',').join(' ');
    //   queryAlbum = queryAlbum.select(fields);
    // } else {
    //   queryAlbum = queryAlbum.select('-__v');
    // }

    // // 5-> PAGINATION
    // const page = req.query.page * 1 || 1;
    // const limit = req.query.limit * 1 || 100;
    // const skip = (page - 1) * limit;
    // queryAlbum = queryAlbum.skip(skip).limit(limit);

    // if (req.query.page) {
    //   const numTours = await Album.countDocuments();
    //   if (skip >= numTours) throw new Error('This page does not exist!');
    // }

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
