import axios from 'axios';

const API = process.env.REACT_APP_API_URL;

export const login = (email, password) => {
  return axios.post(`${API}/auth/login`, { email, password });
};

export const register = (userData) => {
  return axios.post(`${API}/auth/register`, userData);
};

export const getProfile = (token) => {
  return axios.get(`${API}/users/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
