// src/services/authService.js
import axios from 'axios';

const API = 'http://localhost:3000';

export const login = (email, password) => {
  return axios.post(`${API}/auth/login`, { email, password });
};

export const register = (email, password, username) => {
  return axios.post(`${API}/auth/register`, { email, password, username });
};
