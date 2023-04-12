const endpoints = {
    auth: {
        signin: '/admin/auth/signin',
        verifySignInOtp: '/admin/auth/verify-signin-otp',
        forgotPassword: '/admin/auth/forgot-password',
        resetPassword: '/reset-password',
    },
    profile: {
        details: '/admin/profile',
        update: '/admin/profile/update',
    },
};

export default endpoints;
