const catchAsyncHandler = require('../middleware/catchAsyncHandler');
const AppError = require('../middleware/customError');
const User = require('../models/User');

const registerUser = catchAsyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return next(new AppError('Please provide all fields', 400));
  }
  const user = await User.create({ name, email, password });

  const token = user.getJWTToken();

  res.status(201).json({
    success: true,
    token,
  });
});

const loginUser = catchAsyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new AppError('Please provide email and password', 400));
  }
  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    return next(new AppError('Invalid email or password', 401));
  }
  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new AppError('Invalid email or password', 401));
  }
  const token = user.getJWTToken();
  res.status(200).json({
    success: true,
    token,
  });
});

module.exports = {
  registerUser,
  loginUser,
};
