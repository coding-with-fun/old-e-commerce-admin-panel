import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import PageLoader from '../../../components/PageLoader';
import { useAppSelector } from '../../../hooks/redux';
import Avatar from './Avatar';
import schema from './formValidator';

const DetailsForm = (): JSX.Element => {
    const userDetails = useAppSelector((state) => state.user.userDetails);

    const initialValues: InitialFormikDataInterface = {
        name: '',
        email: '',
        contactNumber: '',
    };
    const [initialFormikData, setInitialFormikData] =
        useState<InitialFormikDataInterface>(initialValues);

    useEffect(() => {
        setInitialFormikData({
            contactNumber: _.get(userDetails, 'contactNumber', ''),
            email: _.get(userDetails, 'email', ''),
            name: _.get(userDetails, 'name', ''),
        });
    }, [userDetails]);

    const formik = useFormik({
        initialValues: initialFormikData,
        enableReinitialize: true,
        validationSchema: toFormikValidationSchema(schema),
        onSubmit: async (values) => {
            console.log(values);
        },
    });

    return userDetails != null ? (
        <Box
            sx={{
                width: '450px',
            }}
        >
            <Paper
                elevation={2}
                sx={{
                    py: 5,
                    px: 4,
                }}
            >
                <Box>
                    <Avatar user={userDetails} />

                    <Box
                        noValidate
                        component="form"
                        autoComplete="off"
                        onSubmit={formik.handleSubmit}
                    >
                        <TextField
                            fullWidth
                            id="name"
                            label="Name"
                            variant="outlined"
                            margin="dense"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            error={
                                formik.touched.name === true &&
                                Boolean(formik.errors.name)
                            }
                            helperText={
                                formik.touched.name === true &&
                                formik.errors.name
                            }
                        />

                        <TextField
                            fullWidth
                            disabled
                            id="email"
                            label="Email"
                            variant="outlined"
                            margin="dense"
                            value={formik.values.email}
                            InputProps={{
                                endAdornment: (
                                    <Button
                                        sx={{
                                            ml: 2,
                                        }}
                                    >
                                        Update
                                    </Button>
                                ),
                            }}
                        />

                        <TextField
                            fullWidth
                            disabled
                            id="contactNumber"
                            label="Contact number"
                            variant="outlined"
                            margin="dense"
                            value={formik.values.contactNumber}
                            InputProps={{
                                endAdornment: (
                                    <Button
                                        sx={{
                                            ml: 2,
                                        }}
                                    >
                                        Update
                                    </Button>
                                ),
                            }}
                        />

                        <Button
                            fullWidth
                            color="primary"
                            variant="contained"
                            type="submit"
                            sx={{
                                mt: 3,
                            }}
                        >
                            Save
                        </Button>
                    </Box>
                </Box>
            </Paper>
        </Box>
    ) : (
        <PageLoader />
    );
};

export default DetailsForm;

interface InitialFormikDataInterface {
    name: string;
    email: string;
    contactNumber: string;
}
