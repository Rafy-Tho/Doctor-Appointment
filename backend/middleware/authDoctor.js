const catchAsyncHandler = require('./catchAsyncHandler');
const AppError = require('./customError');
const jwt = require('jsonwebtoken');
const ENV = require('../configs/env');
const Doctor = require('../models/Doctor');

const authenticateDoctor = catchAsyncHandler(async (req, res, next) => {
  const authHeader = req.header('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(new AppError('Not authorized to access this route', 401));
  }

  const token = authHeader.replace('Bearer ', '');

  const decoded = jwt.verify(token, ENV.JWT_SECRET);
  req.doctor = await Doctor.findById(decoded.id);
  if (!req.doctor) {
    return next(new AppError('Doctor not found', 404));
  }
  next();
});

const authorizeDoctor = () => {
  return (req, res, next) => {
    if (req.doctor.role !== 'doctor') {
      return next(new AppError('Not authorized to access this route', 403));
    }
    next();
  };
};

module.exports = {
  authenticateDoctor,
  authorizeDoctor,
};
