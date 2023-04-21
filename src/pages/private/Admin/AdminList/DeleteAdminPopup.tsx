import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useMutation } from '@tanstack/react-query';
import _ from 'lodash';
import { DeleteAdminAPI } from '../../../../apis/admin';
import DeleteAccount from '../../../../assets/deleteAccount.png';
import { useAppDispatch } from '../../../../hooks/redux';
import toast from '../../../../libs/toast';
import { refetchAdminList } from '../../../../redux/slice/global.slice';
import PageLoader from '../../../../components/PageLoader';

const DeleteAdminPopup = (props: IProps): JSX.Element => {
    const { adminId, handleCloseModal } = props;

    const dispatch = useAppDispatch();

    const { mutate, isLoading } = useMutation({
        mutationFn: DeleteAdminAPI,
    });

    const confirmAdminDelete = (): void => {
        mutate(
            {
                adminId,
            },
            {
                onSuccess: () => {
                    handleCloseModal();
                    dispatch(refetchAdminList(true));
                },
                onError: (error) => {
                    toast(_.get(error, 'message', ''));
                },
            }
        );
    };

    return isLoading ? (
        <PageLoader />
    ) : (
        <Box
            sx={{
                px: '1rem',
            }}
        >
            <Box
                sx={{
                    height: '8rem',
                    display: 'flex',
                    justifyContent: 'center',
                }}
            >
                <img
                    src={DeleteAccount}
                    alt="Email sent"
                    style={{
                        height: '100%',
                    }}
                />
            </Box>

            <Typography
                component="p"
                variant="h6"
                sx={{
                    my: '3rem',
                    textAlign: 'center',
                }}
            >
                Are you sure to delete the selected admin?
            </Typography>

            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <Button
                    color="primary"
                    variant="outlined"
                    onClick={handleCloseModal}
                >
                    Cancel
                </Button>

                <Button
                    color="error"
                    variant="contained"
                    onClick={confirmAdminDelete}
                >
                    Delete
                </Button>
            </Box>
        </Box>
    );
};

export default DeleteAdminPopup;

interface IProps {
    adminId: string;
    handleCloseModal: () => void;
}
