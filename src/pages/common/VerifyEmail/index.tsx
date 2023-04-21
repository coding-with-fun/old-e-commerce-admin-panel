import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { VerifyEmailAPI } from '../../../apis/common';
import PageLoader from '../../../components/PageLoader';
import ErrorImage from '../../../assets/error.png';
import EmailVerified from '../../../assets/emailVerified.png';

const VerifyEmail = (): JSX.Element => {
    const [params] = useSearchParams();

    const [emailToken, setEmailToken] = useState<string | null>('');

    const { mutate, isLoading } = useMutation({
        mutationFn: VerifyEmailAPI,
    });

    const handleVerifyEmail = (token: string): void => {
        mutate(
            {
                token,
            },
            {
                onError: () => {
                    setEmailToken(null);
                },
            }
        );
    };

    useEffect(() => {
        const token = params.get('token');
        setEmailToken(token);
        if (token !== '' && token !== null) handleVerifyEmail(token);

        return () => {};

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params]);

    return emailToken === '' || isLoading ? (
        <PageLoader />
    ) : emailToken === null ? (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexFlow: 'column',
                flex: 1,
                gap: '1rem',
            }}
        >
            <Box
                sx={{
                    height: '8rem',
                    display: 'flex',
                    justifyContent: 'center',
                }}
            >
                <img
                    src={ErrorImage}
                    alt="Error"
                    style={{
                        height: '100%',
                    }}
                />
            </Box>

            <Typography component="p" variant="h5">
                The email token is invalid.
            </Typography>
        </Box>
    ) : (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexFlow: 'column',
                flex: 1,
                gap: '1rem',
            }}
        >
            <Box
                sx={{
                    height: '8rem',
                    display: 'flex',
                    justifyContent: 'center',
                }}
            >
                <img
                    src={EmailVerified}
                    alt="Email verified"
                    style={{
                        height: '100%',
                    }}
                />
            </Box>

            <Typography component="p" variant="h5">
                Your email address has been verified.
            </Typography>
        </Box>
    );
};

export default VerifyEmail;
