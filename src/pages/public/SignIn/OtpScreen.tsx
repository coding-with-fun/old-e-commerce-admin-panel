import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useMutation } from '@tanstack/react-query';
import _ from 'lodash';
import { Fragment, useContext, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { VerifySignInOtpAPI } from '../../../apis/auth';
import OtpInput from '../../../components/OtpInput';
import PageLoader from '../../../components/PageLoader';
import { useAppDispatch } from '../../../hooks/redux';
import toast from '../../../libs/toast';
import { setUserDetails } from '../../../redux/slice/user.slice';
import routes from '../../../router/routes';
import { SocketContext } from '../../../context/socket';

const OtpScreen = (props: PropTypes): JSX.Element => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [params] = useSearchParams();

    const socket = useContext(SocketContext);

    const otpLength = 4;
    const initialOtp: string[] = [];
    for (let x = 0; x < otpLength; x++) {
        initialOtp.push('');
    }
    const [otp, setOtp] = useState(initialOtp);

    const [redirectionUrl, setRedirectionUrl] = useState(
        routes.private.dashboard
    );

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
                    socket.emit('new_user_signin', data);
                    navigate(redirectionUrl, {
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

    useEffect(() => {
        const redirectionUrl = params.get('redirect');
        if (redirectionUrl !== null && redirectionUrl !== '') {
            setRedirectionUrl(redirectionUrl);
        }

        return () => {};
    }, [params]);

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
