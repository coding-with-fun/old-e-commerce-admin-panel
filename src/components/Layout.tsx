import { Box } from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router-dom';

const Layout = (): JSX.Element => {
    return (
        <Box
            sx={{
                display: 'flex',
            }}
        >
            <div className="content">
                <Outlet />
            </div>
        </Box>
    );
};

export default Layout;
