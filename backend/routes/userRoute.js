const express = require('express');
const {
  registerUser,
  loginUser,
  bookAppointment,
  cancelAppointment,
  listAppointments,
  updateUserProfile,
  getUserProfile,
} = require('../controllers/user');
const { authorizeUser, authenticateUser } = require('../middleware/authUser');
const upload = require('../middleware/multer');
const userRouter = express.Router();
// user and user action
userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.get('/profile', authenticateUser, authorizeUser(), getUserProfile);
userRouter.patch(
  '/update-profile',
  authenticateUser,
  authorizeUser(),
  upload.single('image'),
  updateUserProfile,
);
//  appointment booking
userRouter.post(
  '/book-appointment/:doctorId',
  authenticateUser,
  authorizeUser(),
  bookAppointment,
);
userRouter.post(
  '/cancel-appointment/:appointmentId',
  authenticateUser,
  authorizeUser(),
  cancelAppointment,
);
userRouter.get(
  '/appointments',
  authenticateUser,
  authorizeUser(),
  listAppointments,
);
module.exports = userRouter;
