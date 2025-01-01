import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';
import Spinner from '@/components/common/Spinner';
import usePayment from '@/hooks/usePayment';

interface PaymentFormProps {}

/**
 * PaymentForm component handles the payment process using Stripe Elements.
 * It renders a form to collect card details and submits them to Stripe.
 */
const PaymentForm: React.FC<PaymentFormProps> = () => {
    const stripe = useStripe();
    const elements = useElements();
    const { initiatePayment, paymentState, paymentError } = usePayment();
    const [loading, setLoading] = useState(false);
    const [cardError, setCardError] = useState<string | null>(null);
    const [nameOnCard, setNameOnCard] = useState('');

    /**
     * Handles the submit event of the payment form.
     * @param {FormEvent} event - The form submit event.
     */
    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();

        if (!stripe || !elements) {
            setCardError('Stripe has not been initialized.');
            return;
        }
        setLoading(true);
      setCardError(null);
        try {
             const cardElement = elements.getElement(CardElement);
            if (!cardElement) {
                setCardError('Card element is not properly set up');
                return;
            }

            const { error, paymentMethod } = await stripe.createPaymentMethod({
                 type: 'card',
                card: cardElement,
                billing_details: {
                    name: nameOnCard
                }
             });
             
            if (error) {
                 setCardError(error.message || 'An error occurred while processing your payment.');
                return;
            }
           if(!paymentMethod){
                setCardError('Could not create payment method.');
                return;
           }
            const paymentResponse = await initiatePayment(1000);

            if (!paymentResponse.data) {
                setCardError(paymentResponse.error?.message || 'Failed to initiate payment. Please try again.');
            }
        } catch (error: any) {
            console.error('Error during payment processing:', error);
            setCardError(error.message || 'An unexpected error occurred.');
        } finally {
             setLoading(false);
        }
    };


    /**
     * Handles changes to the card element and sets card errors if present.
     * @param {any} event - The card element change event.
     */
    const handleCardChange = (event: any) => {
         if(event.error) {
             setCardError(event.error.message);
        }else{
            setCardError(null);
        }
    };

    const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setNameOnCard(event.target.value);
    };


    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8 p-6 bg-white rounded shadow-md">
            <h2 className="text-2xl font-semibold mb-6 text-center">Payment Details</h2>
             <Input
                label="Name on card"
                placeholder="John Doe"
                type="text"
                value={nameOnCard}
                onChange={handleNameChange}
             />
             <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="card-element">
                   Card Details
                </label>
                <div className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50">
                    <CardElement 
                        onChange={handleCardChange}
                        options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                  color: '#aab7c4',
                                },
                             },
                              invalid: {
                                color: '#9e2146',
                              }
                          },
                        }}
                    />
                </div>
               {cardError && <p className="text-red-500 text-sm mt-2">{cardError}</p>}
            </div>
             <div className="mt-6 flex justify-center">
                <Button 
                   disabled={!stripe || !elements || loading || paymentState === 'processing' || !!cardError} 
                   style="text-white"
                >
                     Pay
                </Button>
                 {loading && <Spinner size={20} color="primary" />}
                {paymentState === 'processing' && <p className="ml-2">Processing...</p>}
            </div>
            {paymentError && <p className="text-red-500 text-sm mt-2 text-center">{paymentError}</p>}
        </form>
    );
};

export default PaymentForm;