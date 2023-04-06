import axios, { type AxiosResponse } from 'axios';
import endpoints from '../constants/apiEndpoints';
import { type SignInFormSchemaType } from '../pages/public/SignIn/formValidator';

export const SignInAPI = async (
    body: SignInFormSchemaType
): Promise<AxiosResponse<any, any>> => {
    return await axios.post(endpoints.auth.signin, body);
};

export const VerifySignInOtpAPI = async (body: {
    otp: string;
    email: string;
}): Promise<AxiosResponse<any, any>> => {
    return await axios.post(endpoints.auth.verifySignInOtp, body);
};
