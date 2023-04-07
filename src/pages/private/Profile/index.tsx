import Box from '@mui/material/Box';
import DetailsForm from './DetailsForm';

const Profile = (): JSX.Element => {
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
            <DetailsForm />
        </Box>
    );
};

export default Profile;
