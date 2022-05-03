import axios, { AxiosRequestConfig } from 'axios';
import { LOCAL_STORAGE } from '../constants';

const API_ENDPOINT = process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : 'https://scoreu-backend.herokuapp.com'

export const axiosClient = axios.create({
  baseURL: API_ENDPOINT,
  headers: {
    'content-type': 'application/json',
  },
});

export const authClient = axios.create({
  baseURL: API_ENDPOINT,
  headers: {
    'content-type': 'application/json',
  },
});

authClient.interceptors.request.use((config: AxiosRequestConfig<any>) => {
  const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);

  if (!!token && !!config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config
});

authClient.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response?.status === 401) {
      localStorage.setItem(LOCAL_STORAGE.TOKEN, '');
      localStorage.setItem(LOCAL_STORAGE.USER, '');
    }
    return Promise.reject(error);
  }
);
