import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import MuiModal from '@mui/material/Modal';

const Modal = (props: PropTypes): JSX.Element => {
    const { openImageUploadModal, handleCloseImageUploadModal, children } =
        props;

    return (
        <MuiModal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={openImageUploadModal}
            onClose={handleCloseImageUploadModal}
            closeAfterTransition
            slots={{
                backdrop: Backdrop,
            }}
            slotProps={{
                backdrop: {
                    timeout: 500,
                },
            }}
        >
            <Fade in={openImageUploadModal}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        bgcolor: '#fff',
                        boxShadow: 24,
                        border: 'transparent',
                        outline: '0',
                        p: 4,
                        borderRadius: '5px',
                    }}
                >
                    {children}
                </Box>
            </Fade>
        </MuiModal>
    );
};

export default Modal;

interface PropTypes {
    openImageUploadModal: boolean;
    handleCloseImageUploadModal: () => void;
    children: JSX.Element[] | JSX.Element;
}
