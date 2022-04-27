import { ILogin } from "../interfaces";
import { authClient, axiosClient } from "./axiosClient";

export const userApi = {
    login: async (data: ILogin) => {
       return axiosClient.post('/login', data).then(res => res.data);
    },

    logout: async () => {
        return axiosClient.post('/logout').then(res => res.data)
    },

    getStudent: async() => {
        return authClient.get('/student').then(res => res.data)
    }
}