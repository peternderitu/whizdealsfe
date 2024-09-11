import { useState } from 'react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  useGetMyMicroBlogsQuery,
  useUpdateMicroBlogMutation,
  useDeleteMicroBlogMutation,
} from '@/redux/features/microBlogSlice';

import Nav from './Nav';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import { Button } from '@/components/ui/button';
import DeleteIcon from '@mui/icons-material/Delete';
import { Calendar } from '@/components/ui/calendar';
import { useToast } from '@/components/ui/use-toast';
import { Calendar as CalendarIcon } from 'lucide-react';
import { useGetAllCategoriesQuery } from '@/redux/features/categorySlice';
import HandleFormErrorMessages from '@/components/HandleFormErrorMessages';

const EditDeal = ({ open, setOpen, formData, setFormData }) => {
  const { toast } = useToast();
  const [formErrors, setFormErrors] = useState(null);
  const [updateMicroBlog] = useUpdateMicroBlogMutation();
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
    updateMicroBlog({ formDataWF, id: formData.id })
      .unwrap()
      .then((response) => {
        console.log(response);

        if (response.message === 'Updated micro blog successfully') {
          setOpen(false);
          toast({
            title: 'Success!',
            description: "You've edited the deal successfully.",
          });
        }
      })
      .catch((error) => setFormErrors(error.data.errors));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className='lg:max-w-screen-lg overflow-y-scroll max-h-[70vh]'>
        <DialogHeader>
          <DialogTitle>Edit Deal</DialogTitle>
          <DialogDescription>
            Click submit when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <form className='p-3' onSubmit={handleSubmit}>
          {/* title */}
          <div className='mb-3'>
            <Label className='text-grey300'>Deal title</Label>
            <Input
              onChange={(e) => handleChange('title', e.target.value)}
              value={formData.title}
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
                        `${e.getFullYear()}-${e.getMonth() + 1}-${e.getDate()}`
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
                        `${e.getFullYear()}-${e.getMonth() + 1}-${e.getDate()}`
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
              value={formData.original_price}
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
              onChange={(e) => handleChange('discounted_price', e.target.value)}
              value={formData.discounted_price}
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
              value={formData.category_id}
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
      </DialogContent>
    </Dialog>
  );
};

const DeleteDeal = ({ open, setOpen, id }) => {
  const { toast } = useToast();
  const [deleteMicroBlog] = useDeleteMicroBlogMutation();

  const handleDelete = (id) => {
    deleteMicroBlog({ id })
      .unwrap()
      .then((response) => {
        if (response.message === 'Deleted micro blog') {
          setOpen(false);
          toast({
            title: 'Success!',
            description: "You've deleted the deal successfully.",
          });
        } else {
          setOpen(false);
          toast({
            variant: 'destructive',
            title: 'Uh oh! Something went wrong.',
            description:
              'There was a problem deleting the deal. Try again later',
          });
        }
      })
      .catch((error) => {
        console.log(error);
        setOpen(false);
        toast({
          variant: 'destructive',
          title: 'Uh oh! Something went wrong.',
          description: 'There was a problem deleting the deal. Try again later',
        });
      });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className='w-96'>
        <DialogHeader>
          <DialogTitle>Delete this deal?</DialogTitle>
        </DialogHeader>
        <p>You will not be able to recover this deal</p>
        <DialogFooter className=''>
          <Button
            className='bg-grey200 hover:bg-grey300'
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button
            className='bg-red-500 hover:bg-red-600'
            onClick={() => handleDelete(id)}
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const MyDeals = () => {

  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [openDeleteDealDialog, setOpenDeleteDealDialog] = useState(false);
  const [formData, setFormData] = useState({
    user_id: '',
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
  const { data: blogs, isLoading } = useGetMyMicroBlogsQuery();

  if (isLoading) return <p>Loading ...</p>;
  return (
    <Nav>
      <h2 className='text-3xl mb-5 text-burgundy500'>My Deals</h2>
      <div className='grid grid-cols-2 gap-4 mb-3'>
        {blogs.data.length > 0 ? (
          blogs.data.map((blog) => {
            return (
              <div
                key={blog.id}
                className='flex items-center gap-4 border rounded-md relative'
              >
                <div className='absolute right-2 top-2'>
                  <EditIcon
                    fontSize='small'
                    sx={{ color: 'grey' }}
                    className='cursor-pointer'
                    onClick={() => {
                      setFormData(blog);
                      setOpen(true);
                    }}
                  />
                  <DeleteIcon
                    fontSize='small'
                    sx={{ color: 'grey' }}
                    className='cursor-pointer'
                    onClick={() => {
                      setFormData(blog);
                      setOpenDeleteDealDialog(true);
                    }}
                  />
                </div>
                <img
                  className='w-52 object-cover rounded-md h-full'
                  src={`${import.meta.env.VITE_FILE_URL}/microblogs/${
                    blog.image_url
                  }`}
                />
                <div>
                  <h1 className='text-2xl text-burgundy500'>{blog.title}</h1>
                  <div dangerouslySetInnerHTML={{ __html: blog.description }} />
                </div>
              </div>
            );
          })
        ) : (
          <div className='flex flex-col justify-center items-center w-full col-span-2 '>
            <img src='notFound.svg' className='h-52 mb-5' />
            <p className="mb-5 text-grey300">You have not created any deals yet.</p>
            <Button onClick={()=> navigate('/micro-blogs/create')}>Create a deal</Button>
          </div>
        )}
      </div>
      <EditDeal
        open={open}
        setOpen={setOpen}
        formData={formData}
        setFormData={setFormData}
      />
      <DeleteDeal
        open={openDeleteDealDialog}
        setOpen={setOpenDeleteDealDialog}
        id={formData.id}
      />
    </Nav>
  );
};

export default MyDeals;
