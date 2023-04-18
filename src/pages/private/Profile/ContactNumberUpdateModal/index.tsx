import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useFormik } from 'formik';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { useEffect } from 'react';
import schema from './formValidator';

const ContactNumberUpdateModal = (props: IProps): JSX.Element => {
    const { setContactNumberUpdateModalType } = props;

    const formik = useFormik({
        initialValues: {
            contact_number_modal: '',
        },
        validationSchema: toFormikValidationSchema(schema),
        onSubmit: async (values) => {
            console.log(values);
            setContactNumberUpdateModalType('verify');
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

    return (
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
}
