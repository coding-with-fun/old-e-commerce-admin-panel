import Box from '@mui/material/Box';
import { useState } from 'react';
import OtpScreen from './OtpScreen';
import SignInForm from './SignInForm';

const SignIn = (): JSX.Element => {
    const [enterOtp, setEnterOtp] = useState(false);
    const [email, setEmail] = useState('');

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
            {enterOtp ? (
                <OtpScreen email={email} />
            ) : (
                <SignInForm setEmail={setEmail} setEnterOtp={setEnterOtp} />
            )}
        </Box>
    );
};

export default SignIn;
