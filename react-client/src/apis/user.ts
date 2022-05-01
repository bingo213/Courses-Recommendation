import { ILogin, IUpdateRequest } from '../interfaces';
import { authClient, axiosClient } from './axiosClient';

export const userApi = {
  login: async (data: ILogin) => {
    return axiosClient.post('/login', data).then(res => res.data);
  },

  logout: async () => {
    return axiosClient.post('/logout').then(res => res.data);
  },

  changePassword: async (data: { password: string }) => {
    return authClient.patch('/password', data).then(res => res.data);
  },

  getProfile: async () => {
    return authClient.get('/profile').then(res => res.data);
  },

  updateProfile: async (data: IUpdateRequest) => {
    return authClient.patch('/profile', data).then(res => res.data);
  }, 
};
