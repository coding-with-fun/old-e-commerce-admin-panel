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
            }&sortBy=${field}&query=${query}`
    );
};
