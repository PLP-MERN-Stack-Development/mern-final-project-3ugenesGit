import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  timeout: 20000,
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('waste-auth-token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('waste-auth-token');
      localStorage.removeItem('waste-auth-user');
    }
    return Promise.reject(error);
  }
);

export default apiClient;

