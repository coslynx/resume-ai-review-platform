import React from 'react';
import useFeedback from '@/hooks/useFeedback';
import Spinner from '@/components/common/Spinner';

const FeedbackDisplay: React.FC = () => {
  const { feedback, feedbackState, feedbackError } = useFeedback();

  if (feedbackState === 'loading') {
      return (
      <div className="flex justify-center items-center h-40">
        <Spinner color="primary" size={24} />
          <p className="ml-2">Fetching Feedback...</p>
        </div>
        );
    }
  
    if (feedbackState === 'error') {
        return (
            <div className="text-center mt-4">
                <p className="text-red-500">{feedbackError}</p>
            </div>
        );
    }
  
    if (feedbackState === 'success') {
      try {
        if (typeof feedback === 'string') {
          return (
              <div className="mt-4">
                <pre className="whitespace-pre-wrap" style={{ fontFamily: 'monospace' }}>
                  {feedback}
                </pre>
              </div>
          );
        } else if (typeof feedback === 'object' && feedback !== null) {
          return (
            <div className="mt-4">
              <pre className="whitespace-pre-wrap" style={{ fontFamily: 'monospace' }}>
                {JSON.stringify(feedback, null, 2)}
              </pre>
            </div>
          );
          
        }
        
      } catch (error: any) {
        console.error('Error rendering feedback:', error);
        return (
          <div className="mt-4 text-center">
            <p className="text-red-500">Error displaying feedback. Please try again.</p>
          </div>
        );
      }
    }

  return (
    <div className="mt-4 text-center">
      <p>No feedback available</p>
    </div>
  );
};

export default FeedbackDisplay;