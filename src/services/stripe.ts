import { loadStripe, Stripe } from '@stripe/stripe-js';
import api from '@/services/api';
import { STRIPE_API_URL, DEFAULT_ERROR_MESSAGE, STRIPE_PUBLISHABLE_KEY } from '@/constants';
import { BackendResponse, PaymentIntent } from '@/types';
import axios, { AxiosError } from 'axios';

/**
 * Processes a payment using Stripe.
 * @param amount The amount to be paid in cents.
 * @returns A Promise that resolves to a BackendResponse containing the PaymentIntent or an error.
 */
const processPayment = async (amount: number): Promise<BackendResponse<PaymentIntent>> => {
  let stripe: Stripe | null = null;

  try {
    // Initialize Stripe with the publishable key
    stripe = await loadStripe(STRIPE_PUBLISHABLE_KEY);
    if (!stripe) {
        console.error("Failed to initialize Stripe.");
        return {
            data: null,
            error: { message: DEFAULT_ERROR_MESSAGE },
        };
    }
  } catch (error) {
      console.error('Stripe initialization error:', error);
      return {
          data: null,
          error: { message: DEFAULT_ERROR_MESSAGE },
      };
  }
    

  try {
    // Make a POST request to create a payment intent
    const response = await api.post(
      `${STRIPE_API_URL}/payment_intents`,
      { amount },
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_STRIPE_SECRET_KEY}`,
        },
      }
    );

    // Check for a successful response and return the PaymentIntent data
    if (response.data && response.data.id && response.data.client_secret) {
      return {
        data: {
            id: response.data.id,
            client_secret: response.data.client_secret,
            amount: response.data.amount
        },
          error: null
      };
    } else {
          console.error('Invalid response format from Stripe API:', response);
          return {
              data: null,
              error: { message: DEFAULT_ERROR_MESSAGE }
          }
    }
  } catch (error) {
      const axiosError = error as AxiosError;
      let errorMessage = DEFAULT_ERROR_MESSAGE;

      if (axiosError.response && axiosError.response.data && axiosError.response.data.error) {
           errorMessage = axiosError.response.data.error.message;
        }
        else if (axiosError.message) {
            errorMessage = axiosError.message
        }

    console.error('Error creating payment intent:', error);
    return {
      data: null,
      error: { message: errorMessage },
    };
  }
};

export default processPayment;