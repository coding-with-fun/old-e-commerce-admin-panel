import axios from 'axios';
import { useState } from 'react';

export const useUploadForm = (
    url: string
): {
    uploadForm: (formData: FormData) => Promise<void>;
    isSuccess: boolean;
    progress: number;
    size: number;
} => {
    const [isSuccess, setIsSuccess] = useState(false);
    const [size, setSize] = useState(0);
    const [progress, setProgress] = useState(0);

    const uploadForm = async (formData: FormData): Promise<void> => {
        await axios.post(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            onUploadProgress: (progressEvent) => {
                const { loaded, total } = progressEvent;
                let percent = 0;
                if (total != null) {
                    percent = Math.floor((loaded * 100) / total);
                    console.log(`${loaded}kb of ${total}kb | ${percent}%`);
                    console.log(
                        `${Math.round(loaded * 0.000001 * 100) / 100}mb of ${
                            Math.round(total * 0.000001 * 100) / 100
                        }mb | ${percent}%`
                    );
                    setSize(Math.round(loaded * 0.000001 * 100) / 100);
                }

                if (percent <= 100) {
                    setProgress(percent);
                }
            },
        });
        setIsSuccess(true);
    };

    return { uploadForm, isSuccess, progress, size };
};
