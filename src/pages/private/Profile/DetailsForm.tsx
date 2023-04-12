import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import PageLoader from '../../../components/PageLoader';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { setUserDetails, type IUser } from '../../../redux/slice/user.slice';
import Avatar from './Avatar';
import schema from './formValidator';
import { useMutation } from '@tanstack/react-query';
import { UpdateProfileAPI } from '../../../apis/profile';
import toast from '../../../libs/toast';

const DetailsForm = (): JSX.Element => {
    const userDetails = useAppSelector((state) => state.user.userDetails);
    const dispatch = useAppDispatch();

    // Initial values for the form
    const initialValues: InitialFormikDataInterface = {
        name: '',
        email: '',
        contactNumber: '',
    };
    const [initialFormikData, setInitialFormikData] =
        useState<InitialFormikDataInterface>(initialValues);

    // Updated user details to be submitted
    const [localUserDetails, setLocalUserDetails] = useState<IUser>();

    // New profile picture selected
    const [newAvatar, setNewAvatar] = useState({
        _id: '',
        url: '',
    });

    useEffect(() => {
        // Set values from Redux on page load
        setInitialFormikData({
            contactNumber: _.get(userDetails, 'contactNumber', ''),
            email: _.get(userDetails, 'email', ''),
            name: _.get(userDetails, 'name', ''),
        });
        setLocalUserDetails({
            ...userDetails,
        });
    }, [userDetails]);

    useEffect(() => {
        // dispatch(
        //     setUserDetails({
        //         ...userDetails,
        //         profilePictureId: newAvatar._id,
        //     })
        // );

        // Update the selected profile picture to the local user details
        setLocalUserDetails((prevData) => {
            return {
                ...prevData,
                profilePictureId: newAvatar._id,
            };
        });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [newAvatar]);

    const { mutate, isLoading } = useMutation({
        mutationFn: UpdateProfileAPI,
    });

    const formik = useFormik({
        initialValues: initialFormikData,
        enableReinitialize: true,
        validationSchema: toFormikValidationSchema(schema),
        onSubmit: async (values) => {
            const profilePictureId = _.get(
                localUserDetails,
                'profilePictureId',
                ''
            );

            console.log({
                ...values,
                profilePictureId,
            });

            mutate(
                {
                    name: values.name,
                    profilePictureId,
                },
                {
                    onError: (error) => {
                        toast(_.get(error, 'message', ''));
                    },
                    onSuccess(data, variables) {
                        console.log({
                            variables,
                            data,
                        });

                        dispatch(
                            setUserDetails({
                                ...userDetails,
                                profilePicture: _.get(
                                    data,
                                    'admin.profilePicture',
                                    ''
                                ),
                                name: _.get(data, 'admin.name', ''),
                            })
                        );
                    },
                }
            );
        },
    });

    return isLoading || localUserDetails == null ? (
        <PageLoader />
    ) : (
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
                    <Avatar
                        user={localUserDetails}
                        newAvatar={newAvatar}
                        setNewAvatar={setNewAvatar}
                    />

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
    );
};

export default DetailsForm;

interface InitialFormikDataInterface {
    name: string;
    email: string;
    contactNumber: string;
}
