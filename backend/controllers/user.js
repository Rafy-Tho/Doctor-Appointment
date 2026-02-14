const ENV = require('../configs/env');
const catchAsyncHandler = require('../middleware/catchAsyncHandler');
const AppError = require('../middleware/customError');
const Appointment = require('../models/Appointment');
const Doctor = require('../models/Doctor');
const User = require('../models/User');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const stripe = require('stripe');

const stripeInstance = new stripe(ENV.STRIPE_SECRET_KEY);
// @des Register a new user
// @route POST /api/user/register
// @access Public
const registerUser = catchAsyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return next(new AppError('Please provide all fields', 400));
  }
  const user = await User.create({ name, email, password });

  const token = user.generateJWT();

  res.status(201).json({
    success: true,
    user,
    token,
    message: 'User registered successfully',
  });
});
// @des Login a user
// @route POST /api/user/login
// @access Public
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
  const token = user.generateJWT();
  res.status(200).json({
    success: true,
    token,
    user,
    message: 'User logged in successfully',
  });
});
const getUserProfile = catchAsyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    return next(new AppError('User not found', 404));
  }
  res.status(200).json({
    success: true,
    user,
    message: 'User profile retrieved successfully',
  });
});
// @des Update user profile
// @route PATCH /api/user/update-profile
// @access Private
const updateUserProfile = catchAsyncHandler(async (req, res, next) => {
  const { name, phone, address, dob, gender } = req.body;
  const imageFile = req.file;

  if (!name && !phone && !address && !dob && !gender && !imageFile) {
    return next(new AppError('At least one field is required', 400));
  }
  const user = await User.findById(req.user.id);
  if (!user) {
    return next(new AppError('User not found', 404));
  }
  if (imageFile) {
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: 'image',
      folder: 'image',
    });

    user.image = imageUpload.secure_url;
    // Delete local file
    fs.unlink(imageFile.path, (err) => {
      if (err) console.error('Failed to delete local file:', err);
    });
  }

  // Update user fields
  user.name = name || user.name;
  user.phone = phone || user.phone;
  user.address = address ? JSON.parse(address) : user.address;
  user.dob = dob || user.dob;
  user.gender = gender || user.gender;
  // Save updated user
  await user.save();
  // Send response
  res.status(200).json({
    success: true,
    user,
    message: 'User profile updated successfully',
  });
});
// @des Book an appointment with a doctor
// @route POST /api/user/book-appointment/:doctorId
// @access Private
const bookAppointment = catchAsyncHandler(async (req, res, next) => {
  const { doctorId } = req.params;
  const { slotDate } = req.body;
  // Check if doctorId is valid
  if (!doctorId || !slotDate) {
    return next(new AppError('All fields are required', 400));
  }
  // Check if doctor exists
  const doctor = await Doctor.findById(doctorId);
  if (!doctor) {
    return next(new AppError('Doctor not found', 404));
  }
  // Check if doctor is available
  if (!doctor.available) {
    return next(new AppError('Doctor not available', 400));
  }
  // Check if slot is already booked
  const appointmentExists = await Appointment.findOne({
    doctorId,
    slotDate,
  });
  if (appointmentExists) {
    return next(new AppError('Slot already booked', 400));
  }
  // Create appointment
  const appointment = new Appointment({
    userId: req.user.id,
    doctorId,
    slotDate,
    amount: doctor.fees,
  });
  await appointment.save();
  res.status(200).json({
    success: true,
    appointment,
    message: 'Appointment booked successfully',
  });
});
// @des Cancel an appointment
// @route PATCH /api/user/appointments/:appointmentId/cancel
// @access Private
const cancelAppointment = catchAsyncHandler(async (req, res, next) => {
  const { appointmentId } = req.params;
  // Check if appointmentId is valid
  if (!appointmentId) {
    return next(new AppError('Appointment ID is required', 400));
  }
  // Check if appointment exists
  const appointment = await Appointment.findById(appointmentId);
  if (!appointment) {
    return next(new AppError('Appointment not found', 404));
  }
  // Check if appointment belongs to user
  if (appointment.userId.toString() !== req.user.id) {
    return next(new AppError('Not authorized to cancel this appointment', 403));
  }
  // Check if appointment is already cancelled
  if (appointment.cancelled) {
    return next(new AppError('Appointment already cancelled', 400));
  }
  // Mark appointment as cancelled
  appointment.cancelled = true;
  await appointment.save();
  res.status(200).json({
    success: true,
    appointment,
    message: 'Appointment cancelled successfully',
  });
});
// @des List all appointments
// @route GET /api/user/appointments
// @access Private
// eslint-disable-next-line no-unused-vars
const listAppointments = catchAsyncHandler(async (req, res, next) => {
  const appointments = await Appointment.find({ userId: req.user.id }).populate(
    'doctorId',
  );
  res.status(200).json({
    success: true,
    appointments,
    message: 'Appointments retrieved successfully',
  });
});
const getAppointmentWithSpecificDoctor = catchAsyncHandler(
  async (req, res, next) => {
    const { doctorId } = req.params;
    // Check if doctorId is valid
    if (!doctorId) {
      return next(new AppError('Doctor ID is required', 400));
    }
    const now = new Date();

    // Check if appointment exists
    const appointments = await Appointment.find(
      {
        doctorId,
        slotDate: { $gte: now },
        cancelled: false,
      },
      { slotDate: 1, _id: 0 },
    );

    if (!appointments) {
      return next(new AppError('Appointment not found', 404));
    }

    res.status(200).json({
      success: true,
      appointments,
      message: 'Appointment retrieved successfully',
    });
  },
);
// @des Generate Stripe payment session
// @route POST /api/user/payment-stripe/:appointmentId
// @access Private
const paymentStripe = catchAsyncHandler(async (req, res, next) => {
  const { appointmentId } = req.params;
  const { origin } = req.headers;

  const appointment = await Appointment.findById(appointmentId);

  if (appointment.userId.toString() !== req.user.id) {
    return next(new AppError('Not authorized', 403));
  }

  if (!appointment || appointment.cancelled) {
    return next(new AppError('Appointment Cancelled or not found', 400));
  }

  const currency = ENV.CURRENCY.toLowerCase();

  const line_items = [
    {
      price_data: {
        currency,
        product_data: {
          name: 'Appointment Fees',
        },
        unit_amount: appointment.amount * 100,
      },
      quantity: 1,
    },
  ];

  const session = await stripeInstance.checkout.sessions.create({
    success_url: `${origin}/verify?session_id={CHECKOUT_SESSION_ID}&appointmentId=${appointment._id}`,
    cancel_url: `${origin}/verify?success=false&appointmentId=${appointment._id}`,
    line_items: line_items,
    mode: 'payment',
  });

  res.json({
    success: true,
    session_url: session.url,
    message: 'Redirecting to payment gateway',
  });
});
// @des Verify Stripe payment
// @route POST /api/user/verify-stripe/:appointmentId
// @access Private
// eslint-disable-next-line no-unused-vars
const verifyStripe = catchAsyncHandler(async (req, res, next) => {
  const { appointmentId } = req.params;
  const { sessionId } = req.body;
  // Check if sessionId is valid
  if (!sessionId) {
    return next(new AppError('Session ID is required', 400));
  }
  const appointment = await Appointment.findById(appointmentId);
  if (!appointment || appointment.userId.toString() !== req.user.id) {
    return next(new AppError('Appointment not found or unauthorized', 403));
  }
  const session = await stripeInstance.checkout.sessions.retrieve(sessionId);
  if (session.payment_status !== 'paid') {
    return res.json({ success: false, message: 'Payment not completed' });
  }

  appointment.payment = true;
  await appointment.save();
  return res.json({ success: true, message: 'Payment Successful' });
});

module.exports = {
  paymentStripe,
  verifyStripe,
  getAppointmentWithSpecificDoctor,
  registerUser,
  loginUser,
  updateUserProfile,
  bookAppointment,
  cancelAppointment,
  listAppointments,
  getUserProfile,
};
