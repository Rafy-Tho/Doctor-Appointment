import helperAxiosInstance from './helperAxiosInstance.js';

const doctorApiService = {
  doctorLogin: ({ email, password }) =>
    helperAxiosInstance.post('/doctor/login', { email, password }),

  getDoctorProfile: () => helperAxiosInstance.get('/doctor/profile'),

  updateDoctorProfile: ({ fees, address, available }) =>
    helperAxiosInstance.patch('/doctor/update-profile', {
      fees,
      address,
      available,
    }),

  getDoctorAppointments: () => helperAxiosInstance.get('/doctor/appointments'),

  doctorAppointmentsCancel: ({ appointmentId }) =>
    helperAxiosInstance.patch(`/doctor/appointments/${appointmentId}/cancel`),

  doctorAppointmentsComplete: ({ appointmentId }) =>
    helperAxiosInstance.patch(`/doctor/appointments/${appointmentId}/complete`),

  getDoctorList: () => helperAxiosInstance.get('/doctor/doctor-list'),

  changeDoctorAvailability: () =>
    helperAxiosInstance.patch('/doctor/availability'),
};

export default doctorApiService;
