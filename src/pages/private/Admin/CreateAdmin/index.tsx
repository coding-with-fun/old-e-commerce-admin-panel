import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import DetailsForm from './DetailsForm';

const CreateAdmin = (): JSX.Element => {
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                width: '100%',
                display: 'flex',
                flexFlow: 'column',
                alignItems: 'center',
            }}
        >
            <Box
                sx={{
                    width: '450px',
                }}
            >
                <ArrowBackIcon
                    onClick={() => {
                        navigate(-1);
                    }}
                    sx={{
                        cursor: 'pointer',
                    }}
                />
            </Box>

            <Box
                sx={{
                    display: 'flex',
                    flexFlow: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    mt: '2rem',
                }}
            >
                <DetailsForm />
            </Box>
        </Box>
    );
};

export default CreateAdmin;
