import { useState, useCallback } from 'react';
import axios, { AxiosError } from 'axios';
import api from '@/services/api';
import { UploadState, ResumeFile } from '@/types';
import { DEFAULT_ERROR_MESSAGE } from '@/constants';

const useResume = () => {
    const [uploadState, setUploadState] = useState<UploadState>('idle');
    const [resumeFile, setResumeFile] = useState<ResumeFile | null>(null);
    const [uploadError, setUploadError] = useState<string | null>(null);

    const uploadResume = useCallback(async (file: File | null) => {
        if (!file) {
            setUploadError('No file provided');
            return;
        }
        setUploadState('uploading');
        setUploadError(null);

        const formData = new FormData();
        formData.append('resume', file);
        
        try {
            const response = await api.post('/upload', formData, {
                headers: {
                  'Content-Type': 'multipart/form-data',
                },
              });

            if(response.status >= 200 && response.status < 300){
                const reader = new FileReader();

                reader.onloadend = () => {
                  setResumeFile({ file, preview: reader.result as string });
                  setUploadState('success');
                };
            
                reader.onerror = () => {
                   setUploadState('error');
                   setUploadError('Failed to read file.');
                };
                reader.readAsDataURL(file);
           } else {
                setUploadState('error');
                setUploadError(response.data?.message || DEFAULT_ERROR_MESSAGE);
           }
            
        } catch (error) {
            const axiosError = error as AxiosError;
            let errorMessage = DEFAULT_ERROR_MESSAGE;

            if (axiosError.response && axiosError.response.data && axiosError.response.data.message) {
                errorMessage = axiosError.response.data.message;
            } else if(axiosError.message){
              errorMessage = axiosError.message;
            }
             setUploadState('error');
             setUploadError(errorMessage);
        }
    }, []);


    return {
        uploadState,
        resumeFile,
        uploadError,
        uploadResume,
    };
};

export default useResume;