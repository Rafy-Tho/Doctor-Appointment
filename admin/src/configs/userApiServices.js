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
    helperAxiosInstance.patch(`/user/appointments/${appointmentId}/cancel`),

  listAppointments: () => helperAxiosInstance.get('/user/appointments'),

  getSlotDate: ({ doctorId }) =>
    helperAxiosInstance.get(`/user/appointments/${doctorId}`),

  paymentStripe: ({ appointmentId }) =>
    helperAxiosInstance.post(`/user/payment-stripe/${appointmentId}`),

  verifyStripe: ({ appointmentId, sessionId }) =>
    helperAxiosInstance.post(`/user/verify-stripe/${appointmentId}`, {
      sessionId,
    }),
};

export default userApiService;
