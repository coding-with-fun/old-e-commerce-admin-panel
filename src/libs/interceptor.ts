import axios from 'axios';
import { getUserToken } from '../utils/manageUserToken';

axios.defaults.baseURL = 'http://localhost:8000';

// Add a request interceptor
axios.interceptors.request.use(
    function (config) {
        // Do something before request is sent

        // Set user token if available in local storage
        const userToken = getUserToken();
        if (userToken != null && userToken !== '') {
            config.headers.Authorization = `Bearer ${userToken}`;
        }

        config.headers['Content-Type'] = 'application/json';
        config.headers.Accept = 'application/json';

        return config;
    },
    async function (error) {
        // Do something with request error
        return await Promise.reject(error);
    }
);

// Add a response interceptor
axios.interceptors.response.use(
    function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        console.log({
            response,
        });

        return response.data;
    },
    async function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        return await Promise.reject(error);
    }
);
