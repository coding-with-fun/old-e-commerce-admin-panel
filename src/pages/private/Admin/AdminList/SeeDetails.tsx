import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Box from '@mui/material/Box';

const SeeDetails = (): JSX.Element => {
    return (
        <Box
            sx={{
                display: 'flex',
                gap: '1rem',
            }}
        >
            <VisibilityIcon
                sx={{
                    color: 'rgba(0, 0, 0, 0.54)',
                    cursor: 'pointer',
                }}
            />
            <DeleteIcon
                sx={{
                    color: 'rgba(0, 0, 0, 0.54)',
                    cursor: 'pointer',
                }}
            />
        </Box>
    );
};

export default SeeDetails;
