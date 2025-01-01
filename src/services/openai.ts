import api from '@/services/api';
import { OPENAI_API_URL, OPENAI_MODEL, FEEDBACK_PROMPT, DEFAULT_ERROR_MESSAGE } from '@/constants';
import { BackendResponse, Feedback } from '@/types';
import axios, { AxiosError } from 'axios';

const getFeedback = async (resumeText: string): Promise<BackendResponse<Feedback>> => {
  if (!resumeText) {
      return {
          data: null,
          error: { message: "Resume text cannot be empty." },
      };
  }

  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

  try {
    const response = await api.post(
      OPENAI_API_URL,
      {
        model: OPENAI_MODEL,
        messages: [
          {
            role: 'user',
            content: FEEDBACK_PROMPT.replace('{resumeText}', resumeText),
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );

      if (response.data && response.data.choices && response.data.choices.length > 0) {
          const content = response.data.choices[0].message.content;
        
          const summaryMatch = content.match(/Summary:\s*(.*?)\n/);
          const detailsMatch = content.match(/Details:\s*([\s\S]*?)(?=\n\n|$)/);
          const scoreMatch = content.match(/Score:\s*(\d+)/);


            const summary = summaryMatch ? summaryMatch[1].trim() : 'No summary available.';
            const detailsText = detailsMatch ? detailsMatch[1].trim() : 'No details available.';
            const details = detailsText.split('\n').filter(line => line.trim() !== '').map(line => line.trim());
            const score = scoreMatch ? parseInt(scoreMatch[1], 10) : 0;
          
          return {
              data: {
                  summary,
                  details,
                  score,
              },
              error: null
          };
      } else {
         return {
                  data: null,
                  error: { message: "Invalid response format from OpenAI API." }
              }
      }
  } catch (error) {
    const axiosError = error as AxiosError;
    let errorMessage = DEFAULT_ERROR_MESSAGE;

      if (axiosError.response && axiosError.response.data && axiosError.response.data.error) {
           errorMessage = axiosError.response.data.error.message;
        }
      else if(axiosError.message){
           errorMessage = axiosError.message
      }

    console.error('Error fetching feedback from OpenAI:', error);
    return {
        data: null,
        error: { message: errorMessage },
    };
  }
};

export default getFeedback;