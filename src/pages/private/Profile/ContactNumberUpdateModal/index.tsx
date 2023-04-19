import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useMutation } from '@tanstack/react-query';
import { useFormik } from 'formik';
import _ from 'lodash';
import { useEffect } from 'react';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { UpdateContactNumberAPI } from '../../../../apis/profile';
import PageLoader from '../../../../components/PageLoader';
import toast from '../../../../libs/toast';
import schema from './formValidator';

const ContactNumberUpdateModal = (props: IProps): JSX.Element => {
    const {
        setContactNumberUpdateModalType,
        newContactNumber,
        setNewContactNumber,
    } = props;

    const { mutate, isLoading } = useMutation({
        mutationFn: UpdateContactNumberAPI,
    });

    const formik = useFormik({
        initialValues: {
            contact_number_modal: newContactNumber,
        },
        validationSchema: toFormikValidationSchema(schema),
        onSubmit: async (values) => {
            mutate(
                {
                    contactNumber: '+91' + values.contact_number_modal,
                },
                {
                    onError: (error) => {
                        toast(_.get(error, 'message', ''));
                    },
                    onSuccess() {
                        setNewContactNumber(values.contact_number_modal);
                        setContactNumberUpdateModalType('verify');
                    },
                }
            );
        },
    });

    useEffect(() => {
        const contactNumberField = document.getElementById(
            'contact_number_modal'
        );

        if (contactNumberField != null) {
            contactNumberField.focus();
        }
        return () => {};
    }, []);

    return isLoading ? (
        <PageLoader />
    ) : (
        <Box>
            <Typography component="p" variant="body1">
                Please enter the new contact number and we will send you an OTP.
            </Typography>

            <Box
                noValidate
                component="form"
                autoComplete="off"
                onSubmit={formik.handleSubmit}
            >
                <TextField
                    fullWidth
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

export default ContactNumberUpdateModal;

interface IProps {
    setContactNumberUpdateModalType: React.Dispatch<
        React.SetStateAction<'update' | 'verify'>
    >;
    newContactNumber: string;
    setNewContactNumber: React.Dispatch<React.SetStateAction<string>>;
}
