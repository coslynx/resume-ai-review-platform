// This constant stores the base URL for the OpenAI API.
// If VITE_OPENAI_API_URL is defined in .env, it uses that value; otherwise, it defaults to 'https://api.openai.com/v1/chat/completions'.
export const OPENAI_API_URL: string = import.meta.env.VITE_OPENAI_API_URL || 'https://api.openai.com/v1/chat/completions';

// This constant stores the base URL for the Stripe API.
export const STRIPE_API_URL: string = 'https://api.stripe.com/v1';

// This constant stores the base URL for the backend API.
// It uses the VITE_BACKEND_URL environment variable from the .env file.
export const BACKEND_API_URL: string = import.meta.env.VITE_BACKEND_URL || '';

// This constant stores a default error message string.
export const DEFAULT_ERROR_MESSAGE: string = 'An unexpected error occurred. Please try again later.';

// This constant stores an array of allowed file types for resume uploads.
export const UPLOAD_FILE_TYPES: string[] = ['application/pdf', 'application/msword'];

// This constant stores the maximum allowed file size for resume uploads in bytes (5 MB).
export const MAX_FILE_SIZE_BYTES: number = 5 * 1024 * 1024;

// This constant stores the Stripe publishable key, fetched from the environment variables.
export const STRIPE_PUBLISHABLE_KEY: string = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || '';

// This constant stores the AI Model for openAI
export const OPENAI_MODEL: string = 'gpt-3.5-turbo';

// This constant stores the prompt sent to the AI to get feedback, including placeholders for the resume.
export const FEEDBACK_PROMPT: string = `Analyze the following resume and provide detailed feedback with a score from 0 to 100, focusing on areas like formatting, clarity, impact and overall effectiveness. Provide details for each area including clear and actionable advice, also provide a summary of the strengths and weakness of the resume.

Resume:
{resumeText}

Feedback:`;