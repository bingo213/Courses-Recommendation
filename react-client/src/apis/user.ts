import { ILogin } from "../interfaces";
import { axiosClient } from "./axiosClient";

export const userApi = {
    login: async (data: ILogin) => {
       return axiosClient.post('/login', data).then(res => res.data);
    },

    logout: async () => {
        return axiosClient.post('/logout').then(res => res.data)
    },
}