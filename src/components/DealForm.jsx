import { useState } from 'react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogOverlay,
} from '@/components/ui/dialog';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNextForm,
  CarouselPreviousForm,
} from '@/components/ui/carousel';

import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Calendar as CalendarIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const DealForm = ({
  formData,
  setFormData,
  categories,
  handleSubmit,
  open,
  setOpen,
  isAffiliate,
  formStatus,
  setFormStatus,
  handleEdit,
}) => {
  const [discountFormat, setDiscountFormat] = useState(
    formStatus === 'create' ? 'code' : formData.discount_url ? 'link' : 'code'
  );

  const handleChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  const initiateCreate = () => {
    setFormStatus('create')
    setFormData({
      title: '',
      description: '',
      image: '',
      original_price: '',
      discount: '',
      discount_code: null,
      discount_url: null,
      category_id: null,
      start_date: '',
      end_date: '',
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className='mb-3' onClick={initiateCreate}>
          Create {isAffiliate ? 'Affiliate Deal' : 'Deal'}
        </Button>
      </DialogTrigger>
      <DialogContent className='w-[100vw] '>
        {/*  px-[0px!important] lg:px-5 */}
        <DialogHeader>
          <DialogTitle>
            {formStatus === 'create' ? 'Create' : 'Edit'}{' '}
            {isAffiliate ? 'affiliate' : 'deal'}
          </DialogTitle>
          <DialogDescription>
            Click submit when you&apos;re done.
          </DialogDescription>
        </DialogHeader>

        <Carousel className='lg:max-w-[465px] w-[85vw]'>
          {/* sm:max-w-[477px]  */}
          <form
            className='w-full'
            onSubmit={formStatus === 'create' ? handleSubmit : handleEdit}
          >
            <CarouselContent>
              {/* title, discount %, category and original price */}
              <CarouselItem>
                <div className='p-1'>
                  <Card className='pt-3'>
                    <CardContent>
                      <div className='mb-3 flex gap-4'>
                        <div className='w-full'>
                          <Label htmlFor='name'>Title</Label>
                          <Input
                            className=''
                            value={formData.title}
                            onChange={(e) =>
                              handleChange('title', e.target.value)
                            }
                          />
                        </div>
                        <div className='w-full'>
                          <Label htmlFor='name'>Discount percentage</Label>
                          <Input
                            type='number'
                            value={formData.discount}
                            onChange={(e) =>
                              handleChange('discount', e.target.value)
                            }
                          />
                        </div>
                      </div>

                      <div className='mb-3 flex gap-4'>
                        <div className='w-full'>
                          <Label htmlFor='name'>Category</Label>

                          <select
                            className='block w-full p-2 rounded-lg bg-white border text-sm border-grey100 focus-visible:ring-0 focus-visible:border-grey350'
                            onChange={(e) =>
                              handleChange('category_id', e.target.value)
                            }
                          >
                            <option
                              disabled
                              selected={formStatus === 'create' ? true : false}
                            >
                              Select category
                            </option>

                            {categories.data.map((category) => (
                              <option
                                key={category.id}
                                value={category.id}
                                selected={
                                  formStatus === 'edit' &&
                                  formData.category_id === category.id
                                    ? true
                                    : false
                                }
                              >
                                {category.category_name}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className='w-full'>
                          <Label htmlFor='name'>Original price</Label>
                          <Input
                            type='number'
                            value={formData.original_price}
                            onChange={(e) =>
                              handleChange('original_price', e.target.value)
                            }
                          />
                        </div>
                      </div>

                      <div className='mb-3 '>
                        {/* <div></div> */}
                        <div className=''>
                          <Label className='text-grey200'>Sale price</Label>
                          <Input
                            type='number'
                            disabled
                            value={
                              formData.original_price -
                              formData.original_price *
                                (formData.discount / 100)
                            }
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>

              {/* description, start date and end date */}
              <CarouselItem>
                <div className='p-1'>
                  <Card className='pt-3'>
                    <CardContent>
                      <div className='mb-3 '>
                        <div className='w-full'>
                          <Label htmlFor='name'>Description</Label>
                          <Textarea
                            placeholder='Add a description here.'
                            value={formData.description}
                            onChange={(e) =>
                              handleChange('description', e.target.value)
                            }
                          />
                        </div>
                      </div>

                      <div className='mb-3 flex gap-4'>
                        <div className='w-full'>
                          <Label htmlFor='name'>Start date</Label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant={'outline'}
                                className={cn(
                                  'w-full justify-start text-left font-normal text-[10px] lg:text-base p-2 lg:p-3',
                                  !formData.start_date &&
                                    'text-muted-foreground'
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
                          <Label htmlFor='name'>End date</Label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant={'outline'}
                                className={cn(
                                  'w-full justify-start text-left font-normal text-[10px] lg:text-base p-2 lg:p-3',
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
                                // disabled={(date) =>
                                //     date > new Date() || date < new Date("1900-01-01")
                                //   }
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>

              {/* logo and brand name */}
              <CarouselItem>
                <div className='p-1'>
                  <Card className='pt-3'>
                    <CardContent>
                      <div className='mb-3 '>
                        <div className='w-full'>
                          <Label htmlFor='name'>Logo</Label>
                          <Input
                            className=''
                            type='file'
                            onChange={(e) =>
                              handleChange('logo', e.target.files[0])
                            }
                          />
                        </div>
                      </div>

                      <div className='w-full'>
                        <Label htmlFor='name'>Brand name</Label>
                        <Input
                          type='text'
                          value={formData.brand_name}
                          onChange={(e) =>
                            handleChange('brand_name', e.target.value)
                          }
                        />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>

              {/* image and disount code or url */}
              <CarouselItem>
                <div className='p-1'>
                  <Card className='pt-3'>
                    <CardContent>
                      <div className='mb-3 '>
                        <div className='w-full'>
                          <Label htmlFor='name'>Image</Label>
                          {/* setFormData({...formData, image: e.target.files[0]}) */}
                          <Input
                            className=''
                            type='file'
                            onChange={(e) =>
                              handleChange('image', e.target.files[0])
                            }
                          />
                        </div>
                      </div>

                      <RadioGroup
                        defaultValue={discountFormat}
                        onValueChange={(e) => setDiscountFormat(e)}
                        className='mb-3'
                      >
                        <div className='flex items-center space-x-2'>
                          <RadioGroupItem value='code' id='r1' />
                          <Label htmlFor='r1'>Discount code</Label>
                        </div>
                        <div className='flex items-center space-x-2'>
                          <RadioGroupItem value='link' id='r2' />
                          <Label htmlFor='r2'>Discount link</Label>
                        </div>
                      </RadioGroup>

                      {discountFormat === 'link' ? (
                        <div className='w-full mb-3'>
                          <Label htmlFor='name'>Discount url</Label>
                          <Input
                            value={formData.discount_url}
                            onChange={(e) =>
                              handleChange('discount_url', e.target.value)
                            }
                          />
                        </div>
                      ) : discountFormat === 'code' ? (
                        <div className='w-full mb-3'>
                          <Label htmlFor='name'>Discount code</Label>
                          <Input
                            value={formData.discount_code}
                            onChange={(e) =>
                              handleChange('discount_code', e.target.value)
                            }
                          />
                        </div>
                      ) : null}

                      <Button
                        type='submit'
                        className='w-full font-semibold mt-3'
                      >
                        Submit
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            </CarouselContent>
          </form>

          <div className='flex justify-between px-3 mt-3'>
            <CarouselPreviousForm className='rounded-md w-fit py-2 px-5' />
            <CarouselNextForm className='rounded-md w-fit py-2 px-5' />
          </div>
        </Carousel>
      </DialogContent>
    </Dialog>
  );
};

export default DealForm;
