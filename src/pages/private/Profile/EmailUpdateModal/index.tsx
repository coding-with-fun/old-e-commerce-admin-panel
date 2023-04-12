import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useFormik } from 'formik';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { type IUser } from '../../../../redux/slice/user.slice';
import schema from './formValidator';

const EmailUpdateModal = (props: IProps): JSX.Element | null => {
    const { localUserDetails } = props;

    const formik = useFormik({
        initialValues: {
            email: '',
        },
        enableReinitialize: true,
        validationSchema: toFormikValidationSchema(schema),
        onSubmit: async (values) => {
            console.log(values);
        },
    });

    return localUserDetails == null ? null : (
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
                    id="email"
                    placeholder="Enter new email"
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
}
