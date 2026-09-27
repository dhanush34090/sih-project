import axios from 'axios';

// Set VITE_API_URL in a .env file (or in your host's environment settings) to point
// this at your deployed backend. Falls back to localhost for local development.
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' }
});

export const getProducts = () => api.get('/products');
export const createProduct = data => api.post('/products', data);
export const getSales = () => api.get('/sales');
export const getSocialData = () => api.get('/social-data');
export const getPredictions = () => api.get('/predictions');

export default api;
