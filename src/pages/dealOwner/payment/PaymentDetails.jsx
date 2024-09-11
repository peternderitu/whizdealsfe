import { useState, useEffect, useRef } from 'react';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from './CheckoutForm';
import { useCreateSetupIntentMutation } from '@/redux/features/paymentSlice';

const stripePromise = loadStripe("pk_test_51P6CU9AuvBrM62Ea9uDi2l5sX1IRAH3cpEcNpcpJU8kZObIaMb2hPhzfcVmFoqKNILRcR71VaIrIG5dxOracWHcn00cjbzZ3ej");


function useOnceCall(cb, condition = true) {
  const isCalledRef = useRef(false);

  useEffect(() => {
    if (condition && !isCalledRef.current) {
      isCalledRef.current = true;
      cb();
    }
  }, [cb, condition]);
}

const PaymentDetails = () => {
  const [clientSecret, setClientSecret] = useState("");
  const [createSetupIntent] = useCreateSetupIntentMutation();
  console.log(clientSecret)

  useOnceCall(() => {
    // This is better than the useEffect as it only runs once as opposed to the useEffect which runs twice by default
    createSetupIntent()
      .unwrap()
      .then((response)=> setClientSecret(response.client_secret))
  })
  
  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="py-5">
      <h1 className="text-center">Payment Details</h1>

      <div className="flex justify-center">
        {clientSecret && (
          <Elements options={options} stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        )}
      </div>

      </div>
  )
}

export default PaymentDetails