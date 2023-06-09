import { type AxiosResponse } from 'axios';
import axiosInstance from '../libs/interceptor';
import endpoints from '../constants/apiEndpoints';

export const FetchAdminListAPI = async (
    page: number,
    pageSize: number,
    field: string,
    sort: string | null | undefined,
    query: string
): Promise<AxiosResponse<any, any>> => {
    return await axiosInstance.get(
        endpoints.admin.list +
            `?page=${page}&perPage=${pageSize}&sortType=${
                sort ?? 'desc'
            }&sortBy=${field}&query=${encodeURIComponent(query)}`
    );
};

export const GetAdminDetailsAPI = async (
    adminId: string
): Promise<AxiosResponse<any, any>> => {
    return await axiosInstance.get(endpoints.admin.details + adminId);
};

export const ToggleAdminActivationAPI = async (body: {
    adminId: string;
}): Promise<AxiosResponse<any, any>> => {
    return await axiosInstance.post(endpoints.admin.toggleActivation, body);
};

export const CreateAdminAPI = async (body: {
    name: string;
    contactNumber: string;
    email: string;
    password: string;
    profilePictureId: string | null | undefined;
}): Promise<AxiosResponse<any, any>> => {
    return await axiosInstance.post(endpoints.admin.create, body);
};

export const DeleteAdminAPI = async (body: {
    adminId: string;
}): Promise<AxiosResponse<any, any>> => {
    return await axiosInstance.post(endpoints.admin.delete, body);
};
