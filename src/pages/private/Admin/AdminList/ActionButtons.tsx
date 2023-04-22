import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Box from '@mui/material/Box';
import {
    type GridRenderCellParams,
    type GridTreeNodeWithRender,
} from '@mui/x-data-grid';
import { Fragment, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '../../../../components/HOC/Modal';
import routes from '../../../../router/routes';
import DeleteAdminPopup from './DeleteAdminPopup';

const ActionButtons = (
    params: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>
): JSX.Element => {
    const navigate = useNavigate();

    // Modal flags
    const [cleanModalContent, setCleanModalContent] = useState(false);

    // Flags for admin delete modal
    const [openAdminDeleteModal, setOpenAdminDeleteModal] = useState(false);
    const handleOpenAdminDeleteModal = (): void => {
        setOpenAdminDeleteModal(true);
    };
    const handleCloseAdminDeleteModal = (): void => {
        setOpenAdminDeleteModal(false);
    };

    const handleAdminDelete = (): void => {
        handleOpenAdminDeleteModal();
    };

    const handleViewAdminDetails = (): void => {
        navigate(`${routes.private.admin.list}/${params.id}`);
    };

    return (
        <Fragment>
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
                    onClick={handleViewAdminDetails}
                />

                {params.row.isSuperAdmin === true ? null : (
                    <DeleteIcon
                        sx={{
                            color: 'rgba(0, 0, 0, 0.54)',
                            cursor: 'pointer',
                        }}
                        onClick={handleAdminDelete}
                    />
                )}
            </Box>

            <Modal
                handleCloseModal={handleCloseAdminDeleteModal}
                open={openAdminDeleteModal}
                setCleanModalContent={setCleanModalContent}
            >
                {cleanModalContent ? null : (
                    <DeleteAdminPopup
                        adminId={params.row._id}
                        handleCloseModal={handleCloseAdminDeleteModal}
                    />
                )}
            </Modal>
        </Fragment>
    );
};

export default ActionButtons;
