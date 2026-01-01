import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { ApiError, ErrorResponse, ValidationErrorResponse } from './types';

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080';
// const API_BASE_URL = 'https://backend-web-production-ed12.up.railway.app';

// Create axios instance
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
});

// Request interceptor - add auth token
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('admin_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor - handle errors
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ErrorResponse | ValidationErrorResponse>) => {
    if (error.response) {
      const { status, data } = error.response;
      
      // Handle 401 - redirect to login
      if (status === 401 && typeof window !== 'undefined') {
        localStorage.removeItem('admin_token');
        localStorage.removeItem('admin_user');
        window.location.href = '/admin/login';
      }
      
      const message = data?.message || 'An unexpected error occurred';
      const errors = 'errors' in data ? data.errors : undefined;
      
      throw new ApiError(message, status, errors);
    }
    
    throw new ApiError('Network error. Please check your connection.', 0);
  }
);

export default apiClient;

