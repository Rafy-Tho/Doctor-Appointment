const Admin = require('../models/admin');
const catchAsyncHandler = require('./catchAsyncHandler');
const AppError = require('./customError');
const jwt = require('jsonwebtoken');
const ENV = require('../configs/env');

const authenticateAdmin = catchAsyncHandler(async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return next(new AppError('Not authorized to access this route', 401));
  }
  const decoded = jwt.verify(token, ENV.JWT_SECRET);
  req.admin = await Admin.findById(decoded.id);
  if (!req.admin) {
    return next(new AppError('Admin not found', 404));
  }
  next();
});

const authorizeAdmin = () => {
  return (req, res, next) => {
    if (req.admin.role !== 'admin') {
      return next(new AppError('Not authorized to access this route', 403));
    }
    next();
  };
};

module.exports = {
  authenticateAdmin,
  authorizeAdmin,
};
