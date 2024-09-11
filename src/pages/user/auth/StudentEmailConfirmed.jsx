import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const StudentEmailConfirmed = () => {
  const navigate = useNavigate();
  
  return (
    <>
      <div className='flex items-center flex-col h-screen bg-authBg bg-cover bg-no-repeat bg-center bg-fixed'>
        <a
          href='/'
          className={`transition duration-300 ease-in-out text-5xl font-medium block mt-8  text-burgundy500 font-playfair mb-3`}
        >
          <img src='/whizDealsWatermark2.png' className='h-32' />
        </a>
        <Card className='lg:w-[450px] h-max p-3'>
          <CardContent>
            <h3 className='text-center text-3xl pb-5 text-grey300'>
              Your student status has been verified!
            </h3>
            {/* add a pic here */}
            <img src='celebrate.svg' className='mx-auto h-64 mb-3' />
            <p className='text-center mb-3'>
              Your account is now set up and ready to use.
            </p>
            <Button className='w-full' onClick={() => navigate('/deals')}>
              Continue
            </Button>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default StudentEmailConfirmed;
