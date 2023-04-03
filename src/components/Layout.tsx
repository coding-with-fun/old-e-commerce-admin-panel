import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';

const Layout = (): JSX.Element => {
    return (
        <Box
            sx={{
                display: 'flex',
                minHeight: '100vh',
            }}
        >
            <Outlet />
        </Box>
    );
};

export default Layout;
