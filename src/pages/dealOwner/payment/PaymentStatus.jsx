import { useState, useEffect } from 'react';
import SideNav from '../SideNav';
import Loader from '@/components/Loader';
import { loadStripe } from '@stripe/stripe-js';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import InfoIcon from '@mui/icons-material/Info';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { useStripe, Elements } from '@stripe/react-stripe-js';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { useCardSavedMutation } from '@/redux/features/paymentSlice';

const stripePromise = loadStripe(
  'pk_test_51P6CU9AuvBrM62Ea9uDi2l5sX1IRAH3cpEcNpcpJU8kZObIaMb2hPhzfcVmFoqKNILRcR71VaIrIG5dxOracWHcn00cjbzZ3ej'
);

const Success = ({ message, navigate }) => {
  return (
    <div className='flex flex-col items-center border border-green-200 rounded-lg p-5 bg-green-50'>
      <DoneAllIcon
        className='text-green-500 border rounded-full border-green-500 mb-3'
        style={{ fontSize: '150px' }}
      />
      <div className='flex flex-col items-center'>
        {/* <p>Payment received successfully</p> */}
        <p>{message}</p>
        <button
          className='text-green-500 underline font-semibold'
          onClick={() => navigate('/do')}
        >
          &lt;- Go home
        </button>
      </div>
    </div>
  );
};

const Processing = ({ message }) => {
  return (
    <div className='flex flex-col items-center border border-green-200 rounded-lg p-5 bg-green-50'>
      <InfoIcon
        className='text-blue-500 border rounded-full border-blue-500 mb-3'
        style={{ fontSize: '150px' }}
      />
      <div className='flex items-center'>
        <Loader />
        <p> {message}</p>
      </div>
    </div>
  );
};

const Failed = ({ message, navigate }) => {
  return (
    <div className='flex flex-col items-center border border-green-200 rounded-lg p-5 bg-green-50'>
      <div className='border-2 flex flex-col items-center text-grey300 rounded-lg'>
        <ErrorOutlineIcon style={{ fontSize: '150px' }} />
        <div>
          <p className='font-semibold text-center mb-3'>{message}</p>
          <Button
            className='w-40 mb-3'
            onClick={() => navigate('/do/payments')}
          >
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
};

const Body = () => {
  const navigate = useNavigate();
  const stripe = useStripe();
  const [message, setMessage] = useState(null);
  const [cardSaved] = useCardSavedMutation();

  useEffect(() => {
    if (!stripe) {
      return;
    }
    // Retrieve the "setup_intent_client_secret" query parameter appended to
    // your return_url by Stripe.js
    const clientSecret = new URLSearchParams(window.location.search).get(
      'setup_intent_client_secret'
    );

    // Retrieve the SetupIntent
    stripe.retrieveSetupIntent(clientSecret).then(({ setupIntent }) => {
      // Inspect the SetupIntent `status` to indicate the status of the payment
      // to your customer.
      //
      // Some payment methods will [immediately succeed or fail][0] upon
      // confirmation, while others will first enter a `processing` state.
      //
      // [0]: https://stripe.com/docs/payments/payment-methods#payment-notification
      console.log(setupIntent)
      switch (setupIntent.status) {
        case 'succeeded':
          setMessage('Success! Your payment method has been saved.');
          cardSaved({payment_method: setupIntent.payment_method}).unwrap().then((response)=>console.log(response));
          break;

        case 'processing':
          setMessage(
            "Processing payment details. We'll update you when processing is complete."
          );
          break;

        case 'requires_payment_method':
          // Redirect your user back to your payment page to attempt collecting
          // payment again
          setMessage(
            'Failed to process payment details. Please try another payment method.'
          );
          break;
      }
    });
  }, [stripe]);

  return (
    <SideNav>
      {message === 'Success! Your payment method has been saved.' ? (
        <Success message={message} navigate={navigate} />
      ) : message ===
        "Processing payment details. We'll update you when processing is complete." ? (
        <Processing message={message}/>
      ) : message ===
        'Failed to process payment details. Please try another payment method.' ? (
        <Failed message={message} navigate={navigate} />
      ) : null}
    </SideNav>
  );
};

const PaymentStatus = () => {
  return (
    <Elements stripe={stripePromise}>
      <Body />
    </Elements>
  );
};

export default PaymentStatus;
