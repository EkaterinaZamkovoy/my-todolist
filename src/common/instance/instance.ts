//nstance - (объект-экземпляр) axios

import axios from 'axios';

export const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    'API-KEY': process.env.REACT_APP_API_KEY,
  },
  withCredentials: true,
});

instance.interceptors.request.use(function (config) {
  config.headers['Authorization'] = `Bearer ${localStorage.getItem(
    'sn-token'
  )}`;
  console.log('Request:', config);
  return config;
});
