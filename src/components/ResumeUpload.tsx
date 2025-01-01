import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import Button from '@/components/common/Button';
import Spinner from '@/components/common/Spinner';
import useResume from '@/hooks/useResume';
import { formatFileSize, validateFileType } from '@/utils/helpers';
import { UPLOAD_FILE_TYPES, MAX_FILE_SIZE_BYTES } from '@/constants';

const ResumeUpload: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { uploadResume, uploadState, uploadError } = useResume();

  const handleDrop = useCallback(
    async (acceptedFiles: File[]) => {
        setLoading(true);
      if (!acceptedFiles || acceptedFiles.length === 0) {
            console.error('No file was uploaded.');
            setLoading(false);
          return;
      }
      const file = acceptedFiles[0];

      if (!validateFileType(file.type, UPLOAD_FILE_TYPES)) {
        console.error('Invalid file type. Please upload a PDF or DOC file.');
        setLoading(false);
        return;
      }

      if (file.size > MAX_FILE_SIZE_BYTES) {
           console.error(`File size exceeds the maximum limit of ${formatFileSize(MAX_FILE_SIZE_BYTES)}.`);
           setLoading(false);
          return;
      }

      try {
        await uploadResume(file);
      } catch (error) {
        console.error('Error uploading file:', error);
      } finally {
        setLoading(false);
      }
    },
    [uploadResume]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleDrop,
      accept: 'application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    multiple: false,
  });

  return (
    <div className="mt-4">
      <p className="mb-4 text-center">
        {uploadError ? (
            <span className="text-red-500">{uploadError}</span>
        ) : (
            'Upload your resume to receive AI-powered feedback.'
        )}
      </p>
      <div
        {...getRootProps()}
        className={`border-2 border-dashed border-gray-400 rounded-md p-4 text-center cursor-pointer ${
          isDragActive ? 'border-primary' : ''
        }`}
        aria-label="Drop resume here or click to upload"
      >
        <input {...getInputProps()} aria-required={true} />
        {isDragActive ? (
          <p>Drop your resume here</p>
        ) : (
          <p>Drag 'n' drop your resume here, or click to select files</p>
        )}
      </div>
      <div className="mt-4 flex justify-center">
        <Button disabled={loading} onClick={() => {}} style="text-white">
          Upload Resume
        </Button>
        {loading && <Spinner size={20} color="primary" />}
        {uploadState === 'uploading' && <p className="ml-2">Uploading...</p>}
      </div>
    </div>
  );
};

export default ResumeUpload;