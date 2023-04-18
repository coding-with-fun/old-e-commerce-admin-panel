import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useMutation } from '@tanstack/react-query';
import { useFormik } from 'formik';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { UpdateEmailAPI } from '../../../../apis/profile';
import EmailSentImage from '../../../../assets/emailSentImage.png';
import PageLoader from '../../../../components/PageLoader';
import toast from '../../../../libs/toast';
import { type IUser } from '../../../../redux/slice/user.slice';
import schema from './formValidator';

const EmailUpdateModal = (props: IProps): JSX.Element | null => {
    const { localUserDetails, handleCloseEmailUpdateModal } = props;

    const [emailUpdatedSuccessMessage, setEmailUpdatedSuccessMessage] =
        useState('');

    const { mutate, isLoading } = useMutation({
        mutationFn: UpdateEmailAPI,
    });

    const formik = useFormik({
        initialValues: {
            email_modal: '',
        },
        validationSchema: toFormikValidationSchema(schema),
        onSubmit: async (values) => {
            mutate(
                {
                    email: values.email_modal,
                },
                {
                    onError: (error) => {
                        toast(_.get(error, 'message', ''));
                    },
                    onSuccess(data) {
                        setEmailUpdatedSuccessMessage(
                            _.get(data, 'message', '')
                        );
                    },
                }
            );
        },
    });

    useEffect(() => {
        const emailField = document.getElementById('email_modal');

        if (emailField != null) {
            emailField.focus();
        }
        return () => {};
    }, []);

    return isLoading || localUserDetails == null ? (
        <PageLoader />
    ) : emailUpdatedSuccessMessage !== '' ? (
        <Box>
            <Box
                sx={{
                    height: '8rem',
                    display: 'flex',
                    justifyContent: 'center',
                }}
            >
                <img
                    src={EmailSentImage}
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
                }}
            >
                {emailUpdatedSuccessMessage}
            </Typography>

            <Button
                fullWidth
                color="primary"
                variant="contained"
                onClick={() => {
                    handleCloseEmailUpdateModal();
                }}
            >
                Close
            </Button>
        </Box>
    ) : (
        <Box>
            <Typography
                component="p"
                variant="body1"
                sx={{
                    wordBreak: 'break-all',
                }}
            >
                Your current email address is {localUserDetails.email}
            </Typography>

            <Divider
                sx={{
                    my: 3,
                }}
            />

            <Typography component="p" variant="body1">
                Please enter a new email and we will send you a verification
                code.
            </Typography>

            <Box
                noValidate
                component="form"
                autoComplete="off"
                onSubmit={formik.handleSubmit}
            >
                <TextField
                    fullWidth
                    id="email_modal"
                    placeholder="Enter new email"
                    variant="outlined"
                    margin="dense"
                    value={formik.values.email_modal}
                    onChange={formik.handleChange}
                    error={
                        formik.touched.email_modal === true &&
                        Boolean(formik.errors.email_modal)
                    }
                    helperText={
                        formik.touched.email_modal === true &&
                        formik.errors.email_modal
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

export default EmailUpdateModal;

interface IProps {
    localUserDetails: IUser | undefined;
    handleCloseEmailUpdateModal: () => void;
}
