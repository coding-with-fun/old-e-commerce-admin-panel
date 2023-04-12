import PhotoCamera from '@mui/icons-material/PhotoCamera';
import MuiAvatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import { Fragment, useState } from 'react';
import { type IUser } from '../../../redux/slice/user.slice';
import './Avatar.css';
import ImageUploadModal from './ImageUploadModal';
import Modal from '../../../components/HOC/Modal';

const Avatar = (props: PropTypes): JSX.Element => {
    const { user, newAvatar, setNewAvatar } = props;
    const [openImageUploadModal, setOpenImageUploadModal] = useState(false);
    const [cleanModalContent, setCleanModalContent] = useState(false);

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
                        alt={user.name}
                        src={
                            newAvatar.url !== ''
                                ? newAvatar.url
                                : user.profilePictureId
                        }
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
                handleCloseImageUploadModal={handleCloseImageUploadModal}
                openImageUploadModal={openImageUploadModal}
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
    user: IUser;
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
