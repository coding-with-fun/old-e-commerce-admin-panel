import { type AxiosResponse } from 'axios';
import axiosInstance from '../libs/interceptor';
import endpoints from '../constants/apiEndpoints';

export const VerifyEmailAPI = async (body: {
    token: string;
}): Promise<AxiosResponse<any, any>> => {
    return await axiosInstance.post(endpoints.common.verifyEmail, body);
};
