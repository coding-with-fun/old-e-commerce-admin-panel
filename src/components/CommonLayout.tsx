import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';

const CommonLayout = (): JSX.Element => {
    return (
        <Box
            sx={{
                display: 'flex',
            }}
        >
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        minHeight: 'calc(100vh - 48px)',
                    }}
                >
                    <Outlet />
                </Box>
            </Box>
        </Box>
    );
};

export default CommonLayout;
