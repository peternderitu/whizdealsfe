import { useState, useEffect } from 'react';
import {
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import Loader from '@/components/Loader';

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  // const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingForm, setIsLoadingForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return null;
    }

    setIsLoading(true);
    const { error } = await stripe.confirmSetup({
      //`Elements` instance that was used to create the Payment Element
      elements,
      confirmParams: {
        return_url: 'http://localhost:5173/do/payment/status',
      },
    });

    if (error) {
      // This point will only be reached if there is an immediate error when
      // confirming the payment. Show error to your customer (for example, payment
      // details incomplete)
      setErrorMessage(error.message);
    } else {
      setIsLoading(false);
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLoadingForm(false);
    }, 3000);
  }, []);

  const paymentElementOptions = {
    layout: 'tabs',
  };

  return (
    <form id='payment-form' onSubmit={handleSubmit} className='w-1/3'>
      <PaymentElement id='payment-element' options={paymentElementOptions} onChange={()=>setIsLoading(false)} />
      {!stripe || !elements || isLoadingForm ? (
        <div className='h-12 w-full bg-grey100 rounded-md animate-pulse mt-3'></div>
      ) : (
        <button
          disabled={isLoading || !stripe || !elements}
          id='submit'
          className='bg-burgundy300 w-full text-white font-semibold p-3 rounded-md my-3'
        >
          <span id='button-text'>
            {isLoading ? (
              <div className="flex justify-center"><Loader/></div>
            ) : (
              'Save Card'
            )}
          </span>
        </button>
      )}

      {/* Show any error or success messages */}
      {errorMessage && <div id='payment-message'>{errorMessage}</div>}
    </form>
  );
}
