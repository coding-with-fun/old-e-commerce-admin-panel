import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Fragment, useState } from 'react';
import OtpInput from '../../../components/OtpInput';

const OtpScreen = (props: PropTypes): JSX.Element => {
    const otpLength = 4;

    const initialOtp: string[] = [];
    for (let x = 0; x < otpLength; x++) {
        initialOtp.push('');
    }
    const [otp, setOtp] = useState(initialOtp);

    const handleOtpSubmit = (tempOtp: string): void => {
        console.log(tempOtp);
    };

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '15px',
            }}
        >
            {Array.from(
                {
                    length: otpLength,
                },
                (element: unknown, index: number) => {
                    return (
                        <Fragment key={index}>
                            <OtpInput
                                otp={otp}
                                setOtp={setOtp}
                                index={index}
                                handleOtpSubmit={handleOtpSubmit}
                            />

                            {otpLength - index > 1 ? (
                                <Typography>-</Typography>
                            ) : null}
                        </Fragment>
                    );
                }
            )}
        </Box>
    );
};

export default OtpScreen;

interface PropTypes {
    email: string;
}
