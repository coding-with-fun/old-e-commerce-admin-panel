import Box from '@mui/material/Box';
import ForgotPasswordForm from './ForgotPasswordForm';
import { useState } from 'react';
import SuccessScreen from './SuccessScreen';

const ForgotPassword = (): JSX.Element => {
    const [emailSent, setEmailSent] = useState(false);

    return (
        <Box
            sx={{
                display: 'flex',
                flexFlow: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
            }}
        >
            {emailSent ? (
                <SuccessScreen />
            ) : (
                <ForgotPasswordForm setEmailSent={setEmailSent} />
            )}
        </Box>
    );
};

export default ForgotPassword;
