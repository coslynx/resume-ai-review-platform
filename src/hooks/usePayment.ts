import { useState, useCallback } from 'react';
import {  PaymentState, PaymentIntent, BackendResponse, ApiError } from '@/types';
import processPayment from '@/services/stripe';
import { DEFAULT_ERROR_MESSAGE } from '@/constants';

/**
 * Custom React hook for managing the payment process using the Stripe API.
 * @returns {object} An object containing the payment state, error, and initiatePayment function.
 */
const usePayment = () => {
    const [paymentState, setPaymentState] = useState<PaymentState>('idle');
    const [paymentError, setPaymentError] = useState<string | null>(null);

    /**
     * Initiates a payment using the Stripe API.
     * @param {number} amount The amount to be paid in cents.
     * @returns {Promise<BackendResponse<PaymentIntent>>} A Promise that resolves to a BackendResponse containing the PaymentIntent or an error.
     */
    const initiatePayment = useCallback(async (amount: number): Promise<BackendResponse<PaymentIntent>> => {
        if (typeof amount !== 'number') {
            setPaymentState('error');
            setPaymentError('Invalid amount provided.');
            return {
              data: null,
              error: { message: 'Invalid amount provided.' },
            };
        }
        
        setPaymentState('processing');
        setPaymentError(null);

        try {
            const response = await processPayment(amount);

            if (response.data) {
                setPaymentState('success');
                return {
                  data: response.data,
                  error: null
                };
            } else {
              setPaymentState('error');
              setPaymentError(response.error?.message || DEFAULT_ERROR_MESSAGE);
              return {
                  data: null,
                  error: { message: response.error?.message || DEFAULT_ERROR_MESSAGE },
              };
            }
        } catch (error: any) {
            console.error('Error initiating payment:', error);
            setPaymentState('error');
            setPaymentError(error.message || DEFAULT_ERROR_MESSAGE);
            return {
              data: null,
              error: { message: error.message || DEFAULT_ERROR_MESSAGE },
            };
        }
    }, []);

    return {
        paymentState,
        paymentError,
        initiatePayment,
    };
};

export default usePayment;