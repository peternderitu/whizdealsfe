import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { useResetPasswordMutation } from '@/redux/features/userAuthSlice';
import HandleFormErrorMessages from '@/components/HandleFormErrorMessages';
import { useToast } from '@/components/ui/use-toast';

const ResetPassword = () => {
  const { toast } = useToast();
  const { token } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    password: '',
    repeatPassword: '',
  });
  const [formErrors, setFormErrors] = useState(null);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const handleChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };
  const [resetPassword] = useResetPasswordMutation();

  const handleResetPassword = () => {
    if (formData.password !== formData.repeatPassword) {
      setError('Password must match');
      console.log('password not matching');
    } else {
      resetPassword({ password: formData.password, token })
        .unwrap()
        .then((response) => {
          toast({
            title: 'Success!',
            description: response.message,
          });
          // setMessage(response.message)
          setTimeout(() => {
            navigate('/login');
          }, 3000);
        })
        .catch((error) => {
          console.log(error)
          toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: error.data.message,
          });
        });
    }
  };

  useEffect(() => {
    if (formData.password !== formData.repeatPassword) {
      setFormErrors({ ...formErrors, repeatPassword: ['Password must match'] });
    }
  }, [formData.password]);

  return (
    <>
      <div className='flex items-center flex-col h-screen bg-authBg bg-cover bg-no-repeat bg-center'>
        <img
          src='/whizDealsWatermark2.png'
          onClick={() => navigate('/')}
          className='h-44 mt-5'
        />
        <h3 className='text-3xl pb-5 text-grey300'>Reset Password</h3>
        <Card className='lg:w-[450px] h-max border-none shadow-none bg-transparent'>
          <CardDescription className='text-center'>
            {/* Please enter the email you used to sign in */}
          </CardDescription>
          <CardContent>
            <form>
              <div className='grid w-full items-center gap-4'>
                <div className='flex flex-col space-y-1.5'>
                  <Label htmlFor='name' className='text-grey300'>
                    Password
                  </Label>
                  <Input
                    id='password'
                    type='password'
                    className='bg-white border-grey200'
                    value={formData.password}
                    onChange={(e) => handleChange('password', e.target.value)}
                  />
                  <HandleFormErrorMessages
                    errors={formErrors}
                    field={'password'}
                    formData={formData}
                  />
                </div>
                <div className='flex flex-col space-y-1.5'>
                  <Label htmlFor='name' className='text-grey300'>
                    Repeat Password
                  </Label>
                  <Input
                    id='repeatPassword'
                    type='password'
                    className='bg-white border-grey200'
                    value={formData.repeatPassword}
                    onChange={(e) =>
                      handleChange('repeatPassword', e.target.value)
                    }
                  />
                  <HandleFormErrorMessages
                    errors={formErrors}
                    field={'repeatPassword'}
                    formData={formData}
                  />
                  {error ? (
                    <p className='text-red-500 text-sm'>{error}</p>
                  ) : null}
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className='block'>
            <Button
              className='w-full font-semibold'
              onClick={handleResetPassword}
            >
              Reset Password
            </Button>
            <p
              className='pt-2  text-center text-burgundy500 underline cursor-pointer'
              onClick={() => navigate('/login')}
            >
              Go back to login
            </p>
            {message ? <p>{message} Redirecting to login page...</p> : null}
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default ResetPassword;
