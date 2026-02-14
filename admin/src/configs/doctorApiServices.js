import helperAxiosInstance from './helperAxiosInstance.js';

const doctorApiService = {
  login: ({ email, password }) =>
    helperAxiosInstance.post('/doctor/login', { email, password }),

  getProfile: () => helperAxiosInstance.get('/doctor/profile'),

  updateProfile: ({ fees, address, available }) =>
    helperAxiosInstance.patch('/doctor/update-profile', {
      fees,
      address,
      available,
    }),

  getAppointments: () => helperAxiosInstance.get('/doctor/appointments'),

  cancelAppointment: ({ appointmentId }) =>
    helperAxiosInstance.patch(`/doctor/appointments/${appointmentId}/cancel`),

  completeAppointment: ({ appointmentId }) =>
    helperAxiosInstance.patch(`/doctor/appointments/${appointmentId}/complete`),

  getDoctorsList: () => helperAxiosInstance.get('/doctor/doctor-list'),

  changeAvailability: () => helperAxiosInstance.patch('/doctor/availability'),
  getDashboard: () => helperAxiosInstance.get('/doctor/dashboard'),
};

export default doctorApiService;
