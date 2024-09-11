import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { useLoginAdminMutation } from '@/redux/features/adminAuthSlice';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import HandleFormErrorMessages from '@/components/HandleFormErrorMessages';


const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({email: '', password: ''});
  const [formErrors, setFormErrors] = useState(null);
  const [loginAdmin, {data, error}] = useLoginAdminMutation();
  if(error){
    console.log(error)

  }

  const handleLogin = () => {
    loginAdmin(formData)
      .unwrap()
      .then((payload) => console.log(payload))
      .catch((error) => setFormErrors(error.data.errors));
  }
  const handleChange = (key, value) => {
    setFormData({...formData, [key]: value})
  }
  useEffect(()=> {
    if(data && data.message === 'Admin logged in') {
      Cookies.set('adminToken', data.token)
      window.open('/admin/dashboard', '_self');
    }
  }, [data, navigate])
  return (
    <>
      <div className='flex items-center flex-col h-screen bg-authBg bg-cover bg-no-repeat bg-center'>
       
        <a
          href='/'
          className={`transition duration-300 ease-in-out text-5xl font-medium block mt-8  text-burgundy500 font-playfair`}
        >
          <img src='/whizDealsWatermark2.png' className='h-32' />
        </a>
        <h3 className='text-3xl pb-5 text-grey300'>Admin Sign in</h3>
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
                    className='bg-white border-grey200'
                    value={formData.email}
                    onChange={(e)=> handleChange('email', e.target.value)}
                  />
                  <HandleFormErrorMessages
                    errors={formErrors}
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
                    onChange={(e)=> handleChange('password', e.target.value)}
                  />
                  <HandleFormErrorMessages
                    errors={formErrors}
                    field={'password'}
                    formData={formData}
                  />
                  {data && data.message !== 'Admin logged in' ? (
                    <p className='text-sm text-burgundy300 '>
                      Credentials don&apos;t match
                    </p>
                  ) : null}
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className='block'>
            <Button className='w-full font-semibold' onClick={handleLogin}>Login</Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default Login;