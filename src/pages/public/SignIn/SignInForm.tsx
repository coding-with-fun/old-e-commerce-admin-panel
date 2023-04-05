import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useFormik } from 'formik';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import PasswordInput from '../../../components/PasswordInput';
import schema from './formValidator';
import { Link } from 'react-router-dom';
import routes from '../../../router/routes';

const SignInForm = (props: PropTypes): JSX.Element => {
    const { setEmail, setEnterOtp } = props;

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: toFormikValidationSchema(schema),
        onSubmit: (values) => {
            console.log(JSON.stringify(values, null, 2));
            setEmail(values.email);
            setEnterOtp(true);
        },
    });

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
        </Box>
    );
};

export default SignInForm;

interface PropTypes {
    setEmail: React.Dispatch<React.SetStateAction<string>>;
    setEnterOtp: React.Dispatch<React.SetStateAction<boolean>>;
}
