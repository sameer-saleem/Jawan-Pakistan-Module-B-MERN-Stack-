import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const api = axios.create({
  baseURL: 'http://localhost:5000/api/users',
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
});

// ── Attach JWT token to every request automatically ───────
// After login, the token is saved in AsyncStorage.
// This interceptor reads it and adds it to every API call
// so protected routes (/doctors, /slots, /appointments) work.
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ── Clean up error messages from backend ──────────────────
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message ||
      error.response?.data?.error   ||
      error.message                 ||
      'Something went wrong';
    return Promise.reject(new Error(message));
  }
);

export default api;