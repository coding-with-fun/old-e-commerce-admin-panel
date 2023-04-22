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
            details: '/admin/:adminID',
            create: '/admin/create',
        },
    },
    common: {
        verifyEmail: '/verify-email',
    },
};

export default routes;
