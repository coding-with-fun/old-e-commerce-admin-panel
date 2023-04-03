import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useFormik } from 'formik';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import PasswordInput from '../../../components/PasswordInput';
import schema from './formValidator';

const SignIn = (): JSX.Element => {
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: toFormikValidationSchema(schema),
        onSubmit: (values) => {
            console.log(JSON.stringify(values, null, 2));
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
            <Box>
                <Typography variant="h3" gutterBottom>
                    Sign In
                </Typography>
            </Box>

            <Box
                component="form"
                noValidate
                autoComplete="off"
                sx={{
                    width: '450px',
                }}
                onSubmit={formik.handleSubmit}
            >
                <TextField
                    id="email"
                    label="Email"
                    variant="outlined"
                    margin="dense"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    fullWidth={true}
                    error={
                        formik.touched.email === true &&
                        Boolean(formik.errors.email)
                    }
                    helperText={
                        formik.touched.email === true && formik.errors.email
                    }
                />
                <PasswordInput
                    id="password"
                    label="Password"
                    margin="dense"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    fullWidth={true}
                    inputerror={{
                        error: formik.touched.password,
                        helperText: formik.errors.password,
                    }}
                />
                <Button
                    color="primary"
                    variant="contained"
                    fullWidth
                    type="submit"
                >
                    Submit
                </Button>
            </Box>
        </Box>
    );
};

export default SignIn;
