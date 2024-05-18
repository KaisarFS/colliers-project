import axios from 'axios';
import { API_URL } from '../api/constants/apiConstants.js';

const api = axios.create({
  baseURL: API_URL,
});

// api.interceptors.push({
//   request: (config) => {
//     const token = AsyncStorage.getItem('token');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
// });

export default api;