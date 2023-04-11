import PhotoCamera from '@mui/icons-material/PhotoCamera';
import MuiAvatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import { type IUser } from '../../../redux/slice/user.slice';
import './Avatar.css';

const Avatar = (props: PropTypes): JSX.Element => {
    return (
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
            >
                <MuiAvatar
                    alt={props.user.name}
                    src={props.user.profilePicture}
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
    );
};

export default Avatar;

interface PropTypes {
    user: IUser;
}
