import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';

const SuccessScreen = (): JSX.Element => {
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                textAlign: 'center',
            }}
        >
            <Box>
                The email has been sent to your email address successfully.
            </Box>

            <Button
                color="primary"
                variant="contained"
                type="submit"
                onClick={() => {
                    navigate('/signin');
                }}
                sx={{
                    mt: 6,
                }}
            >
                Sign In
            </Button>
        </Box>
    );
};

export default SuccessScreen;
