const catchAsyncHandler = require('../middleware/catchAsyncHandler');
const AppError = require('../middleware/customError');
const Admin = require('../models/admin');
const Appointment = require('../models/Appointment');
const Doctor = require('../models/Doctor');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const User = require('../models/User');
// @des Register admin
// @route POST /api/admin/register
// @access Public
const registerAdmin = catchAsyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return next(new AppError('Please provide name, email, and password', 400));
  }
  const admin = await Admin.create({
    name,
    email,
    password,
  });
  // Generate token
  const token = admin.generateJWT();
  // Send response
  res.status(201).json({
    success: true,
    token,
    message: 'Admin registered successfully',
  });
});
// @des Login admin
// @route POST /api/admin/login
// @access Public
const loginAdmin = catchAsyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new AppError('Please provide email and password', 400));
  }
  const admin = await Admin.findOne({ email }).select('+password');
  if (!admin) {
    return next(new AppError('Invalid credentials', 401));
  }
  const isMatch = await admin.comparePassword(password);
  if (!isMatch) {
    return next(new AppError('Invalid credentials', 401));
  }
  // Generate token
  const token = admin.generateJWT();
  // Send response
  res.status(200).json({
    success: true,
    token,
    user: admin,
    message: 'Admin logged in successfully',
  });
});
// @des Get appointments of all doctors
// @route GET /api/admin/appointments
// @access Private
const adminAppointmentsDoctor = catchAsyncHandler(async (req, res, next) => {
  const admin = await Admin.findById(req.admin.id);
  if (!admin) {
    return next(new AppError('Not authorized to view appointments', 404));
  }
  const appointments = await Appointment.find({});
  res.status(200).json({
    success: true,
    appointments,
    message: 'Appointments retrieved successfully',
  });
});

// @des Cancel appointment of doctor
// @route PATCH /api/admin/appointments/:appointmentId/cancel
// @access Private
const adminAppointmentsDoctorCancel = catchAsyncHandler(
  async (req, res, next) => {
    const admin = await Admin.findById(req.admin.id);
    if (!admin) {
      return next(new AppError('Not authorized to cancel appointment', 404));
    }
    const appointment = await Appointment.findById(req.params.appointmentId);
    if (!appointment) {
      return next(new AppError('Appointment not found', 404));
    }
    if (appointment.cancelled) {
      return next(new AppError('Appointment already canceled', 400));
    }
    appointment.cancelled = true;
    await appointment.save();
    res.status(200).json({
      success: true,
      appointment,
      message: 'Appointment canceled successfully',
    });
  },
);
// @des Add doctor
// @route POST /api/admin/doctor
// @access Private
const adminAddDoctor = catchAsyncHandler(async (req, res, next) => {
  const {
    name,
    email,
    password,
    speciality,
    degree,
    experience,
    about,
    fees,
    address,
  } = req.body;
  const imageFile = req.file;
  if (!imageFile) {
    return next(new AppError('Please upload an image', 400));
  }
  if (!name || !email || !password || !speciality || !degree || !experience) {
    return next(new AppError('Please provide all fields', 400));
  }
  const admin = await Admin.findById(req.admin.id);
  if (!admin) {
    return next(new AppError('Not authorized to add doctor', 404));
  }
  // Upload image to Cloudinary
  const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
    resource_type: 'image',
    folder: 'image',
  });
  // Delete local file
  fs.unlink(imageFile.path, (err) => {
    if (err) console.error('Failed to delete local file:', err);
  });
  // Create doctor
  const doctorData = {
    name,
    email,
    password,
    speciality,
    degree,
    experience,
    about,
    fees,
    address,
    image: imageUpload.secure_url,
  };
  const doctor = new Doctor(doctorData);
  await doctor.save();
  res.status(201).json({
    success: true,
    doctor,
    message: 'Doctor added successfully',
  });
});
// @des Change doctor availability
// @route PATCH /api/admin/doctor/:doctorId/availability
// @access Private
const adminChangeDoctorAvailability = catchAsyncHandler(
  async (req, res, next) => {
    const admin = await Admin.findById(req.admin.id);
    if (!admin) {
      return next(
        new AppError('Not authorized to change doctor availability', 404),
      );
    }
    const doctor = await Doctor.findById(req.params.doctorId);
    if (!doctor) {
      return next(new AppError('Doctor not found', 404));
    }
    doctor.available = !doctor.available;
    await doctor.save();
    res.status(200).json({
      success: true,
      doctor,
      message: 'Doctor availability updated successfully',
    });
  },
);
// @des Get all doctors
// @route GET /api/admin/doctors
// @access Private
const adminAllDoctors = catchAsyncHandler(async (req, res, next) => {
  const admin = await Admin.findById(req.admin.id);
  if (!admin) {
    return next(new AppError('Not authorized to view doctors', 404));
  }
  const doctors = await Doctor.find({});
  res.status(200).json({
    success: true,
    doctors,
    message: 'Doctors retrieved successfully',
  });
});
// @des Get dashboard stats
// @route GET /api/admin/dashboard
// @access Private
const adminDashboard = catchAsyncHandler(async (req, res, next) => {
  const admin = await Admin.findById(req.admin.id);
  if (!admin) {
    return next(new AppError('Not authorized to view dashboard stats', 404));
  }
  const stats = {
    totalDoctors: await Doctor.countDocuments(),
    totalAppointments: await Appointment.countDocuments(),
    totalUsers: await User.countDocuments(),
  };
  res.status(200).json({
    success: true,
    stats,
    message: 'Dashboard stats retrieved successfully',
  });
});

module.exports = {
  registerAdmin,
  loginAdmin,
  adminAddDoctor,
  adminAppointmentsDoctor,
  adminAppointmentsDoctorCancel,
  adminChangeDoctorAvailability,
  adminAllDoctors,
  adminDashboard,
};
