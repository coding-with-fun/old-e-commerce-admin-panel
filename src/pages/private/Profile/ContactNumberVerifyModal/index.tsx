import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useMutation } from '@tanstack/react-query';
import { useFormik } from 'formik';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { VerifyContactNumberAPI } from '../../../../apis/profile';
import ContactNumberUpdatedModalImage from '../../../../assets/contactNumberUpdatedModalImage.png';
import PageLoader from '../../../../components/PageLoader';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import toast from '../../../../libs/toast';
import { setUserDetails } from '../../../../redux/slice/user.slice';
import schema from './formValidator';

const ContactNumberVerifyModal = (props: IProps): JSX.Element => {
    const {
        setContactNumberUpdateModalType,
        newContactNumber,
        handleCloseContactNumberUpdateModal,
    } = props;

    const userDetails = useAppSelector((state) => state.user.userDetails);
    const dispatch = useAppDispatch();

    const [
        contactNumberUpdatedSuccessMessage,
        setContactNumberUpdatedSuccessMessage,
    ] = useState('');

    const { mutate, isLoading } = useMutation({
        mutationFn: VerifyContactNumberAPI,
    });

    const formik = useFormik({
        initialValues: {
            contact_number_modal: newContactNumber,
            otp_contact_number_modal: '',
        },
        validationSchema: toFormikValidationSchema(schema),
        onSubmit: async (values) => {
            console.log(values);
            mutate(
                {
                    contactNumber: '+91' + values.contact_number_modal,
                    otp: values.otp_contact_number_modal,
                },
                {
                    onError: (error) => {
                        toast(_.get(error, 'message', ''));
                        setContactNumberUpdateModalType('update');
                    },
                    onSuccess(data) {
                        dispatch(
                            setUserDetails({
                                ...userDetails,
                                contactNumber: _.get(
                                    data,
                                    'admin.contactNumber',
                                    ''
                                ),
                            })
                        );
                        setContactNumberUpdatedSuccessMessage(
                            _.get(data, 'message', '')
                        );
                    },
                }
            );
        },
    });

    useEffect(() => {
        const contactNumberField = document.getElementById(
            'otp_contact_number_modal'
        );

        if (contactNumberField != null) {
            contactNumberField.focus();
        }
        return () => {};
    }, []);

    return isLoading ? (
        <PageLoader />
    ) : contactNumberUpdatedSuccessMessage !== '' ? (
        <Box>
            <Box
                sx={{
                    height: '8rem',
                    display: 'flex',
                    justifyContent: 'center',
                }}
            >
                <img
                    src={ContactNumberUpdatedModalImage}
                    alt="Email sent"
                    style={{
                        height: '100%',
                    }}
                />
            </Box>

            <Typography
                component="p"
                variant="body1"
                sx={{
                    mt: '3rem',
                    mb: '1rem',
                    textAlign: 'center',
                }}
            >
                {contactNumberUpdatedSuccessMessage}
            </Typography>

            <Button
                fullWidth
                color="primary"
                variant="contained"
                onClick={() => {
                    handleCloseContactNumberUpdateModal();
                }}
            >
                Close
            </Button>
        </Box>
    ) : (
        <Box>
            <Typography component="p" variant="body1">
                OTP has been sent to your contact number.
            </Typography>

            <Box
                noValidate
                component="form"
                autoComplete="off"
                onSubmit={formik.handleSubmit}
            >
                <TextField
                    fullWidth
                    disabled
                    id="contact_number_modal"
                    placeholder="Enter new contact number"
                    variant="outlined"
                    margin="dense"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                +91
                            </InputAdornment>
                        ),
                    }}
                    value={formik.values.contact_number_modal}
                    onChange={formik.handleChange}
                    error={
                        formik.touched.contact_number_modal === true &&
                        Boolean(formik.errors.contact_number_modal)
                    }
                    helperText={
                        formik.touched.contact_number_modal === true &&
                        formik.errors.contact_number_modal
                    }
                />

                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                    }}
                >
                    <Button
                        color="primary"
                        variant="text"
                        onClick={() => {
                            setContactNumberUpdateModalType('update');
                        }}
                    >
                        Edit
                    </Button>
                </Box>

                <TextField
                    fullWidth
                    id="otp_contact_number_modal"
                    placeholder="Enter the OTP"
                    variant="outlined"
                    margin="dense"
                    value={formik.values.otp_contact_number_modal}
                    onChange={formik.handleChange}
                    error={
                        formik.touched.otp_contact_number_modal === true &&
                        Boolean(formik.errors.otp_contact_number_modal)
                    }
                    helperText={
                        formik.touched.otp_contact_number_modal === true &&
                        formik.errors.otp_contact_number_modal
                    }
                />

                <Button
                    fullWidth
                    color="primary"
                    variant="contained"
                    type="submit"
                    sx={{
                        mt: 1,
                    }}
                >
                    Save
                </Button>
            </Box>
        </Box>
    );
};

export default ContactNumberVerifyModal;

interface IProps {
    setContactNumberUpdateModalType: React.Dispatch<
        React.SetStateAction<'update' | 'verify'>
    >;
    newContactNumber: string;
    handleCloseContactNumberUpdateModal: () => void;
}
