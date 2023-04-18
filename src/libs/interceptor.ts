import axios from 'axios';
import _ from 'lodash';
import env from '../env';
import {
    getUserToken,
    removeUserToken,
    setUserToken,
} from '../utils/manageUserToken';

export const baseURL = env.app.backend_url + env.app.api_prefix;

const axiosInstance = axios.create({
    baseURL,
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
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
axiosInstance.interceptors.response.use(
    function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data

        if (_.get(response, 'data.success') === false) {
            return Promise.reject(response.data);
        }

        const token = _.get(response, 'data.token');
        if (token != null && token !== '') {
            setUserToken(token);
        }

        return response.data;
    },
    async function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response

        if (error.response.status === 401) {
            removeUserToken();
            window.location.replace('/signin');
        }

        return await Promise.reject(error.response.data);
    }
);

export default axiosInstance;
