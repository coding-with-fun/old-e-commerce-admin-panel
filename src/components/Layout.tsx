import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import { DrawerHeader } from './Navbar/Sidebar';

const Layout = (): JSX.Element => {
    return (
        <Box
            sx={{
                display: 'flex',
            }}
        >
            <Navbar />

            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                }}
            >
                <DrawerHeader />

                <Box
                    sx={{
                        display: 'flex',
                        minHeight: 'calc(100vh - 7rem)',
                    }}
                >
                    <Outlet />
                </Box>
            </Box>
        </Box>
    );
};

export default Layout;
