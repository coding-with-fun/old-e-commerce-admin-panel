import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const NoRowsOverlay = (): JSX.Element => {
    return (
        <Box
            sx={{
                width: '100%',
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'rgba(255, 255, 255, 0.38)',
            }}
        >
            <Typography component="p" variant="body1">
                No data found.
            </Typography>
        </Box>
    );
};

export default NoRowsOverlay;
