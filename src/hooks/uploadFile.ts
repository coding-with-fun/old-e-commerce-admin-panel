import axios, { type AxiosResponse } from 'axios';
import { useState } from 'react';

export const useUploadForm = (
    url: string
): {
    uploadForm: (formData: FormData) => Promise<AxiosResponse<any, any>>;
    isSuccess: boolean;
    fileUploadStarted: boolean;
    progress: number;
    size: number;
} => {
    const [isSuccess, setIsSuccess] = useState(false);
    const [size, setSize] = useState(0);
    const [progress, setProgress] = useState(0);
    const [fileUploadStarted, setFileUploadStarted] = useState(false);

    const uploadForm = async (
        formData: FormData
    ): Promise<AxiosResponse<any, any>> => {
        setFileUploadStarted(true);
        const response = await axios.post(url, formData, {
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
        setFileUploadStarted(false);

        return response;
    };

    return { uploadForm, isSuccess, progress, size, fileUploadStarted };
};
