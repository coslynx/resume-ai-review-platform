import React from 'react';
import PaymentForm from '@/components/PaymentForm';
import FeedbackDisplay from '@/components/FeedbackDisplay';

const ReviewPage: React.FC = () => {
  try {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <PaymentForm />
        <FeedbackDisplay />
      </div>
    );
  } catch (error: any) {
    console.error("Error rendering ReviewPage component:", error);
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-4xl font-bold mb-8 text-gray-800">Error</h1>
        <p className="text-center text-red-500 mt-4">
          There was an error loading the review page. Please try again.
        </p>
      </div>
    );
  }
};

export default ReviewPage;