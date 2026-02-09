const express = require('express');
const {
  loginAdmin,
  adminChangeDoctorAvailability,
  adminAllDoctors,
  adminDashboard,
  adminAppointmentsDoctor,
  adminAppointmentsDoctorCancel,
  adminAddDoctor,
  registerAdmin,
} = require('../controllers/admin');

const upload = require('../middleware/multer');
const {
  authenticateAdmin,
  authorizeAdmin,
} = require('../middleware/authAdmin');
const adminRouter = express.Router();

adminRouter.post('/register', registerAdmin);
adminRouter.post('/login', loginAdmin);
adminRouter.patch(
  '/doctor/:doctorId/availability',
  authenticateAdmin,
  authorizeAdmin(),
  adminChangeDoctorAvailability,
);
adminRouter.post(
  '/doctor',
  authenticateAdmin,
  authorizeAdmin(),
  upload.single('image'),
  adminAddDoctor,
);
adminRouter.get(
  '/doctors',
  authenticateAdmin,
  authorizeAdmin(),
  adminAllDoctors,
);
adminRouter.get(
  '/dashboard',
  authenticateAdmin,
  authorizeAdmin(),
  adminDashboard,
);
adminRouter.get(
  '/appointments',
  authenticateAdmin,
  authorizeAdmin(),
  adminAppointmentsDoctor,
);
adminRouter.patch(
  '/appointments/:appointmentId/cancel',
  authenticateAdmin,
  authorizeAdmin(),
  adminAppointmentsDoctorCancel,
);

module.exports = adminRouter;
