const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

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
    required: [true, 'Please confirm your password.'],
    validate: {
      // Only works in case of CREATE and SAVE
      validator: function (el) {
        return el === this.password;
      },
      message: 'Passwords do not match!',
    },
  },
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);

  this.passwordConfirm = undefined;
  next();
});

const UserInfo = mongoose.model('Users', userSchema);

module.exports = UserInfo;
