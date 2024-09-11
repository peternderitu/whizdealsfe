import { useState } from 'react';

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
  useGetDealsDOQuery,
  useCreateDealMutation,
  useUpdateDealMutation,
  useDeleteDealMutation,
} from '@/redux/features/dealSlice';

import SideNav from './SideNav';
import DealForm from '@/components/DealForm';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useGetAllCategoriesQuery } from '@/redux/features/categorySlice';

const Deals = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
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
  const [formStatus, setFormStatus] = useState('create');

  const [createDeal] = useCreateDealMutation();
  const [updateDeal] = useUpdateDealMutation();
  const [deleteDeal] = useDeleteDealMutation();

  const { data: deals, isLoading } = useGetDealsDOQuery();
  const { data: categories, isLoading: isLoadingCategories } =
    useGetAllCategoriesQuery();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formDataWF = new FormData();
    formDataWF.append('title', formData.title);
    formDataWF.append('description', formData.description);
    formDataWF.append('image', formData.image);
    formDataWF.append('original_price', formData.original_price);
    formDataWF.append('discount', formData.discount);
    formData.discount_code
      ? formDataWF.append('discount_code', formData.discount_code)
      : formDataWF.append('discount_url', formData.discount_url);
    formDataWF.append('category_id', formData.category_id);
    formDataWF.append('start_date', formData.start_date);
    formDataWF.append('brand_name', formData.brand_name);
    formDataWF.append('end_date', formData.end_date);
    formDataWF.append('logo', formData.logo);
    createDeal(formDataWF);
    setOpen(false);
  };

  const handleEdit = (e) => {
    e.preventDefault();
    const formDataWF = new FormData();
    formDataWF.append('title', formData.title);
    formDataWF.append('description', formData.description);
    if (formData.image) formDataWF.append('image', formData.image);
    if (formData.logo) formDataWF.append('logo', formData.logo);
    formDataWF.append('original_price', formData.original_price);
    formDataWF.append('discount_code', formData.discount_code);
    formDataWF.append('discount_url', formData.discount_url);
    formDataWF.append('category_id', formData.category_id);
    formDataWF.append('start_date', formData.start_date);
    formDataWF.append('discount', formData.discount);
    formDataWF.append('end_date', formData.end_date);
    formDataWF.append('brand_name', formData.brand_name);
    updateDeal({ formDataWF, id: formData.id })
      .unwrap()
      .then((response) => {
        console.log(response);
        setOpen(false);
      });
  };

  const initiateEditDeal = (deal) => {
    setFormData(deal);
    setOpen(true);
    setFormStatus('edit');
  };

  if (isLoading || isLoadingCategories) {
    return <p>Loading ...</p>;
  }

  return (
    <SideNav>
      <div className='px-3 lg:px-0'>
        <DealForm
          formData={formData}
          setFormData={setFormData}
          categories={categories}
          handleSubmit={handleSubmit}
          open={open}
          setOpen={setOpen}
          formStatus={formStatus}
          setFormStatus={setFormStatus}
          handleEdit={handleEdit}
        />
        <Table>
          <TableCaption>A list of your recent deals.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className='w-[100px]'>#</TableHead>
              <TableHead>Title</TableHead>

              <TableHead className='hidden lg:table-cell'>
                Description
              </TableHead>
              <TableHead className='hidden lg:table-cell'>Start date</TableHead>
              <TableHead className='hidden lg:table-cell'>End date</TableHead>
              <TableHead className='hidden lg:table-cell'>Category</TableHead>
              <TableHead className='hidden lg:table-cell'>Discount</TableHead>

              <TableHead className='w-[100px]'>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {deals.data.map((deal) => (
              <TableRow key={deal.id}>
                <TableCell className='font-medium'>
                  <img
                    className='h-12 rounded-sm'
                    src={`${import.meta.env.VITE_FILE_URL}/deals/${
                      deal.image_url
                    }`}
                  />
                </TableCell>
                <TableCell>{deal.title}</TableCell>
                <TableCell className='hidden lg:table-cell'>
                  {deal.description}
                </TableCell>
                <TableCell className='hidden lg:table-cell'>
                  {new Date(deal.start_date).getDate()}-
                  {new Date(deal.start_date).getMonth() + 1}-
                  {new Date(deal.start_date).getFullYear()}
                </TableCell>
                <TableCell className='hidden lg:table-cell'>
                  {new Date(deal.end_date).getDate()}-
                  {new Date(deal.end_date).getMonth() + 1}-
                  {new Date(deal.end_date).getFullYear()}
                </TableCell>
                <TableCell className='hidden lg:table-cell'>
                  {deal.category.category_name}
                </TableCell>
                <TableCell className='hidden lg:table-cell'>
                  {parseInt(deal.discount)}%
                </TableCell>
                <TableCell>
                  <VisibilityIcon
                    fontSize='small'
                    className='text-grey300 cursor-pointer mx-1'
                    onClick={() => navigate(`/do/deal-details/${deal.id}`)}
                  />
                  <EditIcon
                    fontSize='small'
                    className='text-grey300 cursor-pointer mx-1'
                    onClick={() => initiateEditDeal(deal)}
                  />
                  <DeleteIcon
                    fontSize='small'
                    className='text-grey300 cursor-pointer mx-1'
                    onClick={() => deleteDeal({ id: deal.id })}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </SideNav>
  );
};

export default Deals;
