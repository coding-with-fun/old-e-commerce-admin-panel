import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import { useMutation } from '@tanstack/react-query';
import { useFormik } from 'formik';
import _ from 'lodash';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { CreateAdminAPI } from '../../../../apis/admin';
import { useAppDispatch } from '../../../../hooks/redux';
import toast from '../../../../libs/toast';
import { refetchAdminList } from '../../../../redux/slice/global.slice';
import routes from '../../../../router/routes';
import Avatar from './Avatar';
import schema from './formValidator';

const DetailsForm = (): JSX.Element => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    // New profile picture selected
    const [newAvatar, setNewAvatar] = useState({
        _id: '',
        url: '',
    });

    const { mutate, isLoading } = useMutation({
        mutationFn: CreateAdminAPI,
    });

    // Initial values for the form
    const initialValues: InitialFormikDataInterface = {
        name: '',
        email: '',
        contactNumber: '',
        password: '',
    };

    const formik = useFormik({
        initialValues,
        validationSchema: toFormikValidationSchema(schema),
        onSubmit: async (values) => {
            console.log({
                ...values,
                newAvatar,
            });
            mutate(
                {
                    ...values,
                    profilePictureId: newAvatar._id,
                },
                {
                    onError: (error) => {
                        toast(_.get(error, 'message', ''));
                    },
                    onSuccess: (data) => {
                        toast(_.get(data, 'message', ''), 'success');
                        dispatch(refetchAdminList(true));
                        navigate(routes.private.admin.list);
                    },
                }
            );
        },
    });

    return (
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
                    <Avatar newAvatar={newAvatar} setNewAvatar={setNewAvatar} />

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
                                formik.touched.email === true &&
                                formik.errors.email
                            }
                        />

                        <TextField
                            fullWidth
                            id="contactNumber"
                            label="Contact number"
                            variant="outlined"
                            margin="dense"
                            value={formik.values.contactNumber}
                            onChange={formik.handleChange}
                            error={
                                formik.touched.contactNumber === true &&
                                Boolean(formik.errors.contactNumber)
                            }
                            helperText={
                                formik.touched.contactNumber === true &&
                                formik.errors.contactNumber
                            }
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        +91
                                    </InputAdornment>
                                ),
                            }}
                        />

                        <TextField
                            fullWidth
                            type="password"
                            id="password"
                            label="Password"
                            variant="outlined"
                            margin="dense"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            error={
                                formik.touched.password === true &&
                                Boolean(formik.errors.password)
                            }
                            helperText={
                                formik.touched.password === true &&
                                formik.errors.password
                            }
                        />

                        <Button
                            fullWidth
                            color="primary"
                            variant="contained"
                            type="submit"
                            disabled={isLoading}
                            sx={{
                                mt: 3,
                            }}
                        >
                            Create
                        </Button>

                        <Button
                            fullWidth
                            color="primary"
                            variant="outlined"
                            disabled={isLoading}
                            onClick={() => {
                                formik.resetForm();
                                setNewAvatar({
                                    _id: '',
                                    url: '',
                                });
                            }}
                            sx={{
                                mt: 3,
                            }}
                        >
                            Clear
                        </Button>
                    </Box>
                </Box>
            </Paper>
        </Box>
    );
};

export default DetailsForm;

interface InitialFormikDataInterface {
    name: string;
    email: string;
    contactNumber: string;
    password: string;
}
