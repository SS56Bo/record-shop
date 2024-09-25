const User = require('./../models/userModel');
const jwt = require('jsonwebtoken');
const catchAsyncError = require('./../utils/catchAsyncError');

exports.signup = catchAsyncError(async (req, res, next) => {
  const newUser = await User.create(req.body);

  let token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRY,
  });

  res.status(201).json({
    status: 'success',
    token,
    data: {
      user: newUser,
    },
  });
});
