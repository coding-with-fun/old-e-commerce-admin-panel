import { type AxiosResponse } from 'axios';
import endpoints from '../constants/apiEndpoints';
import axiosInstance from '../libs/interceptor';

export const GetProfileAPI = async (): Promise<AxiosResponse<any, any>> => {
    return await axiosInstance.get(endpoints.profile.details);
};

export const UpdateProfileAPI = async (body: {
    name: string;
    profilePictureId?: string;
}): Promise<AxiosResponse<any, any>> => {
    return await axiosInstance.post(endpoints.profile.update, body);
};

export const UpdateEmailAPI = async (body: {
    email: string;
}): Promise<AxiosResponse<any, any>> => {
    return await axiosInstance.post(endpoints.profile.updateEmail, body);
};

export const UpdateContactNumberAPI = async (body: {
    contactNumber: string;
}): Promise<AxiosResponse<any, any>> => {
    return await axiosInstance.post(
        endpoints.profile.updateContactNumber,
        body
    );
};

export const VerifyContactNumberAPI = async (body: {
    contactNumber: string;
    otp: string;
}): Promise<AxiosResponse<any, any>> => {
    return await axiosInstance.post(
        endpoints.profile.verifyContactNumber,
        body
    );
};
