import { useState, useEffect } from 'react';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  useGetAllCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation
} from '@/redux/features/categorySlice';

import SideNav from './SideNav';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import EditIcon from '@mui/icons-material/Edit';
import { Button } from '@/components/ui/button';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';

const CategoryForm = ({
  formData,
  setFormData,
  open,
  setOpen,
  formStatus,
  setFormStatus,
}) => {
  const [createCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();

  const handleChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formDataWF = new FormData();
    formDataWF.append('category_name', formData.category_name);
    formDataWF.append('image', formData.image);
    if (formStatus === 'create') {
      createCategory(formDataWF)
        .unwrap()
        .then((response) => {
          console.log(response);
          if (response.message === 'Created category') {
            setOpen(false);
          }
        });
    } else if (formStatus === 'edit') {
      updateCategory({ formDataWF, id: formData.id })
        .unwrap()
        .then((response) => {
          console.log(response);
          if (response.message === 'Updated category') {
            setOpen(false);
          }
        });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Create category</Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>
            {formStatus === 'create' ? 'Create' : 'Edit'} Category
          </DialogTitle>
          <DialogDescription>Click submit when you're done.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className='mb-3'>
            <Label htmlFor='name'>Name</Label>
            <Input
              placeholder='Add a category name'
              value={formData.category_name}
              onChange={(e) => handleChange('category_name', e.target.value)}
            />
          </div>
          <div className='mb-3'>
            <Label htmlFor='name'>Image</Label>
            <Input
              type='file'
              onChange={(e) => handleChange('image', e.target.files[0])}
            />
          </div>
          <Button className='w-full' type='submit'>
            Submit
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

const Categories = () => {
  const [open, setOpen] = useState(false);
  const [formStatus, setFormStatus] = useState('create');
  const [formData, setFormData] = useState({
    category_name: '',
    image: '',
  });
  const { data: categories, isLoading } = useGetAllCategoriesQuery();
  const [deleteCategory] = useDeleteCategoryMutation();

  useEffect(() => {
    open === false ? setFormStatus('create') : null;
  }, [open]);

  if (isLoading) return <p>Loading ...</p>;

  return (
    <SideNav>
      <CategoryForm
        formData={formData}
        setFormData={setFormData}
        open={open}
        setOpen={setOpen}
        formStatus={formStatus}
        setFormStatus={setFormStatus}
      />

      <Table>
        <TableCaption>A list of your recent deals.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className='w-[100px]'>#</TableHead>
            <TableHead>Name</TableHead>
            <TableHead className='w-[100px]'>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.data.map((category) => (
            <TableRow key={category.id}>
              <TableCell className='font-medium'>
                <img
                  className='h-12 rounded-sm'
                  src={`${import.meta.env.VITE_FILE_URL}/categories/${
                    category.image_url
                  }`}
                />
              </TableCell>
              <TableCell>{category.category_name}</TableCell>
              <TableCell>
                {/* <VisibilityIcon
                  fontSize='small'
                  className='text-grey300 cursor-pointer mx-1'
                /> */}
                <EditIcon
                  fontSize='small'
                  className='text-grey300 cursor-pointer mx-1'
                  onClick={() => {
                    setFormData(category);
                    setOpen(true);
                    setFormStatus('edit');
                  }}
                />
                <DeleteIcon
                  fontSize='small'
                  className='text-grey300 cursor-pointer mx-1'
                  onClick={() => deleteCategory({id: category.id})}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </SideNav>
  );
};

export default Categories;
