import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import bg from '../../../assets/imageUploadModalBg.svg';
import Modal from '../../../components/HOC/Modal';

const ImageUploadModal = (props: PropTypes): JSX.Element => {
    const { openImageUploadModal, handleCloseImageUploadModal } = props;

    const onDrop = useCallback((acceptedFiles: File[]) => {
        if (acceptedFiles.length > 0) {
            handleFilesUpload(acceptedFiles[0]);
        }
    }, []);

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: {
            'image/png': ['.png'],
            'image/jpg': ['.jpg'],
        },
    });

    const handleFilesUpload = (file: File): void => {
        console.log(file);
    };

    return (
        <Modal
            handleCloseImageUploadModal={handleCloseImageUploadModal}
            openImageUploadModal={openImageUploadModal}
        >
            <Box>
                <Typography
                    variant="h6"
                    component="h2"
                    sx={{
                        textAlign: 'center',
                        mb: '1.25rem',
                    }}
                >
                    Upload your image
                </Typography>

                <Typography
                    variant="body2"
                    component="h2"
                    sx={{
                        textAlign: 'center',
                    }}
                >
                    File should be Jpeg or Png
                </Typography>
            </Box>

            <Box
                sx={{
                    display: 'flex',
                    flexFlow: 'column',

                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Box
                    {...getRootProps()}
                    sx={{
                        height: '16rem',
                        width: '100%',
                        cursor: 'pointer',
                        bgcolor: '#F6F8FB',
                        mt: '3rem',
                        mb: '1rem',

                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'column',

                        borderRadius: '0.5rem',
                        border: '2px dashed #97BEF4',
                    }}
                >
                    <input {...getInputProps()} />

                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'column',
                            gap: '1rem',
                        }}
                    >
                        <img src={bg} alt="Upload Image" />

                        <Typography variant="body2" component="p">
                            Drag & Drop your image here
                        </Typography>
                    </Box>
                </Box>

                <Typography
                    variant="body2"
                    component="h2"
                    sx={{
                        textAlign: 'center',
                        color: '#BDBDBD',
                    }}
                >
                    Or
                </Typography>

                <Button
                    variant="contained"
                    component="label"
                    sx={{
                        mt: '1rem',
                    }}
                >
                    Choose a file
                    <input
                        hidden
                        accept=".jpg, .png"
                        type="file"
                        onChange={(event) => {
                            if (event.target.files != null) {
                                handleFilesUpload(event.target.files[0]);
                            }
                        }}
                        onClick={(event) => {
                            event.currentTarget.value = '';
                        }}
                    />
                </Button>
            </Box>
        </Modal>
    );
};

export default ImageUploadModal;

interface PropTypes {
    openImageUploadModal: boolean;
    handleCloseImageUploadModal: () => void;
}
