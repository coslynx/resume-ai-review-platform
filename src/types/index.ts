interface ResumeFile {
  file: File;
  preview?: string;
}

interface Feedback {
  summary: string;
  details: string[];
  score: number;
}

interface PaymentIntent {
  id: string;
  client_secret: string;
  amount?: number;
}

type UploadState = 'idle' | 'uploading' | 'success' | 'error';

type PaymentState = 'idle' | 'processing' | 'success' | 'error';

type FeedbackState = 'idle' | 'loading' | 'success' | 'error';

interface ApiError {
  message: string;
}

interface BackendResponse<T> {
  data: T | null;
  error: ApiError | null;
}

export type {
  ResumeFile,
  Feedback,
  PaymentIntent,
  UploadState,
  PaymentState,
  FeedbackState,
  ApiError,
  BackendResponse,
};