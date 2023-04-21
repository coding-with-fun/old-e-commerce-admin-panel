import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Box from '@mui/material/Box';
import { useAppDispatch } from '../../../../hooks/redux';
import { refetchAdminList } from '../../../../redux/slice/global.slice';

const ActionButtons = (): JSX.Element => {
    const dispatch = useAppDispatch();

    const handleAdminDelete = (): void => {
        dispatch(refetchAdminList(true));
    };

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
                onClick={handleAdminDelete}
            />
        </Box>
    );
};

export default ActionButtons;
