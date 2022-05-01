import { IPredictionResponse, IRecommendationResponse, IRecommendRequest } from "../interfaces"
import { authClient } from "./axiosClient"

export const serviceApi = {
    recommend: async(data: IRecommendRequest): Promise<IRecommendationResponse> => {
        return authClient.post('/recommend', data).then(res => res.data);
    },
    predict: async(data: {courses: string[]}): Promise<IPredictionResponse> => {
        return authClient.post('/predict', data).then(res => res.data);
    }
}