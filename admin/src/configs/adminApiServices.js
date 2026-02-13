import helperAxiosInstance from './helperAxiosInstance.js';
const adminApiService = {
  login: ({ email, password }) =>
    helperAxiosInstance.post('/admin/login', { email, password }),

  createDoctor: ({ formData }) =>
    helperAxiosInstance.post('/admin/doctor', formData),

  getAppointments: () => helperAxiosInstance.get('/admin/appointments'),

  cancelAppointment: ({ appointmentId }) =>
    helperAxiosInstance.patch(`/admin/appointments/${appointmentId}/cancel`),

  changeDoctorAvailability: ({ doctorId }) =>
    helperAxiosInstance.patch(`/admin/doctor/${doctorId}/availability`),

  getAllDoctors: () => helperAxiosInstance.get('/admin/doctors'),

  getDashboard: () => helperAxiosInstance.get('/admin/dashboard'),
};

export default adminApiService;
