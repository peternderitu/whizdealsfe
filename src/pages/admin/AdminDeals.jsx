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
  useGetDealsAdminQuery,
  useCreateDealAdminMutation,
  useUpdateDealAdminMutation,
  useDeleteDealAdminMutation
} from '@/redux/features/dealSlice';

import SideNav from './SideNav';
import DealForm from '@/components/DealForm';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useGetAllCategoriesQuery } from '@/redux/features/categorySlice';

const AdminDeals = () => {
  const [open, setOpen] = useState(false);
  const [formStatus, setFormStatus] = useState('create');
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

  const [createDealAdmin] = useCreateDealAdminMutation();
  const [updateDealAdmin] = useUpdateDealAdminMutation();
  const [deleteDealAdmin] = useDeleteDealAdminMutation();

  const { data: deals, isLoading } = useGetDealsAdminQuery();
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
    formDataWF.append('discount_code', formData.discount_code);
    formDataWF.append('discount_url', formData.discount_url);
    formDataWF.append('category_id', formData.category_id);
    formDataWF.append('start_date', formData.start_date);
    formDataWF.append('end_date', formData.end_date);
    formDataWF.append('logo', formData.logo);
    formDataWF.append('brand_name', formData.brand_name);
    createDealAdmin(formDataWF)
      .unwrap()
      .then(() => setOpen(false));
  };

  const handleInitiateEdit = (deal) => {
    setFormData(deal);
    setOpen(true);
    setFormStatus('edit');
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
    updateDealAdmin({ formDataWF, id: formData.id })
      .unwrap()
      .then(() => setOpen(false));
  };

  if (isLoading || isLoadingCategories) {
    return <p>Loading ...</p>;
  }

  return (
    <SideNav>
      <div>
        <DealForm
          formData={formData}
          setFormData={setFormData}
          categories={categories}
          handleSubmit={handleSubmit}
          open={open}
          setOpen={setOpen}
          formStatus={formStatus}
          handleEdit={handleEdit}
        />

        <h1>Deals created by you</h1>
        <Table>
          <TableCaption>A list of your recent deals.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className='w-[100px]'>#</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Start date</TableHead>
              <TableHead>End date</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
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
                <TableCell>{deal.description}</TableCell>
                <TableCell>
                  {new Date(deal.start_date).getDate()}-
                  {new Date(deal.start_date).getMonth() + 1}-
                  {new Date(deal.start_date).getFullYear()}
                </TableCell>
                <TableCell>
                  {new Date(deal.end_date).getDate()}-
                  {new Date(deal.end_date).getMonth() + 1}-
                  {new Date(deal.end_date).getFullYear()}
                </TableCell>
                <TableCell>{deal.category.category_name}</TableCell>
                <TableCell>
                  {deal.status === 1
                    ? 'Approved'
                    : deal.status === 2
                    ? 'Not approved'
                    : 'Rejected'}
                </TableCell>
                <TableCell>
                  {/* <VisibilityIcon
                    fontSize='small'
                    className='text-grey300 cursor-pointer mx-1'
                    onClick={() => {
                      setSingleDeal(deal);
                      drawerRef.current.click();
                    }}
                  /> */}
                  <EditIcon
                    fontSize='small'
                    className='text-grey300 cursor-pointer mx-1'
                    onClick={() => handleInitiateEdit(deal)}
                  />
                  <DeleteIcon
                    fontSize='small'
                    className='text-grey300 cursor-pointer mx-1'
                    onClick={() => deleteDealAdmin({ id: deal.id })}
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

export default AdminDeals;
