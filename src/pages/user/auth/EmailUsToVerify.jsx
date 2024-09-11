import { useState, useRef } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardContent } from '@/components/ui/card';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import {
  useVerifyInboundEmailMutation,
  useGetStudentEmailbyIdQuery,
} from '@/redux/features/userAuthSlice';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '@/components/Loader';

const EmailUsToVerify = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const navigate = useNavigate();
  const timeoutId = useRef(null);
  const intervalId = useRef(null);
  const [status, setStatus] = useState(false);

  const [verifyInboundEmail] = useVerifyInboundEmailMutation();
  const { data, isLoading } = useGetStudentEmailbyIdQuery({ id });

  const handleCopyToClipboard = (textToCopy) => {
    // Create a temporary textarea element
    const textarea = document.createElement('textarea');

    // Set the value of the textarea to the text you want to copy
    textarea.value = textToCopy;

    // Make the textarea invisible
    textarea.style.position = 'absolute';
    textarea.style.left = '-9999px';

    // Append the textarea to the document
    document.body.appendChild(textarea);

    // Select and copy the text from the textarea
    textarea.select();
    document.execCommand('copy');

    // Remove the textarea from the document
    document.body.removeChild(textarea);

    // Optionally, you can provide user feedback
    // alert('Discount code copied to clipboard!');
    toast({
      title: 'Copied!',
      description: 'Email successfully copied to your clipboard',
    });
    startVerifying();
  };

  const verifyStudent = async () => {
    try {
      //   const response = await axios.get('your-api-endpoint');
      //   setData(response.data);
      console.log('verifying...');
      verifyInboundEmail({ id })
        .unwrap()
        .then((response) => {
          if (response.message === 'Student verified') {
            stopVerifying();
            navigate('/student-email-confirmed');
          } else {
            console.log(response.message);
          }
        })
        .catch((err) => console.log(err));

      // alert('verifying')
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const stopVerifying = () => {
    setStatus(false);
    if (intervalId.current) {
      clearInterval(intervalId.current);
      intervalId.current = null;
    }
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
      timeoutId.current = null;
    }
  };

  const startVerifying = () => {
    // we need a loader here as well
    setTimeout(() => {
      setStatus('verifying');
    }, 5000);
    if (!intervalId.current) {
      verifyStudent(); // Fetch immediately on button click
      intervalId.current = setInterval(verifyStudent, 5000); // Fetch every 5 seconds
      timeoutId.current = setTimeout(() => {
        stopVerifying();
        toast({
          variant: 'destructive',
          title: 'Uh oh! Something went wrong.',
          description:
            'We did not receive a blank email from ' +
            data.student.studentEmail,
        });
      }, 60000); // Stop fetching after 60 seconds
    }
  };

  if (isLoading) <Loader className='text-burgundy500' />;
  return (
    <div>
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
                Email us to Verify
              </h3>
              <ol className='list-decimal list-inside mb-3'>
                <li>
                  Send us a blank email from{' '}
                  <span className='font-semibold'>
                    {data ? data.student.studentEmail : null}
                  </span>
                </li>
                <li>
                  We&apos;ll verify you in a couple of seconds and this page
                  will refresh
                </li>
              </ol>
              <p>Send to this email address</p>
              <div className='rounded-md bg-burgundy100 text-sm mt-3 flex justify-between mb-3'>
                <span className='p-3'>verify@whizdeals.ca</span>
                <div
                  className='bg-burgundy300 p-3 text-white cursor-pointer rounded-r-md'
                  onClick={() => handleCopyToClipboard('verify@whizdeals.ca')}
                >
                  <ContentCopyIcon />
                </div>
              </div>
              {/* <button onClick={stopVerifying}>Stop verifying</button> */}
              <div className='flex justify-center '>
                {status ? (
                  <div className="flex flex-col justify-center items-center">
                    <Loader className='text-burgundy500' />
                    <p className="text-center text-sm text-grey300 p-3">
                      Please wait a few moments as we try to verify your student
                      email
                    </p>
                  </div>
                ) : null}
              </div>
              {/* <p>Verifying, pl</p> */}
            </CardContent>
          </Card>
        </div>
      </>
    </div>
  );
};

export default EmailUsToVerify;
