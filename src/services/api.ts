import axios, { AxiosInstance, AxiosError } from 'axios';
import { BACKEND_API_URL, DEFAULT_ERROR_MESSAGE } from '@/constants';

const api: AxiosInstance = axios.create({
  baseURL: BACKEND_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error: AxiosError) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    if (response.status >= 200 && response.status < 300) {
      return response;
    }
    
    const errorMessage = response.data?.message || DEFAULT_ERROR_MESSAGE;
    console.error('API Response Error:', response);
    
    return Promise.reject(new Error(errorMessage));
  },
  (error: AxiosError) => {
    console.error('API Response Error:', error);
    const errorMessage = error.response?.data?.message || DEFAULT_ERROR_MESSAGE;
    return Promise.reject(new Error(errorMessage));
  }
);

export default api;