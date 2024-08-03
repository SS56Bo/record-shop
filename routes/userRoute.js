const express = require('express');
const userRouter = express.Router();
const authController = require('./../controllers/authController');
const userController = require('./../controllers/userController');
const AppError = require('./../utils/appError');
const globalErrorHandler = require('./../controllers/errorController');

userRouter.route('/signup').post(authController.signup);

userRouter
  .route('/')
  .get(userController.getAllUser)
  .post(userController.createUser);

userRouter
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = userRouter;
