const catchAsyncHandler = require('./catchAsyncHandler');
const AppError = require('./customError');
const jwt = require('jsonwebtoken');
const ENV = require('../configs/env');
const User = require('../models/User');

const authenticateUser = catchAsyncHandler(async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return next(new AppError('Not authorized to access this route', 401));
  }
  const decoded = jwt.verify(token, ENV.JWT_SECRET);
  req.user = await User.findById(decoded.id);
  if (!req.user) {
    return next(new AppError('User not found', 404));
  }
  next();
});

const authorizeUser = () => {
  return (req, res, next) => {
    if (req.user.role !== 'patient') {
      return next(new AppError('Not authorized to access this route', 403));
    }
    next();
  };
};

module.exports = {
  authenticateUser,
  authorizeUser,
};
