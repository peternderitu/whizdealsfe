import { useState, useEffect, useRef } from 'react';
import SideNav from './SideNav';
import { Button } from '@/components/ui/button';
import {
  // useMakePaymentMutation,
  // useChargeSavedCardMutation,
  useRetrieveSavedCardsMutation,
  useGetAllPaymentsQuery
} from '@/redux/features/paymentSlice';
import { useNavigate } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

// very important - don't touch
function useOnceCall(cb, condition = true) {
  const isCalledRef = useRef(false);

  useEffect(() => {
    if (condition && !isCalledRef.current) {
      isCalledRef.current = true;
      cb();
    }
  }, [cb, condition]);
}

const PaymentsTable = ({ payments }) => {
  const options = { day: '2-digit', month: 'short', year: 'numeric' };

    return (
      <Table>
        <TableCaption>A list of your recent payments.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Payment</TableHead>
            <TableHead>Deal</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {payments.data.map((payment) => (
            <TableRow key={payment.id}>
              <TableCell className="font-medium">{payment.id}</TableCell>
              <TableCell>{payment.deal.title}</TableCell>
              <TableCell>{payment.quantity}</TableCell>
              <TableCell>{new Intl.DateTimeFormat('en-US', options).format(payment.created_a)}</TableCell>
              <TableCell className="text-right">${payment.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={4}>Total</TableCell>
            <TableCell className="text-right">${payments.data.reduce((a,b) => a + b.amount, 0)} </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    )
  
}

const Payments = () => {
  const navigate = useNavigate();
  const [cards, setCards] = useState([]);
  // const [makePayment] = useMakePaymentMutation();
  // const [chargeSavedCard] = useChargeSavedCardMutation();
  const [retrieveSavedCards] = useRetrieveSavedCardsMutation();
  const { data: payments, isLoading } = useGetAllPaymentsQuery();
  console.log(payments)
  // const handleMakePayment = () => {
  //   makePayment({ amount: 100 })
  //     .unwrap()
  //     .then((response) => {
  //       console.log(response);
  //       window.open(response.url, '_self');
  //     });
  // };
  // const handleChargeSavedCard = () => {
  //   chargeSavedCard()
  //     .unwrap()
  //     .then((response) => {
  //       console.log(response);
  //     });
  // };

  useEffect(() => {
    retrieveSavedCards()
      .unwrap()
      .then((response) => setCards(response.cards.data));
  }, []);

  useOnceCall(() => {
    console.log('called');
  })

  if(isLoading) { return <p>Loading...</p> }
  
  return (
    <SideNav>
      <h1 className='text-3xl text-burgundy500'>Payments</h1>
      <div className='mt-3'>
        {cards.length > 0 ? (
          <h1 className='text-lg text-grey400 mb-3'>Saved Cards</h1>
        ) : null}
        {cards.length > 0 ? (
          cards.map((card, idx) => {
            return (
              // p-16
              <div
                key={idx}
                className='border-2 border-grey100 rounded-lg  w-80 flex items-end h-36 p-5 justify-around text-lg text-grey300 mb-3'
              >
                <p>****</p>
                <p>****</p>
                <p>****</p>
                <p>{card.card.last4}</p>
              </div>
            );
          })
        ) : (
          <Button onClick={() => navigate('/do/payment-details')}>
            Add payment method
          </Button>
        )}
        {/* {
          payments.data.map((payment)=> console.log(payment))
        } */}
        <PaymentsTable payments={payments} />
      </div>

      

      {/* <div className='relative overflow-hidden rounded-lg bg-opacity-50 w-80'>
        <img
          className='absolute inset-0 w-full h-full object-cover filter blur-lg brightness-50'
          src='/beauty.png'
          alt='Background Image'
        />

        <div className='relative p-6 bg-white bg-opacity-75 rounded-lg'>
          <h2 className='text-xl font-semibold'></h2>
          <div
                className='flex items-end justify-around text-lg text-grey300 mb-3 h-20'
              >
                <p>****</p>
                <p>****</p>
                <p>****</p>
                <p>4242</p>
              </div>
        </div>
      </div> */}
    </SideNav>
  );
};

export default Payments;
