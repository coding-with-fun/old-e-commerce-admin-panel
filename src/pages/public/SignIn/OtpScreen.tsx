import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useMutation } from '@tanstack/react-query';
import _ from 'lodash';
import { Fragment, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { VerifySignInOtpAPI } from '../../../apis/auth';
import OtpInput from '../../../components/OtpInput';
import PageLoader from '../../../components/PageLoader';
import toast from '../../../libs/toast';
import { useAppDispatch } from '../../../hooks/redux';
import { setUserDetails } from '../../../redux/slice/user.slice';
import routes from '../../../router/routes';

const OtpScreen = (props: PropTypes): JSX.Element => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const otpLength = 4;
    const initialOtp: string[] = [];
    for (let x = 0; x < otpLength; x++) {
        initialOtp.push('');
    }
    const [otp, setOtp] = useState(initialOtp);

    const { mutate, isLoading } = useMutation({
        mutationFn: VerifySignInOtpAPI,
    });

    const handleOtpSubmit = (tempOtp: string): void => {
        mutate(
            {
                otp: tempOtp,
                email: props.email,
            },
            {
                onError: (error) => {
                    toast(_.get(error, 'message', ''));
                },
                onSuccess: (data) => {
                    toast(_.get(data, 'message', ''), 'success');
                    dispatch(setUserDetails(_.get(data, 'admin', {})));
                    navigate(routes.private.dashboard, {
                        replace: true,
                    });
                },
                onSettled: () => {
                    setOtp(initialOtp);
                    const firstInput = document.getElementById('1');
                    if (firstInput != null) {
                        firstInput.focus();
                    }
                },
            }
        );
    };

    return isLoading ? (
        <PageLoader />
    ) : (
        <Box>
            <Box>
                <Typography
                    variant="h4"
                    sx={{
                        textAlign: 'center',
                        mb: 4,
                    }}
                    gutterBottom
                >
                    OTP
                </Typography>
            </Box>

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
        </Box>
    );
};

export default OtpScreen;

interface PropTypes {
    email: string;
}
