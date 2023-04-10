import { type AxiosResponse } from 'axios';
import endpoints from '../constants/apiEndpoints';
import axiosInstance from '../libs/interceptor';

export const GetProfileAPI = async (): Promise<AxiosResponse<any, any>> => {
    return await axiosInstance.get(endpoints.profile.details);
};
