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
        updateEmail: '/admin/profile/update/email',
        updateContactNumber: '/admin/profile/update/contact-number',
        verifyContactNumber: '/admin/profile/update/verify-contact-number',
    },
    common: {
        verifyEmail: '/verify-email',
    },
};

export default endpoints;
