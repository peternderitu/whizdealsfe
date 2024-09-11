import { useState, useRef, useEffect } from 'react';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  useVerifyStudentEmailMutation,
  useResendOTPCodeMutation,
} from '@/redux/features/userAuthSlice';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useNavigate, useParams } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';

const ConfirmStudentEmail = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [err, setErr] = useState(null);
  console.log(err);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputRefs = [
    useRef(),
    useRef(),
    useRef(),
    useRef(),
    useRef(),
    useRef(),
  ];
  const [verifyStudentEmail, { data }] = useVerifyStudentEmailMutation();
  console.log(data);
  const [resendOTPCode, { data: resendOTPResponse }] =
    useResendOTPCodeMutation();
  console.log(resendOTPResponse);

  const handleChange = (index, value) => {
    // Handle digit input
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move focus to the next input if a digit is entered
    if (value !== '' && index < 5) {
      inputRefs[index + 1].current.focus();
    }
  };

  const handleKeyDown = (index, event) => {
    // Move focus to the previous input on backspace if the current input is empty
    if (event.key === 'Backspace' && index > 0 && otp[index] === '') {
      inputRefs[index - 1].current.focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let fullOtp = otp[0] + otp[1] + otp[2] + otp[3] + otp[4] + otp[5];
    console.log(fullOtp);
    console.log(id);
    // call an api and pass otp as data then set verified as true
    verifyStudentEmail({ id, otpCode: fullOtp })
      .unwrap()
      .then((response) => {
        toast({
          title: 'Success!',
          description: 'Your student email has been verified',
        });
      })
      .catch(()=> {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "A problem occured. Please try again later.",
        });
      })
  };

  const resendOTP = () => {
    resendOTPCode({ id })
      .unwrap()
      .then(()=> {
        toast({
          title: 'OTP resent!',
          description: 'Another OTP has been sent to your email.',
        });
      })
      .catch(()=> {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "A problem occured. Please try again later.",
        });
      })
  }

  useEffect(() => {
    if (data && data.message === 'Verified student email') {
      navigate('/login');
    } else if (data && data.message !== 'Verified student email') {
      setErr(true);
    }
  }, [data, navigate]);

  return (
    <>
      <div className='flex items-center flex-col h-screen bg-authBg bg-cover bg-no-repeat bg-center bg-fixed'>
        <a
          href='/'
          className={`transition duration-300 ease-in-out text-5xl font-medium block mt-8  text-burgundy500 font-playfair`}
        >
          <img src='/whizDealsWatermark2.png' className='h-32' />
        </a>
        <h3 className='text-3xl pb-5 text-grey300'>Confirm student email</h3>
        <p>Enter OTP sent to your student email</p>
        <Card className='lg:w-[450px] h-max border-none shadow-none bg-transparent'>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className='flex space-x-1.5 my-8'>
                {otp.map((digit, index) => (
                  <Input
                    key={index}
                    ref={inputRefs[index]}
                    type='text'
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    maxLength='1'
                    className={`border-b-2 border-t-0 border-x-0 border-b-grey200 rounded-none focus-visible:outline-none focus:outline-none ${
                      err ? 'border-b-burgundy300' : null
                    }`}
                  />
                ))}
              </div>
              <Button className='w-full font-semibold'>Submit</Button>
            </form>

            <button
              className='w-full mt-3 text-burgundy400 underline cursor-pointer'
              onClick={resendOTP}
            >
              Resend OTP code
            </button>
            {/* <Accordion type='single' collapsible className='w-full'>
              <AccordionItem value='item-1'>
                <AccordionTrigger>Having trouble getting your OTP?</AccordionTrigger>
                <AccordionContent>
                  Check the below things:
                  <ul className='list-disc list-inside mb-3'>
                    <li>Click <span>resend OTP code</span> to have it resent</li>
                    <li>Ensure you've checked the spam folder as well as other folders in your email</li>
                    <li>Ensure you've written your student email correctly</li>
                  </ul>
                  <Button variant="secondary" className="mx-auto block">Report issue</Button>
                </AccordionContent>
              </AccordionItem>
            </Accordion> */}
            <div className='text-center'>
              <p className='font-semibold my-3'>
                Still didn&apos;t get the email?
              </p>
              <p className='w-[30ch] mx-auto mb-3'>
                If your email doesn&apos;t arrive within 1 minute your school could
                be blocking it.
              </p>
              <button className='border-2 border-burgundy300 w-full p-2 rounded-md text-burgundy500 hover:font-semibold hover:border-burgundy500 transition'
              onClick={()=> navigate(`/email-us-to-verify/${id}`)}>
                Email us to verify instead
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default ConfirmStudentEmail;
