import axios from 'axios';
import { LOCAL_STORAGE } from '../constants';

export const axiosClient = axios.create({
  baseURL: 'http://127.0.0.1:5000/',
  headers: {
    'content-type': 'application/json',
  },
});

export const authClient = axios.create({
  baseURL: 'http://127.0.0.1:5000/',
  headers: {
    'content-type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem(LOCAL_STORAGE.TOKEN)}`,
  },
});
