import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import Layout from '../components/Layout';
import lazyLoad from '../libs/lazyLoad';
import ProtectedRoute from './ProtectedRoute';
import PublicRoute from './PublicRoute';
import CommonLayout from '../components/CommonLayout';

// Lazy loaded pages
// Public pages
const SignIn = React.lazy(async () => await import('../pages/public/SignIn'));
const ForgotPassword = React.lazy(
    async () => await import('../pages/public/ForgotPassword')
);
const ResetPassword = React.lazy(
    async () => await import('../pages/public/ResetPassword')
);

// Private pages
const Dashboard = React.lazy(
    async () => await import('../pages/private/Dashboard')
);
const Profile = React.lazy(
    async () => await import('../pages/private/Profile')
);

// Common pages
const VerifyEmail = React.lazy(
    async () => await import('../pages/common/VerifyEmail')
);

const router = createBrowserRouter([
    // Common routes
    {
        element: <CommonLayout />,
        children: [
            {
                path: '/verify-email',
                element: (
                    <ProtectedRoute>{lazyLoad(VerifyEmail)}</ProtectedRoute>
                ),
            },
        ],
    },
    {
        element: <Layout />,
        children: [
            // Public routes
            {
                path: '/signin',
                element: <PublicRoute>{lazyLoad(SignIn)}</PublicRoute>,
            },
            {
                path: '/forgot-password',
                element: <PublicRoute>{lazyLoad(ForgotPassword)}</PublicRoute>,
            },
            {
                path: '/reset-password',
                element: <PublicRoute>{lazyLoad(ResetPassword)}</PublicRoute>,
            },

            // Private routes
            {
                path: '/dashboard',
                element: <ProtectedRoute>{lazyLoad(Dashboard)}</ProtectedRoute>,
            },
            {
                path: '/profile',
                element: <ProtectedRoute>{lazyLoad(Profile)}</ProtectedRoute>,
            },

            // Wildcard
            {
                path: '*',
                element: <Navigate to="/dashboard" replace={true} />,
            },
        ],
    },
]);

export default router;
