import axios from 'axios';

const helperAxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 10000,
});

helperAxiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    try {
      config.headers.Authorization = `Bearer ${JSON.parse(token)}`;
    } catch {
      localStorage.removeItem('token');
    }
  }
  return config;
});

helperAxiosInstance.interceptors.response.use(
  (response) => response.data,
  (error) => {
    return Promise.reject({
      message: error.response?.data?.message || 'Something went wrong',
      status: error.response?.status,
    });
  },
);

export default helperAxiosInstance;
