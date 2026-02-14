const catchAsyncHandler = require('../middleware/catchAsyncHandler');
const AppError = require('../middleware/customError');
const Appointment = require('../models/Appointment');
const Doctor = require('../models/Doctor');
// @des Login a doctor
// @route POST /api/doctor/login
// @access Public
const doctorLogin = catchAsyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // Check if email and password are provided
  if (!email || !password) {
    return next(new AppError('Please provide email and password', 400));
  }
  // Check if doctor exists
  const doctor = await Doctor.findOne({ email }).select('+password');

  if (!doctor) {
    return next(new AppError('Invalid email or password', 401));
  }
  // Check if password is correct
  const isPasswordCorrect = await doctor.comparePassword(password);
  if (!isPasswordCorrect) {
    return next(new AppError('Invalid email or password', 401));
  }
  // Generate token
  const token = doctor.generateJWT();
  // Send response
  res.status(200).json({
    success: true,
    token,
    user: doctor,
    message: 'Doctor logged in successfully',
  });
});
// @des Get appointments of a doctor
// @route GET /api/doctor/appointments
// @access Private
const appointmentsDoctor = catchAsyncHandler(async (req, res, next) => {
  const doctor = await Doctor.findById(req.doctor.id);
  if (!doctor) {
    return next(new AppError('Doctor not found', 404));
  }
  const appointments = await Appointment.find({
    doctorId: doctor._id,
  }).populate('userId', 'name image dob');
  res.status(200).json({
    success: true,
    appointments,
    message: 'Appointments retrieved successfully',
  });
});
// @des Cancel an appointment
// @route PATCH /api/doctor/appointments/:appointmentId/cancel
// @access Private
const appointmentCancel = catchAsyncHandler(async (req, res, next) => {
  const appointment = await Appointment.findOne({
    _id: req.params.appointmentId,
    doctorId: req.doctor.id,
  });
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
});
// @des Complete an appointment
// @route PATCH /api/doctor/appointments/:id/complete
// @access Private
const appointmentComplete = catchAsyncHandler(async (req, res, next) => {
  const appointment = await Appointment.findOne({
    _id: req.params.appointmentId,
    doctorId: req.doctor.id,
  });
  if (!appointment) {
    return next(new AppError('Appointment not found', 404));
  }
  if (appointment.isCompleted) {
    return next(new AppError('Appointment already completed', 400));
  }
  appointment.isCompleted = true;
  await appointment.save();
  res.status(200).json({
    success: true,
    appointment,
    message: 'Appointment completed successfully',
  });
});
// @des Get list of available doctors
// @route GET /api/doctor/doctor-list
// @access Public
// eslint-disable-next-line no-unused-vars
const doctorList = catchAsyncHandler(async (req, res, next) => {
  const doctors = await Doctor.find({ available: true });
  res.status(200).json({
    success: true,
    doctors,
  });
});
// @des Change availability of a doctor
// @route PATCH /api/doctor/availability
// @access Private
const changeAvailability = catchAsyncHandler(async (req, res, next) => {
  const doctor = await Doctor.findById(req.doctor.id);
  if (!doctor) {
    return next(new AppError('Doctor not found', 404));
  }
  doctor.available = !doctor.available;
  await doctor.save();
  res.status(200).json({
    success: true,
    doctor,
    message: 'Availability changed successfully',
  });
});
// @des Get profile of a doctor
// @route GET /api/doctor/profile
// @access Private
const doctorProfile = catchAsyncHandler(async (req, res, next) => {
  const doctor = await Doctor.findById(req.doctor.id);
  if (!doctor) {
    return next(new AppError('Doctor not found', 404));
  }
  res.status(200).json({
    success: true,
    doctor,
    message: 'Doctor profile retrieved successfully',
  });
});
// @des Update profile of a doctor
// @route PATCH /api/doctor/update-profile
// @access Private
const updateDoctorProfile = catchAsyncHandler(async (req, res, next) => {
  const { fees, address, available } = req.body;
  const doctor = await Doctor.findById(req.doctor.id);
  if (!doctor) {
    return next(new AppError('Doctor not found', 404));
  }
  if (fees) doctor.fees = fees;
  if (available) doctor.available = available;
  if (address) doctor.address = address;
  await doctor.save();
  res.status(200).json({
    success: true,
    doctor,
    message: 'Profile updated successfully',
  });
});
// @des Get dashboard of a doctor
// @route GET /api/doctor/dashboard
// @access Private
const doctorDashboard = catchAsyncHandler(async (req, res, next) => {
  const doctor = await Doctor.findById(req.doctor.id);
  if (!doctor) {
    return next(new AppError('Doctor not found', 404));
  }

  const dashData = await Appointment.aggregate([
    {
      $match: { doctorId: doctor._id }, // filter doctor's appointments
    },
    {
      $facet: {
        // 1️⃣ Total earnings
        earningsData: [
          {
            $match: {
              cancelled: { $ne: true },
              $or: [{ isCompleted: true }, { payment: true }],
            },
          },
          {
            $group: {
              _id: null,
              totalEarnings: { $sum: '$amount' },
            },
          },
        ],

        // 2️⃣ Total appointments
        appointmentCount: [
          {
            $count: 'totalAppointments',
          },
        ],

        // 3️⃣ Unique patients count
        patientCount: [
          {
            $group: {
              _id: '$userId',
            },
          },
          {
            $count: 'totalPatients',
          },
        ],

        latestAppointments: [
          { $sort: { slotDate: -1 } },
          { $limit: 5 }, // ✅ LIMIT 5 HERE
          {
            $lookup: {
              from: 'users',
              localField: 'userId',
              foreignField: '_id',
              as: 'userData',
            },
          },
          { $unwind: '$userData' },
          {
            $project: {
              slotDate: 1,
              isCompleted: 1,
              cancelled: 1,
              'userData.name': 1,
              'userData.image': 1,
            },
          },
        ],
      },
    },
  ]);
  res.status(200).json({
    success: true,
    ...dashData[0],
    message: 'Doctor dashboard retrieved successfully',
  });
});

module.exports = {
  doctorLogin,
  doctorProfile,
  updateDoctorProfile,
  doctorDashboard,
  appointmentsDoctor,
  appointmentCancel,
  appointmentComplete,
  doctorList,
  changeAvailability,
};
