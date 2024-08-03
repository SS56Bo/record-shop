const User = require('./../models/userModel');
const catchAsyncError = require('./../utils/catchAsyncError');
const AppError = require('./../utils/appError');

exports.updateUser = (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'this route is not yet defined',
  });
};

exports.getUser = (req, res) => {
  res
    .status(200)
    .json({ status: 'success', message: 'this route is not yet defined' });
};

exports.getAllUser = (req, res) => {
  res
    .status(200)
    .json({ status: 'success', message: 'this route is not yet defined' });
};

exports.deleteUser = (req, res) => {
  res
    .status(200)
    .json({ status: 'success', message: 'this route is not yet defined' });
};

exports.createUser = (req, res) => {
  res
    .status(200)
    .json({ status: 'success', message: 'this route is not yet defined' });
};
