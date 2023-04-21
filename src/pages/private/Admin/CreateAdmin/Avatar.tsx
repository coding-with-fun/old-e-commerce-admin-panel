import PhotoCamera from '@mui/icons-material/PhotoCamera';
import MuiAvatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import { Fragment, useState } from 'react';
import './Avatar.css';
import Modal from '../../../../components/HOC/Modal';
import ImageUploadModal from './ImageUploadModal';

const Avatar = (props: PropTypes): JSX.Element => {
    const { newAvatar, setNewAvatar } = props;

    const [cleanModalContent, setCleanModalContent] = useState(false);

    const [openImageUploadModal, setOpenImageUploadModal] = useState(false);
    const handleOpenImageUploadModal = (): void => {
        setOpenImageUploadModal(true);
    };
    const handleCloseImageUploadModal = (): void => {
        setOpenImageUploadModal(false);
    };

    return (
        <Fragment>
            <Box>
                <Box
                    sx={{
                        position: 'relative',
                        mx: 'auto',
                        mb: 2,
                        width: 120,
                        height: 120,
                    }}
                    className="avatar_container"
                    onClick={handleOpenImageUploadModal}
                >
                    <MuiAvatar
                        alt="Profile picture"
                        src={newAvatar.url}
                        sx={{
                            width: 120,
                            height: 120,
                        }}
                        className="avatar"
                    />

                    <Box className="uploader_container">
                        <Fab color="primary" aria-label="upload" size="small">
                            <PhotoCamera />
                        </Fab>
                    </Box>
                </Box>
            </Box>

            <Modal
                handleCloseModal={handleCloseImageUploadModal}
                open={openImageUploadModal}
                setCleanModalContent={setCleanModalContent}
            >
                {cleanModalContent ? null : (
                    <ImageUploadModal
                        handleCloseImageUploadModal={
                            handleCloseImageUploadModal
                        }
                        setNewAvatar={setNewAvatar}
                    />
                )}
            </Modal>
        </Fragment>
    );
};

export default Avatar;

interface PropTypes {
    newAvatar: {
        _id: string;
        url: string;
    };
    setNewAvatar: React.Dispatch<
        React.SetStateAction<{
            _id: string;
            url: string;
        }>
    >;
}
