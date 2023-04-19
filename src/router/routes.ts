const routes = {
    public: {
        signin: '/signin',
        signup: '/signup',
        forgotPassword: '/forgot-password',
        resetPassword: '/reset-password',
    },
    private: {
        dashboard: '/dashboard',
        profile: '/profile',
        admin: {
            list: '/admin',
        },
    },
    common: {
        verifyEmail: '/verify-email',
    },
};

export default routes;
