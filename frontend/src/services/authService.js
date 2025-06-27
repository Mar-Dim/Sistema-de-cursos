// src/services/authService.js
import axios from 'axios';

const API = 'http://localhost:3000';

export const login = (email, password) => {
  return axios.post(`${API}/auth/login`, { email, password });
};

export const register = (userData) => {
  return axios.post(`${API}/auth/register`, userData);
}