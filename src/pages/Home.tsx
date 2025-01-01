import React from 'react';
import ResumeUpload from '@/components/ResumeUpload';
import { Link } from 'react-router-dom';
import useResume from '@/hooks/useResume';

const Home: React.FC = () => {
  const { uploadState } = useResume();

  try {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-4xl font-bold mb-8 text-gray-800">AI Resume Review</h1>
            <ResumeUpload />
            <p className="text-center text-gray-600 mt-4">
                After uploading, you will be redirected to the payment page to complete your purchase.
            </p>
          {uploadState === 'success' && (
            <Link
                to="/review"
                className="mt-6 px-6 py-3 text-white bg-primary rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
              >
                Proceed to Payment
            </Link>
          )}
        </div>
      );
    } catch (error: any) {
      console.error("Error rendering Home component:", error);
        return (
          <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-4xl font-bold mb-8 text-gray-800">Error</h1>
            <p className="text-center text-red-500 mt-4">
              There was an error loading the page. Please try again.
            </p>
          </div>
      );
    }
};

export default Home;