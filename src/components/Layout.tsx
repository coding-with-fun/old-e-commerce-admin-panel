import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const Layout = (): JSX.Element => {
    return (
        <Box>
            <Navbar />

            <Box
                sx={{
                    display: 'flex',
                    minHeight: '100vh',
                }}
            >
                <Outlet />
            </Box>
        </Box>
    );
};

export default Layout;
