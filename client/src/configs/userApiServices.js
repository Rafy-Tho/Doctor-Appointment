import helperAxiosInstance from './helperAxiosInstance';

const userApiService = {
  login: ({ email, password }) =>
    helperAxiosInstance.post('/user/login', { email, password }),

  register: ({ email, password, name }) =>
    helperAxiosInstance.post('/user/register', { email, password, name }),

  getProfile: () => helperAxiosInstance.get('/user/profile'),

  updateProfile: (formData) =>
    helperAxiosInstance.patch('/user/update-profile', formData),

  bookAppointment: ({ slotDate, doctorId }) =>
    helperAxiosInstance.post(`/user/book-appointment/${doctorId}`, {
      slotDate,
    }),

  cancelAppointment: ({ appointmentId }) =>
    helperAxiosInstance.patch(`/user/cancel-appointment/${appointmentId}`),

  listAppointments: () => helperAxiosInstance.get('/user/appointments'),
  getSlotDate: (doctorId) =>
    helperAxiosInstance.get(`/user/appointments/${doctorId}`),
};

export default userApiService;
