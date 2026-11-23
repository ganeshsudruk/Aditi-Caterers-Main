import axios from 'axios';

const API_BASE_URL = "http://localhost:5000/api" || '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Request interceptor to attach JWT token if present
api.interceptors.request.use((config) => {
  const token =
    localStorage.getItem('aditi_admin_token') ||
    sessionStorage.getItem('aditi_admin_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor for consistent error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Standardize error message without exposing backend stack trace
    const message =
      error.response?.data?.message ||
      error.message ||
      'An unexpected error occurred. Please try again.';
    return Promise.reject({ ...error, userMessage: message });
  }
);

export default api;
