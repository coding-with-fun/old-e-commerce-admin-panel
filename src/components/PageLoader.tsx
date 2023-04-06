import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const PageLoader = (): JSX.Element => {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                width: '100vw',
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
            }}
        >
            <CircularProgress />
        </Box>
    );
};

export default PageLoader;
