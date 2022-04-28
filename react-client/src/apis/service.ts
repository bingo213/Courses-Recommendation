import { IRecommendRequest } from "../interfaces"
import { authClient } from "./axiosClient"

export const serviceApi = {
    recommend: async(data: IRecommendRequest) => {
        return authClient.post('/recommend', data).then(res => res.data);
    }
}