import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import _ from 'lodash';
import { Fragment, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import bg from '../../../assets/imageUploadModalBg.svg';
import { useUploadForm } from '../../../hooks/uploadFile';
import { baseURL } from '../../../libs/interceptor';

const ImageUploadModal = (props: PropTypes): JSX.Element => {
    const { setNewAvatar, handleCloseImageUploadModal } = props;
    const { uploadForm, progress, fileUploadStarted } = useUploadForm(
        `${baseURL}/get-files-url`
    );

    const onDrop = useCallback((acceptedFiles: File[]) => {
        if (acceptedFiles.length > 0) {
            void handleFilesUpload(acceptedFiles[0]);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: {
            'image/png': ['.png'],
            'image/jpg': ['.jpg'],
        },
    });

    const handleFilesUpload = async (file: File): Promise<void> => {
        const formData = new FormData();
        formData.append('filesToUpload', file);
        const response = await uploadForm(formData);
        setNewAvatar({
            _id: _.get(response, 'data.urls[0]._id'),
            url: _.get(response, 'data.urls[0].url'),
        });
        handleCloseImageUploadModal();
    };

    return (
        <Fragment>
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

                <Box
                    sx={{
                        mt: '1rem',
                    }}
                >
                    {fileUploadStarted ? (
                        <LinearProgress
                            variant={
                                progress === 100
                                    ? 'indeterminate'
                                    : 'determinate'
                            }
                            value={progress}
                            sx={{
                                width: 300,
                            }}
                        />
                    ) : (
                        <Button variant="contained" component="label">
                            Choose a file
                            <input
                                hidden
                                accept=".jpg, .png"
                                type="file"
                                onChange={(
                                    event: React.ChangeEvent<HTMLInputElement>
                                ) => {
                                    if (event.target.files != null) {
                                        void handleFilesUpload(
                                            event.target.files[0]
                                        );
                                    }
                                }}
                                onClick={(event) => {
                                    event.currentTarget.value = '';
                                }}
                            />
                        </Button>
                    )}
                </Box>
            </Box>
        </Fragment>
    );
};

export default ImageUploadModal;

interface PropTypes {
    handleCloseImageUploadModal: () => void;
    setNewAvatar: React.Dispatch<
        React.SetStateAction<{
            _id: string;
            url: string;
        }>
    >;
}
