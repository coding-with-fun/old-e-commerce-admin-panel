import PhotoCamera from '@mui/icons-material/PhotoCamera';
import MuiAvatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import { Fragment, useState } from 'react';
import { type IUser } from '../../../redux/slice/user.slice';
import './Avatar.css';
import ImageUploadModal from './ImageUploadModal';

const Avatar = (props: PropTypes): JSX.Element => {
    const [openImageUploadModal, setOpenImageUploadModal] = useState(false);
    const [newAvatar, setNewAvatar] = useState({
        _id: '',
        url: '',
    });

    console.log(newAvatar);

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
                        alt={props.user.name}
                        src={
                            newAvatar.url !== ''
                                ? newAvatar.url
                                : props.user.profilePicture
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

            <ImageUploadModal
                openImageUploadModal={openImageUploadModal}
                handleCloseImageUploadModal={handleCloseImageUploadModal}
                setNewAvatar={setNewAvatar}
            />
        </Fragment>
    );
};

export default Avatar;

interface PropTypes {
    user: IUser;
}
