import { useState, useEffect } from 'react';

import {
  Card,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import HandleFormErrorMessages from '@/components/HandleFormErrorMessages';
import { useSendPasswordResetLinkEmailMutation } from '@/redux/features/userAuthSlice';


const ForgotPasswordForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '' });
  const [formErrors, setFormErrors] = useState(null);
  const [message, setMessage] = useState(null);
  const handleChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };
  const [sendPasswordResetLinkEmail] = useSendPasswordResetLinkEmailMutation();

  const handleRequestPasswordReset = () => {
    sendPasswordResetLinkEmail(formData)
      .unwrap()
      .then((response)=> {
        // setMessage(response.message)
        toast({
          title: 'Success!',
          description: response.message,
        });
      })
      .catch((error)=> {
        console.log(error)
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: error.data.message,
        });
      })
  }

  return (
    <>
      <div className='flex items-center flex-col h-screen bg-authBg bg-cover bg-no-repeat bg-center'>
        <img src="/whizDealsWatermark2.png"  onClick={() => navigate('/')} className="h-32 mt-5"/>
        <h3 className='text-3xl pb-5 text-grey300'>Forgot your password?</h3>
        <Card className='lg:w-[450px] h-max border-none shadow-none bg-transparent'>
          <CardDescription className='text-center'>
            Please enter the email you used to sign in
          </CardDescription>
          <CardContent>
            <form>
              <div className='grid w-full items-center gap-4'>
                <div className='flex flex-col space-y-1.5'>
                  <Label htmlFor='name' className='text-grey300'>
                    Email
                  </Label>
                  <Input
                    id='email'
                    type='email'
                    className='bg-white border-grey200'
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                  />
                  <HandleFormErrorMessages
                    errors={formErrors}
                    field={'email'}
                    formData={formData}
                  />
                  {console.log(formErrors)}
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className='block'>
            <Button className='w-full font-semibold' onClick={handleRequestPasswordReset}>
              Request password reset
            </Button>
            <p
              className='pt-2  text-center text-burgundy500 underline cursor-pointer'
              onClick={() => navigate('/login')}
            >
              Go back to login
            </p>
            {message ? <p>{message}</p> : null}
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default ForgotPasswordForm;
