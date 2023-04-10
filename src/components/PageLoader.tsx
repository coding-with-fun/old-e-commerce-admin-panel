import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const PageLoader = (): JSX.Element => {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                margin: 'auto',
            }}
        >
            <CircularProgress />
        </Box>
    );
};

export default PageLoader;
