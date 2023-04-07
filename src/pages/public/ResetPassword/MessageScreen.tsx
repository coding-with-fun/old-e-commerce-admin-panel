import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MessageScreen = (props: PropTypes): JSX.Element => {
    const { message } = props;
    const navigate = useNavigate();

    const [timeLeft, setTimeLeft] = useState(5);

    useEffect(() => {
        if (timeLeft < 1) {
            setTimeLeft(0);
            navigate('/signin', {
                replace: true,
            });
            return;
        }

        const intervalId = setInterval(() => {
            setTimeLeft(timeLeft - 1);
        }, 1000);

        return () => {
            clearInterval(intervalId);
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [timeLeft]);

    return (
        <Box
            sx={{
                textAlign: 'center',
            }}
        >
            <Box>
                <Typography variant="body1" component="p">
                    {message ?? 'Your password has been updated successfully.'}
                </Typography>
            </Box>

            <Box>
                <Typography
                    variant="body2"
                    component="p"
                    sx={{
                        mt: 5,
                        mb: 2,
                    }}
                >
                    Redirecting you to sign in page in {timeLeft} seconds.
                </Typography>
            </Box>

            <Button
                color="primary"
                variant="contained"
                type="submit"
                onClick={() => {
                    navigate('/signin', {
                        replace: true,
                    });
                }}
                disabled={timeLeft < 1}
            >
                {timeLeft < 1 ? 'Redirecting' : 'Redirect now'}
            </Button>
        </Box>
    );
};

export default MessageScreen;

interface PropTypes {
    message?: string;
}
