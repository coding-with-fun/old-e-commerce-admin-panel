import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useMutation } from '@tanstack/react-query';
import { useFormik } from 'formik';
import _ from 'lodash';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { ForgotPasswordAPI } from '../../../apis/auth';
import PageLoader from '../../../components/PageLoader';
import toast from '../../../libs/toast';
import schema from './formValidator';
import { Link } from 'react-router-dom';
import routes from '../../../router/routes';

const ForgotPasswordForm = (props: PropTypes): JSX.Element => {
    const { setEmailSent } = props;

    const { mutate, isLoading } = useMutation({
        mutationFn: ForgotPasswordAPI,
    });

    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema: toFormikValidationSchema(schema),
        onSubmit: async (values) => {
            mutate(values, {
                onError: (error) => {
                    toast(_.get(error, 'message', ''));
                },
                onSuccess: () => {
                    setEmailSent(true);
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
                    Forgot Password
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

export default ForgotPasswordForm;

interface PropTypes {
    setEmailSent: React.Dispatch<React.SetStateAction<boolean>>;
}
