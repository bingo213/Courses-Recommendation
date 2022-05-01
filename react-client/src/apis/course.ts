import { ICourseResponse } from '../interfaces';
import { axiosClient } from './axiosClient';

export const courseApi = {
  getAll: async (): Promise<ICourseResponse> => {
    return axiosClient.get('/courses').then(res => res.data);
  },
};
