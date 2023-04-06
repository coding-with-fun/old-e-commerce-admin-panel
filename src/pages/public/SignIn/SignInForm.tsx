import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useMutation } from '@tanstack/react-query';
import { useFormik } from 'formik';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { SignInAPI } from '../../../apis/auth';
import PasswordInput from '../../../components/PasswordInput';
import toast from '../../../libs/toast';
import routes from '../../../router/routes';
import schema from './formValidator';
import PageLoader from '../../../components/PageLoader';

const SignInForm = (props: PropTypes): JSX.Element => {
    const { setEmail, setEnterOtp } = props;

    const { mutate, isLoading } = useMutation({
        mutationFn: SignInAPI,
    });

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: toFormikValidationSchema(schema),
        onSubmit: async (values) => {
            mutate(values, {
                onError: (error) => {
                    toast(_.get(error, 'message', ''));
                },
                onSuccess: (data, variables, context) => {
                    toast(_.get(data, 'message', ''), 'success');
                    setEmail(variables.email);
                    setEnterOtp(true);
                },
                onSettled: () => {
                    formik.resetForm();

                    const emailInput = document.getElementById('email');
                    if (emailInput != null) {
                        emailInput.focus();
                    }
                },
            });
        },
    });

    return isLoading === true ? (
        <PageLoader />
    ) : (
        <Box
            sx={{
                width: '450px',
            }}
        >
            <Box>
                <Typography
                    variant="h3"
                    sx={{
                        textAlign: 'center',
                    }}
                    gutterBottom
                >
                    Sign In
                </Typography>
            </Box>

            <Box
                noValidate
                component="form"
                autoComplete="off"
                onSubmit={formik.handleSubmit}
            >
                <TextField
                    fullWidth
                    autoFocus
                    id="email"
                    label="Email"
                    variant="outlined"
                    margin="dense"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={
                        formik.touched.email === true &&
                        Boolean(formik.errors.email)
                    }
                    helperText={
                        formik.touched.email === true && formik.errors.email
                    }
                />
                <PasswordInput
                    fullWidth
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
                    Sign In
                </Button>
            </Box>

            <Box>
                <Box>
                    <Link to={routes.public.forgotPassword}>
                        <Typography>Forgot password?</Typography>
                    </Link>
                </Box>

                <Box
                    sx={{
                        display: 'flex',
                        gap: '4px',
                    }}
                >
                    <Typography>Do not have an account?</Typography>
                    <Link to={routes.public.signup}>
                        <Typography>Sign Up</Typography>
                    </Link>
                </Box>
            </Box>
        </Box>
    );
};

export default SignInForm;

interface PropTypes {
    setEmail: React.Dispatch<React.SetStateAction<string>>;
    setEnterOtp: React.Dispatch<React.SetStateAction<boolean>>;
}
