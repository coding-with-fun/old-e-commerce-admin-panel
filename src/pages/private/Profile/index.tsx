import Box from '@mui/material/Box';
import type React from 'react';
import { useState } from 'react';
import { useUploadForm } from '../../../hooks/uploadFile';
import { baseURL } from '../../../libs/interceptor';
import DetailsForm from './DetailsForm';
// import { useAppDispatch, useAppSelector } from '../../../redux/hooks';

interface PostData {
    image: File | null;
}

const Profile = (): JSX.Element => {
    // const userDetails = useAppSelector((state) => state.user.userDetails);
    // const dispatch = useAppDispatch();

    const [formValues, setFormValues] = useState<PostData>({
        image: null,
    });

    const { isSuccess, uploadForm, progress, size } = useUploadForm(
        `${baseURL}/get-files-url`
    );

    const handleImageChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ): void => {
        setFormValues((prevFormValues) => ({
            ...prevFormValues,
            image: event.target.files != null ? event.target.files[0] : null,
        }));
    };

    const handleSubmit = async (): Promise<void> => {
        const formData = new FormData();
        formValues.image != null &&
            formData.append('filesToUpload', formValues.image);
        await uploadForm(formData);
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexFlow: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
            }}
        >
            <div>
                {isSuccess ? 'true' : 'false'}
                {progress}
                <input
                    multiple
                    type="file"
                    name=""
                    id=""
                    onChange={handleImageChange}
                />
                <button
                    onClick={() => {
                        void (async () => {
                            await handleSubmit();
                        })();
                    }}
                >
                    Submit
                </button>
                {size}MB
            </div>

            <DetailsForm />
        </Box>
    );
};

export default Profile;
