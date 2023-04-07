import Box from '@mui/material/Box';
import { useSearchParams } from 'react-router-dom';
import MessageScreen from './MessageScreen';
import { useEffect, useState } from 'react';
import ResetPasswordForm from './ResetPasswordForm';

const ResetPassword = (): JSX.Element => {
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');

    const [passwordUpdated, setPasswordUpdated] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if (token == null || token === '') {
            setErrorMessage('Token not found');
        }
    }, [token]);

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
            ) : errorMessage !== '' || token == null || token === '' ? (
                <MessageScreen message={errorMessage ?? 'Token not found.'} />
            ) : (
                <ResetPasswordForm
                    setPasswordUpdated={setPasswordUpdated}
                    setErrorMessage={setErrorMessage}
                    token={token}
                />
            )}
        </Box>
    );
};

export default ResetPassword;
