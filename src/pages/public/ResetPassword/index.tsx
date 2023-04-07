import Box from '@mui/material/Box';
import { useSearchParams } from 'react-router-dom';
import MessageScreen from './MessageScreen';
import { useState } from 'react';
import ResetPasswordForm from './ResetPasswordForm';

const ResetPassword = (): JSX.Element => {
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');

    const [passwordUpdated, setPasswordUpdated] = useState(false);

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
            {passwordUpdated ? (
                <MessageScreen />
            ) : token == null || token === '' ? (
                <MessageScreen message="Token not found." />
            ) : (
                <ResetPasswordForm
                    setPasswordUpdated={setPasswordUpdated}
                    token={token}
                />
            )}
        </Box>
    );
};

export default ResetPassword;
