import helperAxiosInstance from './helperAxiosInstance.js';

const doctorApiService = {
  getDoctorsList: () => helperAxiosInstance.get('/doctor/doctor-list'),
};

export default doctorApiService;
