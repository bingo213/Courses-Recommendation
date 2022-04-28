import { IOrientationResponse } from '../interfaces';
import { axiosClient } from './axiosClient';

export const orientationApi = {
  getAll: async (): Promise<IOrientationResponse> => {
    return axiosClient.get('/orientations').then(res => res.data);
  },
};
