import { type AxiosResponse } from 'axios';
import endpoints from '../constants/apiEndpoints';
import axiosInstance from '../libs/interceptor';
import { type SignInFormSchemaType } from '../pages/public/SignIn/formValidator';

export const SignInAPI = async (
    body: SignInFormSchemaType
): Promise<AxiosResponse<any, any>> => {
    return await axiosInstance.post(endpoints.auth.signin, body);
};

export const VerifySignInOtpAPI = async (body: {
    otp: string;
    email: string;
}): Promise<AxiosResponse<any, any>> => {
    return await axiosInstance.post(endpoints.auth.verifySignInOtp, body);
};

export const ForgotPasswordAPI = async (body: {
    email: string;
}): Promise<AxiosResponse<any, any>> => {
    return await axiosInstance.post(endpoints.auth.forgotPassword, body);
};

export const ResetPasswordAPI = async (body: {
    password: string;
    token: string;
}): Promise<AxiosResponse<any, any>> => {
    return await axiosInstance.post(endpoints.auth.resetPassword, body);
};
