const catchAsyncHandler = require('./catchAsyncHandler');
const AppError = require('./customError');
const jwt = require('jsonwebtoken');
const ENV = require('../configs/env');
const User = require('../models/User');

const authenticateUser = catchAsyncHandler(async (req, res, next) => {
  const authHeader = req.header('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(new AppError('Not authorized to access this route', 401));
  }

  const token = authHeader.replace('Bearer ', '');

  const decoded = jwt.verify(token, ENV.JWT_SECRET);

  const user = await User.findById(decoded.id);
  if (!user) {
    return next(new AppError('User not found', 404));
  }
  req.user = user;
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
