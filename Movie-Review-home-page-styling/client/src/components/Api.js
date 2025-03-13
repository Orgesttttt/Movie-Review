import axios from 'axios';
const API_URL = 'http://localhost:8000/api';

export const getMovie = () => axios.get(`${API_URL}/movie`);
export const addUser = (user) => axios.post(`${API_URL}/user`, user);
export const deleteMovie = (id) => axios.delete(`${API_URL}/movie/${id}`);
export const updateMovie = (id) => axios.put(`${API_URL}/movie/${id}`);