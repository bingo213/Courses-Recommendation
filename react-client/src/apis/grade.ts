import { IGradeResponse } from '../interfaces';
import { authClient } from './axiosClient';

export const gradeApi = {
  getAll: async (): Promise<IGradeResponse> => {
    return authClient.get('/grade').then(res => res.data);
  },
};
