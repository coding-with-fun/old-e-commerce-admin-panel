import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useMutation } from '@tanstack/react-query';
import { useFormik } from 'formik';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { ResetPasswordAPI } from '../../../apis/auth';
import PageLoader from '../../../components/PageLoader';
import PasswordInput from '../../../components/PasswordInput';
import routes from '../../../router/routes';
import schema from './formValidator';

const ResetPasswordForm = (props: PropTypes): JSX.Element => {
    const { setPasswordUpdated, setErrorMessage, token } = props;

    const { mutate, isLoading } = useMutation({
        mutationFn: ResetPasswordAPI,
    });

    const formik = useFormik({
        initialValues: {
            password: '',
            confirmationPassword: '',
        },
        validationSchema: toFormikValidationSchema(schema),
        onSubmit: async (values) => {
            mutate(
                {
                    password: values.password,
                    token,
                },
                {
                    onError: (error) => {
                        setErrorMessage(_.get(error, 'message', ''));
                    },
                    onSuccess: () => {
                        setPasswordUpdated(true);
                    },
                    onSettled: () => {
                        formik.resetForm();

                        const passwordInput =
                            document.getElementById('password');
                        if (passwordInput != null) {
                            passwordInput.focus();
                        }
                    },
                }
            );
        },
    });

    return isLoading ? (
        <PageLoader />
    ) : (
        <Box
            sx={{
                width: '450px',
            }}
        >
            <Box>
                <Typography
                    variant="h4"
                    sx={{
                        textAlign: 'center',
                    }}
                    gutterBottom
                >
                    Reset Password
                </Typography>
            </Box>

            <Box
                noValidate
                component="form"
                autoComplete="off"
                onSubmit={formik.handleSubmit}
            >
                <PasswordInput
                    fullWidth
                    autoFocus
                    id="password"
                    label="Password"
                    margin="dense"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    inputerror={{
                        error: formik.touched.password,
                        helperText: formik.errors.password,
                    }}
                />

                <PasswordInput
                    fullWidth
                    id="confirmationPassword"
                    label="Confirmation Password"
                    margin="dense"
                    value={formik.values.confirmationPassword}
                    onChange={formik.handleChange}
                    inputerror={{
                        error: formik.touched.confirmationPassword,
                        helperText: formik.errors.confirmationPassword,
                    }}
                />

                <Button
                    fullWidth
                    color="primary"
                    variant="contained"
                    type="submit"
                    sx={{
                        mt: 3,
                        mb: 2,
                    }}
                >
                    Reset Password
                </Button>
            </Box>

            <Box>
                <Box
                    sx={{
                        display: 'flex',
                        gap: '4px',
                    }}
                >
                    <Typography>Remember password?</Typography>

                    <Link to={routes.public.signin}>
                        <Typography>Sign In</Typography>
                    </Link>
                </Box>
            </Box>
        </Box>
    );
};

export default ResetPasswordForm;

interface PropTypes {
    setPasswordUpdated: React.Dispatch<React.SetStateAction<boolean>>;
    setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
    token: string;
}
