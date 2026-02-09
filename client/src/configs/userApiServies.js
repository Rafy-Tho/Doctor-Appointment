import helperAxiosInstance from './helperAxiosInstance';

const userApiService = {
  userLogin: ({ email, password }) =>
    helperAxiosInstance.post('/user/login', { email, password }),

  userRegister: ({ email, password, name }) =>
    helperAxiosInstance.post('/user/register', { email, password, name }),

  getUserProfile: () => helperAxiosInstance.get('/user/profile'),

  updateUserProfile: ({ formData }) =>
    helperAxiosInstance.patch('/user/profile', formData),

  userBookAppointment: ({ slotDate, slotTime, doctorId }) =>
    helperAxiosInstance.post(`/user/book-appointment/${doctorId}`, {
      slotDate,
      slotTime,
    }),

  cancelUserAppointment: ({ appointmentId }) =>
    helperAxiosInstance.patch(`/user/cancel-appointment/${appointmentId}`),

  listUserAppointments: () => helperAxiosInstance.get('/user/appointments'),
};

export default userApiService;
