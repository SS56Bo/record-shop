const express = require('express');
const path = require('path');
const Album = require('./../models/modelAlbum');

exports.getAllAlbums = async (req, res) => {
  try {
    console.log(req.query);

    // 1 -> FILTERING
    const objQuery = { ...req.query };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((el) => delete objQuery[el]);

    // 2 -> ADVANCED FILTERING
    let queryStr = JSON.stringify(objQuery);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    let queryAlbum = Album.find(JSON.parse(queryStr));

    // 3 -> SORTING
    if (req.query.sort) {
      let sortBy = req.query.sort.split(',').join(' ');
      console.log(sortBy);
      queryAlbum = queryAlbum.sort(sortBy);
    } else {
      queryAlbum = queryAlbum.sort('-rating');
    }
    // -{paramter to be sorted } for DESC order
    // {paramter to be sorted } for ASC order

    // 4-> FIELD LIMITING
    if (req.query.fields) {
      let fields = req.query.fields.split(',').join(' ');
      queryAlbum = queryAlbum.select(fields);
    } else {
      queryAlbum = queryAlbum.select('-__v');
    }

    // 5-> PAGINATION
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 100;
    const skip = (page - 1) * limit;
    queryAlbum = queryAlbum.skip(skip).limit(limit);

    if (req.query.page) {
      const numTours = await Album.countDocuments();
      if (skip >= numTours) throw new Error('This page does not exist!');
    }

    const allAlbum = await queryAlbum;
    res.status(200).json({
      status: 'success',
      results: allAlbum.length,
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
