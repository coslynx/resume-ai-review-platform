import { useState, useCallback } from 'react';
import { FeedbackState, Feedback, BackendResponse, ApiError } from '@/types';
import getFeedback from '@/services/openai';
import { DEFAULT_ERROR_MESSAGE } from '@/constants';

/**
 * Custom React hook for fetching and managing AI-generated feedback for a resume.
 * @returns {object} An object containing the feedback state, feedback data, and fetchFeedback function.
 */
const useFeedback = () => {
    const [feedbackState, setFeedbackState] = useState<FeedbackState>('idle');
    const [feedback, setFeedback] = useState<Feedback | null>(null);

    /**
     * Fetches AI-generated feedback for a given resume text.
     * @param {string} resumeText The text content of the resume.
     * @returns {Promise<void>} A Promise that resolves to void.
     */
    const fetchFeedback = useCallback(async (resumeText: string): Promise<void> => {
        if (!resumeText) {
            setFeedback(null);
            setFeedbackState('idle');
            return;
        }

        setFeedbackState('loading');
        
        try {
            const response: BackendResponse<Feedback> = await getFeedback(resumeText);

            if (response.data) {
                setFeedback(response.data);
                setFeedbackState('success');
            } else {
                setFeedback(null);
                setFeedbackState('error');
                console.error('Error fetching feedback:', response.error?.message || DEFAULT_ERROR_MESSAGE);
            }
        } catch (error: any) {
            setFeedback(null);
            setFeedbackState('error');
            console.error('Error fetching feedback:', error.message || DEFAULT_ERROR_MESSAGE);
        }
    }, []);

    return {
        feedbackState,
        feedback,
        fetchFeedback,
    };
};

export default useFeedback;