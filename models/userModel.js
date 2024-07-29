const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter your name'],
  },
  email: {
    type: String,
    required: [true, 'Please enter your email address'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail],
  },
  password: {
    type: String,
    required: [true, 'Please enter a password.'],
    minLength: 8,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please enter a password.'],
  },
});

const UserInfo = mongoose.model('Users', userSchema);

module.exports = UserInfo;
