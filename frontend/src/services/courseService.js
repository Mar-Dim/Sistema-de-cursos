import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return { headers: { Authorization: `Bearer ${token}` } };
};

export const getLearningPath = async () => {
  return axios.get(`${API_URL}/lessons/path`, getAuthHeader());
};

export const getLessonDetails = async (lessonId) => {
  return axios.get(`${API_URL}/lessons/${lessonId}`, getAuthHeader());
};

export const submitProgress = async (progressData) => {
  return axios.post(`${API_URL}/progress`, progressData, getAuthHeader());
};