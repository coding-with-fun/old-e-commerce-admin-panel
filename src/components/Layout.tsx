import { Box } from '@mui/material';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import { DrawerHeader } from './Navbar/Sidebar';

const Layout = (): JSX.Element => {
    const [openSideBar, setOpenSideBar] = useState(false);

    return (
        <Box
            sx={{
                display: 'flex',
            }}
        >
            <Navbar openSideBar={openSideBar} setOpenSideBar={setOpenSideBar} />

            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    width: openSideBar
                        ? 'calc(100vw - 288px)'
                        : 'calc(100vw - 113px)',
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
