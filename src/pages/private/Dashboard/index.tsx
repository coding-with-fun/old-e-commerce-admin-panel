import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { removeUserToken } from '../../../utils/manageUserToken';
import { useNavigate } from 'react-router-dom';

const Dashboard = (): JSX.Element => {
    const navigate = useNavigate();

    const handleSignOut = (): void => {
        removeUserToken();
        navigate('/signin', {
            replace: true,
        });
    };

    return (
        <Box>
            <Typography>Dashboard</Typography>

            <Button onClick={handleSignOut}>Sign Out</Button>
        </Box>
    );
};

export default Dashboard;
