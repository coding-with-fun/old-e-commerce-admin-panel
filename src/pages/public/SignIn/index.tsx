import Button from '@mui/material/Button';
import React from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import PasswordInput from '../../../components/PasswordInput';
import { useFormik } from 'formik';
import schema from './formValidator';
import { toFormikValidationSchema } from 'zod-formik-adapter';

const SignIn = (): JSX.Element => {
    const formik = useFormik({
        initialValues: {
            id: '',
            password: '',
        },
        validationSchema: toFormikValidationSchema(schema),
        onSubmit: (values) => {
            console.log(JSON.stringify(values, null, 2));
        },
    });

    console.log(formik.errors);

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
                onSubmit={formik.handleSubmit}
            >
                <TextField
                    id="id"
                    label="Email / Contact number"
                    variant="outlined"
                    margin="dense"
                    value={formik.values.id}
                    onChange={formik.handleChange}
                    fullWidth={true}
                    error={
                        formik.touched.id === true && Boolean(formik.errors.id)
                    }
                    helperText={formik.touched.id === true && formik.errors.id}
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
