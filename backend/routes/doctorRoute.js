const express = require('express');
const {
  doctorLogin,
  doctorProfile,
  updateDoctorProfile,
  doctorDashboard,
  appointmentsDoctor,
  appointmentCancel,
  appointmentComplete,
  doctorList,
  changeAvailability,
} = require('../controllers/doctor');
const {
  authenticateDoctor,
  authorizeDoctor,
} = require('../middleware/authDoctor');

const doctorRouter = express.Router();

doctorRouter.post('/login', doctorLogin);
doctorRouter.get(
  '/profile',
  authenticateDoctor,
  authorizeDoctor(),
  doctorProfile,
);
doctorRouter.patch(
  '/update-profile',
  authenticateDoctor,
  authorizeDoctor(),
  updateDoctorProfile,
);
doctorRouter.get(
  '/dashboard',
  authenticateDoctor,
  authorizeDoctor(),
  doctorDashboard,
);
doctorRouter.get(
  '/appointments',
  authenticateDoctor,
  authorizeDoctor(),
  appointmentsDoctor,
);
doctorRouter.patch(
  '/appointments/:appointmentId/cancel',
  authenticateDoctor,
  authorizeDoctor(),
  appointmentCancel,
);
doctorRouter.patch(
  '/appointments/:appointmentId/complete',
  authenticateDoctor,
  authorizeDoctor(),
  appointmentComplete,
);
doctorRouter.get('/doctor-list', doctorList);
doctorRouter.patch(
  '/availability',
  authenticateDoctor,
  authorizeDoctor(),
  changeAvailability,
);

module.exports = doctorRouter;
