import { useState } from 'react';
import SignInForm from './SignInForm';
import OtpScreen from './OtpScreen';

const SignIn = (): JSX.Element => {
    const [enterOtp, setEnterOtp] = useState(false);
    const [email, setEmail] = useState('');

    return enterOtp ? (
        <OtpScreen email={email} />
    ) : (
        <SignInForm setEmail={setEmail} setEnterOtp={setEnterOtp} />
    );
};

export default SignIn;
