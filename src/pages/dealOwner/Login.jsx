import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { useLoginDealOwnerMutation } from '@/redux/features/dealOwnerAuthSlice';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import HandleFormErrorMessages from '@/components/HandleFormErrorMessages';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [err, setErr] = useState(null);
  const [errors, setErrors] = useState(null);
  const [loginDealOwner, { data, error }] = useLoginDealOwnerMutation();
  console.log(data);

  const handleLogin = () => {
    loginDealOwner(formData)
      .unwrap()
      .then((payload) => console.log('fulfilled', payload))
      .catch((error) => console.log('rejected', error));
  };

  const handleChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  useEffect(() => {
    if (error) {
      console.log(error.data);
      setErrors(error.data.errors);
    }
  }, [error]);

  useEffect(() => {
    if (data && data.message === 'Deal owner logged in') {
      Cookies.set('doToken', data.token);
      window.open('/do', '_self');
    } else if (data && data.message !== 'Deal owner logged in') {
      setErr(true);
    }
  }, [data, navigate]);

  return (
    <>
      <div className='flex items-center flex-col h-screen bg-authBg bg-cover bg-no-repeat bg-center'>
        <a
          href='/'
          className={`transition duration-300 ease-in-out text-5xl font-medium block mt-8  text-burgundy500 font-playfair`}
        >
          <img src='/whizDealsWatermark2.png' className='h-32' />
        </a>
        <h3 className='text-3xl text-grey300'>Sign in</h3>
        <p className='text-xl pb-5 text-grey300'>& post student deals!</p>
        <Card className='lg:w-[450px] h-max border-none shadow-none bg-transparent'>
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
                    required
                    className='bg-white border-grey200'
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                  />
                  <HandleFormErrorMessages
                    errors={errors}
                    field={'email'}
                    formData={formData}
                  />
                </div>
                <div className='flex flex-col space-y-1.5'>
                  <Label htmlFor='password' className='text-grey300'>
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
                    errors={errors}
                    field={'password'}
                    formData={formData}
                  />
                  {err ? (
                    <p className='text-sm text-burgundy300 '>
                      Credentials don&apos;t match
                    </p>
                  ) : null}
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className='block'>
            <Button className='w-full font-semibold' onClick={handleLogin}>
              Login
            </Button>
            <p className='text-grey300 pt-2  text-center'>
              Don&apos;t have an account?{' '}
              <span
                className='text-burgundy500 underline cursor-pointer'
                onClick={() => navigate('/do/register')}
              >
                Register
              </span>
            </p>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default Login;
