import Box from '@mui/material/Box';
import DetailsForm from './DetailsForm';
// import { useAppDispatch, useAppSelector } from '../../../redux/hooks';

const Profile = (): JSX.Element => {
    // const userDetails = useAppSelector((state) => state.user.userDetails);
    // const dispatch = useAppDispatch();

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
