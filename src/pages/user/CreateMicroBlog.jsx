import { useState } from 'react';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselNextForm,
  CarouselPreviousForm,
} from '@/components/ui/carousel';

import Nav from './Nav';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useSpring, animated } from 'react-spring';
import { Progress } from '@/components/ui/progress';
import { Calendar } from '@/components/ui/calendar';
import { useToast } from '@/components/ui/use-toast';
import { Calendar as CalendarIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useGetAllCategoriesQuery } from '@/redux/features/categorySlice';
import HandleFormErrorMessages from '@/components/HandleFormErrorMessages';
import { useCreateMicroBlogMutation } from '@/redux/features/microBlogSlice';

// this still has the optional coupon code logic which may be returned in a future version.
// import { Checkbox } from '@/components/ui/checkbox';
const BlogFormCarousel = ({ handleNextStep, handlePreviousStep }) => {
  const navigate = useNavigate();
  const [addCouponCode, setAddCouponCode] = useState(false);
  const [formData, setFormData] = useState({
    user_id: '',
    title: '',
    description: '',
    start_date: '',
    end_date: '',
    discount_url: 'https://',
    discount_code: '',
    original_price: '',
    discounted_price: '',
    category_id: '',
    image: '',
  });
  const [formErrors, setFormErrors] = useState(null);

  const [createMicroBlog] = useCreateMicroBlogMutation();
  const { data: categories } = useGetAllCategoriesQuery();

  const handleChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formDataWF = new FormData();
    formDataWF.append('title', formData.title);
    formDataWF.append('description', formData.description);
    formDataWF.append('start_date', formData.start_date);
    formDataWF.append('end_date', formData.end_date);
    formDataWF.append('discount_url', formData.discount_url);
    formDataWF.append('discount_code', formData.discount_code);
    formDataWF.append('original_price', formData.original_price);
    formDataWF.append('discounted_price', formData.discounted_price);
    formDataWF.append('category_id', formData.category_id);
    formDataWF.append('image', formData.image);
    createMicroBlog(formDataWF)
      .unwrap()
      .then((response) => {
        if (response.message === 'Created micro blog successfully') {
          navigate('/deals');
        }
      })
      .catch((error) => setFormErrors(error.data.errors));
  };

  return (
    <Carousel className='w-full max-w-2xl mx-auto mt-5'>
      <form onSubmit={handleSubmit}>
        <CarouselContent>
          {/* title and description */}
          <CarouselItem>
            <div className='p-1'>
              <Card>
                <CardContent className='p-6'>
                  <div className='mb-3'>
                    <Label className='text-grey300'>Deal title</Label>
                    <Input
                      onChange={(e) => handleChange('title', e.target.value)}
                      type='text'
                      placeholder='30% off on Zara dress!'
                      className='rounded-none border-t-0 border-x-0 border-b-2 shadow-none border-grey100 focus-visible:ring-0 focus-visible:border-grey350'
                    />
                    <HandleFormErrorMessages
                      errors={formErrors}
                      field={'title'}
                      formData={formData}
                    />
                  </div>
                  <div className='mb-3'>
                    <Label className='text-grey300'>Description</Label>

                    <ReactQuill
                      theme='snow'
                      onChange={(e) => handleChange('description', e)}
                      value={formData.description}
                      bounds={'.app'}
                      placeholder='Write something'
                    />
                    <HandleFormErrorMessages
                      errors={formErrors}
                      field={'description'}
                      formData={formData}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>

          {/* start date, end date and image*/}
          <CarouselItem>
            <div className='p-1'>
              <Card>
                <CardContent className='p-6'>
                  <div className='mb-3 flex gap-4'>
                    <div className='w-full'>
                      <Label className='text-grey300'>Start date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={'outline'}
                            className={cn(
                              'w-full justify-start text-left font-normal border-2 border-grey100',
                              !formData.start_date && 'text-muted-foreground'
                            )}
                          >
                            <CalendarIcon className='mr-2 h-4 w-4' />
                            {formData.start_date ? (
                              format(formData.start_date, 'PPP')
                            ) : (
                              <span>Pick a date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className='w-auto p-0'>
                          <Calendar
                            mode='single'
                            selected={formData.start_date}
                            onSelect={(e) =>
                              handleChange(
                                'start_date',
                                `${e.getFullYear()}-${
                                  e.getMonth() + 1
                                }-${e.getDate()}`
                              )
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div className='w-full'>
                      <Label className='text-grey300'>End date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={'outline'}
                            className={cn(
                              'w-full justify-start text-left font-normal border-2 border-grey100',
                              !formData.end_date && 'text-muted-foreground'
                            )}
                          >
                            <CalendarIcon className='mr-2 h-4 w-4' />
                            {formData.end_date ? (
                              format(formData.end_date, 'PPP')
                            ) : (
                              <span>Pick a date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className='w-auto p-0'>
                          <Calendar
                            mode='single'
                            selected={formData.end_date}
                            onSelect={(e) =>
                              handleChange(
                                'end_date',
                                `${e.getFullYear()}-${
                                  e.getMonth() + 1
                                }-${e.getDate()}`
                              )
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>

                  <div className='mb-3'>
                    <Label className='text-grey300'>Image</Label>
                    <Input
                      onChange={(e) => handleChange('image', e.target.files[0])}
                      type='file'
                      className='border-2 border-grey100 focus-visible:ring-0 focus-visible:border-grey350'
                    />
                    <HandleFormErrorMessages
                      errors={formErrors}
                      field={'image'}
                      formData={formData}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>

          {/* original price and discounted price */}
          <CarouselItem>
            <div className='p-1'>
              <Card>
                <CardContent className='p-6'>
                  <div className='mb-3'>
                    <Label className='text-grey300'>Original price</Label>
                    <Input
                      onChange={(e) =>
                        handleChange('original_price', e.target.value)
                      }
                      type='number'
                      placeholder='1000'
                      className='border-2 border-grey100 focus-visible:ring-0 focus-visible:border-grey350'
                    />
                    <HandleFormErrorMessages
                      errors={formErrors}
                      field={'original_price'}
                      formData={formData}
                    />
                  </div>
                  <div className='mb-3'>
                    <Label className='text-grey300'>Sale price</Label>
                    <Input
                      onChange={(e) =>
                        handleChange('discounted_price', e.target.value)
                      }
                      type='number'
                      placeholder='700'
                      className='border-2 border-grey100 focus-visible:ring-0 focus-visible:border-grey350'
                    />
                    <HandleFormErrorMessages
                      errors={formErrors}
                      field={'discounted_price'}
                      formData={formData}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>

          {/* category */}
          <CarouselItem>
            <div className='p-1'>
              <Card>
                <CardContent className='p-6'>
                  <div className='mb-3'>
                    <Label className='text-grey300'>Category</Label>
                    <select
                      className='block w-full mt-1 p-2 rounded-lg bg-white border-2 border-grey100 focus-visible:ring-0 focus-visible:border-grey350'
                      onChange={(e) =>
                        handleChange('category_id', e.target.value)
                      }
                    >
                      <option disabled selected>
                        Select category
                      </option>
                      {categories.data.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.category_name}
                        </option>
                      ))}
                      <option value=''>Other</option>
                    </select>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
          {/* { console.log(formData) } */}

          {/* discount url and optional coupon code*/}
          <CarouselItem>
            <div className='p-1'>
              <Card>
                <CardContent className='p-6'>
                  <div className='mb-3'>
                    <Label className='text-grey300'>Product url</Label>
                    <p className='text-xs text-grey200'>
                      You can add your affiliate link here
                    </p>
                    <p className='text-xs text-grey200 mb-1'>
                      Ensure your link starts with https://
                    </p>
                    <Input
                      value={formData.discount_url}
                      onChange={(e) =>
                        handleChange('discount_url', e.target.value)
                      }
                      type='text'
                      placeholder='Link should start with https://'
                      className='border-2 border-grey100 focus-visible:ring-0 focus-visible:border-grey350'
                    />
                    <HandleFormErrorMessages
                      errors={formErrors}
                      field={'discount_url'}
                      formData={formData}
                    />
                  </div>
                  {/* <div className='flex items-center space-x-2 mb-3'>
                    <Checkbox id='terms' 
                      onCheckedChange={setAddCouponCode}
                    />
                    <label
                      htmlFor='terms'
                      className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                    >
                      Add a coupon code
                    </label>
                  </div> */}
                  <div className='mb-3'>
                    {addCouponCode ? (
                      <>
                        <Label className='text-grey300'>Coupon code</Label>
                        <Input
                          value={formData.discount_code}
                          onChange={(e) =>
                            handleChange('discount_code', e.target.value)
                          }
                          type='text'
                          placeholder='ABCDE'
                          className='border-2 border-grey100 focus-visible:ring-0 focus-visible:border-grey350'
                        />
                      </>
                    ) : null}
                  </div>

                  <Button className='w-full mt-3'>Submit</Button>
                  {formErrors ? (
                    <p className='text-red-500 text-sm'>
                      Complete all required details to create post
                    </p>
                  ) : null}
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        </CarouselContent>
      </form>

      <div className='flex justify-between px-3 mt-3 py-5'>
        <span onClick={handlePreviousStep}>
          <CarouselPreviousForm className='border-2 border-autumn300 rounded-md py-1 px-3 w-fit' />
        </span>
        <span onClick={handleNextStep}>
          <CarouselNextForm className='border-2 border-autumn300 rounded-md py-1 px-3 w-fit' />
        </span>
      </div>
    </Carousel>
  );
};

const CreateMicroBlogs = () => {
  const [stepsComplete, setStepsComplete] = useState(0);

  const handleNextStep = () => {
    if (stepsComplete < 5) {
      setStepsComplete(stepsComplete + 1);
    }
  };

  const handlePreviousStep = () => {
    if (stepsComplete > 0) {
      setStepsComplete(stepsComplete - 1);
    }
  };

  return (
    <Nav>
      <div>
        {/* here add image */}
        <div className='bg-createDealImg mb-3 p-7 bg-no-repeat bg-center'>
          <h1 className='mb-3 px-3 text-center text-3xl font-bold text-burgundy500'>
            Share a deal
          </h1>
        </div>
        {/* <img src="/createDeal.png" className="mb-3"/> */}
        <div id='progress' className='relative'>
          <div className='bg-autumn200 h-1' />
          <div
            className={`h-3 w-3 rounded-full border-2 border-autumn200 absolute -top-1 ${
              stepsComplete > 0 ? 'bg-autumn200' : 'bg-white'
            }`}
          />
          <div
            className={`h-3 w-3 rounded-full border-2 border-autumn200 absolute -top-1 left-[10%] ${
              stepsComplete > 1 ? 'bg-autumn200' : 'bg-white'
            }`}
          />
          <div
            className={`h-3 w-3 rounded-full border-2 border-autumn200 absolute -top-1 left-[30%] ${
              stepsComplete > 2 ? 'bg-autumn200' : 'bg-white'
            }`}
          />
          <div
            className={`h-3 w-3 rounded-full border-2 border-autumn200 absolute -top-1 left-[65%] ${
              stepsComplete > 3 ? 'bg-autumn200' : 'bg-white'
            }`}
          />
          <div
            className={`h-3 w-3 rounded-full border-2 border-autumn200 absolute -top-1 right-0 ${
              stepsComplete > 4 ? 'bg-autumn200' : 'bg-white'
            }`}
          />
        </div>

        <BlogFormCarousel
          handleNextStep={handleNextStep}
          handlePreviousStep={handlePreviousStep}
        />

        {/* <div className='flex justify-around py-5'>
          <button
            className='border-2 border-autumn300 rounded-md py-1 px-3'
            onClick={handlePreviousStep}
          >
            Previous
          </button>
          <button
            className='border-2 border-autumn300 rounded-md py-1 px-3'
            onClick={handleNextStep}
          >
            Next
          </button>
        </div> */}
      </div>
    </Nav>
  );
};

const CreateMicroBlog = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    // user_id: '',
    title: '',
    description: '',
    start_date: '',
    end_date: '',
    discount_url: '',
    // discount_code: '',
    original_price: '',
    discounted_price: '',
    category_id: '',
    image: '',
  });

  const [formErrors, setFormErrors] = useState(null);

  const [createMicroBlog] = useCreateMicroBlogMutation();
  const { data: categories, isLoading } = useGetAllCategoriesQuery();

  const handleChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // check if the product url is from amazon
    const amazonPattern = /^https?:\/\/(www\.)?amazon\.[a-z]{2,3}\/?/i;

    if (amazonPattern.test(formData.discount_url)) {
      // valid amazon url inputed
      const formDataWF = new FormData();
      formDataWF.append('title', formData.title);
      formDataWF.append('description', formData.description);
      formDataWF.append('start_date', formData.start_date);
      formDataWF.append('end_date', formData.end_date);
      formDataWF.append('discount_url', formData.discount_url);
      formDataWF.append('discount_code', formData.discount_code);
      formDataWF.append('original_price', formData.original_price);
      formDataWF.append('discounted_price', formData.discounted_price);
      formDataWF.append('category_id', formData.category_id);
      formDataWF.append('image', formData.image);
      createMicroBlog(formDataWF)
        .unwrap()
        .then((response) => {
          if (response.message === 'Created micro blog successfully') {
            navigate('/micro-blogs');
          }
        })
        .catch((error) => setFormErrors(error.data.errors));
    } else {
      // Not an amazon url, notify user
      // alert('This link does not come from Amazon');
      toast({
        variant: "destructive",
        title: "Amazon links only accepted",
        description: "We've noticed that the link you've put under product url does not come from Amazon. Please note that we only allow links from Amazon at the moment.",
      });
    }
  };

  const calculateProgress = () => {
    const totalFields = Object.keys(formData).length;
    const filledFields = Object.values(formData).filter(
      (value) => value !== ''
    ).length;
    return Math.floor((filledFields / totalFields) * 100);
  };
  const progress = calculateProgress();
  const animatedProgress = useSpring({ progress });

  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <Nav>
      <div className='grid grid-cols-2 border rounded-md '>
        <div className='flex justify-center flex-col gap-5 p-3'>
          <div className='flex justify-center'>
            <animated.h1 className='text-6xl font-bold text-green-500'>
              {animatedProgress.progress.to((x) => x.toFixed(0))}
            </animated.h1>
            <h1 className='text-6xl font-bold text-green-500'>%</h1>
          </div>
          <Progress
            value={progress}
            className='bg-green-100'
            indicatorBG='bg-green-500'
          />
        </div>
        <div className='border-l'>
          <h1 className='text-3xl text-center py-5 border-b text-burgundy500 mb-3'>
            Share a Deal
          </h1>
          <form className='p-3' onSubmit={handleSubmit}>
            {/* title */}
            <div className='mb-3'>
              <Label className='text-grey300'>Deal title</Label>
              <Input
                onChange={(e) => handleChange('title', e.target.value)}
                type='text'
                placeholder='30% off on Zara dress!'
                className=' border-grey100 focus-visible:ring-0 focus-visible:border-grey350'
              />
              <HandleFormErrorMessages
                errors={formErrors}
                field={'title'}
                formData={formData}
              />
            </div>

            {/* description */}
            <div className='mb-3'>
              <Label className='text-grey300'>Description</Label>
              <ReactQuill
                theme='snow'
                onChange={(e) => handleChange('description', e)}
                value={formData.description}
                bounds={'.app'}
                placeholder='Write something'
              />
              <HandleFormErrorMessages
                errors={formErrors}
                field={'description'}
                formData={formData}
              />
            </div>

            {/* start date and end date */}
            <div className='mb-3 flex gap-4'>
              <div className='w-full'>
                <Label className='text-grey300'>Start date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={'outline'}
                      className={cn(
                        'w-full justify-start text-left font-normal border-grey100',
                        !formData.start_date && 'text-muted-foreground'
                      )}
                    >
                      <CalendarIcon className='mr-2 h-4 w-4' />
                      {formData.start_date ? (
                        format(formData.start_date, 'PPP')
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className='w-auto p-0'>
                    <Calendar
                      mode='single'
                      selected={formData.start_date}
                      onSelect={(e) =>
                        handleChange(
                          'start_date',
                          `${e.getFullYear()}-${
                            e.getMonth() + 1
                          }-${e.getDate()}`
                        )
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className='w-full'>
                <Label className='text-grey300'>End date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={'outline'}
                      className={cn(
                        'w-full justify-start text-left font-normal  border-grey100',
                        !formData.end_date && 'text-muted-foreground'
                      )}
                    >
                      <CalendarIcon className='mr-2 h-4 w-4' />
                      {formData.end_date ? (
                        format(formData.end_date, 'PPP')
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className='w-auto p-0'>
                    <Calendar
                      mode='single'
                      selected={formData.end_date}
                      onSelect={(e) =>
                        handleChange(
                          'end_date',
                          `${e.getFullYear()}-${
                            e.getMonth() + 1
                          }-${e.getDate()}`
                        )
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            {/* image */}
            <div className='mb-3'>
              <Label className='text-grey300'>Image</Label>
              <Input
                onChange={(e) => handleChange('image', e.target.files[0])}
                type='file'
                className='border-grey100 focus-visible:ring-0 focus-visible:border-grey350'
              />
              <HandleFormErrorMessages
                errors={formErrors}
                field={'image'}
                formData={formData}
              />
            </div>

            {/* original price */}
            <div className='mb-3'>
              <Label className='text-grey300'>Original price</Label>
              <Input
                onChange={(e) => handleChange('original_price', e.target.value)}
                type='number'
                placeholder='1000'
                className='border-grey100 focus-visible:ring-0 focus-visible:border-grey350'
              />
              <HandleFormErrorMessages
                errors={formErrors}
                field={'original_price'}
                formData={formData}
              />
            </div>

            {/* sale price */}
            <div className='mb-3'>
              <Label className='text-grey300'>Sale price</Label>
              <Input
                onChange={(e) =>
                  handleChange('discounted_price', e.target.value)
                }
                type='number'
                placeholder='700'
                className='border-grey100 focus-visible:ring-0 focus-visible:border-grey350'
              />
              <HandleFormErrorMessages
                errors={formErrors}
                field={'discounted_price'}
                formData={formData}
              />
            </div>

            {/* category */}
            <div className='mb-3'>
              <Label className='text-grey300'>Category</Label>
              <select
                className='block w-full mt-1 p-2 rounded-lg bg-white border border-grey100 focus-visible:ring-0 focus-visible:border-grey350'
                onChange={(e) => handleChange('category_id', e.target.value)}
              >
                <option disabled selected>
                  Select category
                </option>
                {categories.data.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.category_name}
                  </option>
                ))}
                <option value=''>Other</option>
              </select>
            </div>

            {/* discount url */}
            <div className='mb-3'>
              <Label className='text-grey300'>Product url</Label>
              <p className='text-xs text-grey200'>
                You can add your affiliate link here
              </p>
              <p className='text-xs text-grey200 mb-1'>
                Ensure your link starts with https://
              </p>
              <Input
                value={formData.discount_url}
                onChange={(e) => handleChange('discount_url', e.target.value)}
                type='text'
                placeholder='https://'
                className='border-grey100 focus-visible:ring-0 focus-visible:border-grey350'
              />
              <HandleFormErrorMessages
                errors={formErrors}
                field={'discount_url'}
                formData={formData}
              />
            </div>

            <Button className='w-full mt-3'>Submit</Button>
            {formErrors ? (
              <p className='text-red-500 text-sm'>
                Complete all required details to create post
              </p>
            ) : null}
          </form>
        </div>
      </div>
    </Nav>
  );
};

export default CreateMicroBlog;
