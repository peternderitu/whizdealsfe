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
  useGetAffiliatesQuery,
  useCreateAffiliateMutation,
  useUpdateDealAdminMutation,
  useDeleteDealAdminMutation,
} from '@/redux/features/dealSlice';

import SideNav from './SideNav';
import DealForm from '@/components/DealForm';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useGetAllCategoriesQuery } from '@/redux/features/categorySlice';

const AffiliateLinks = () => {
  const [open, setOpen] = useState(false);
  const [formStatus, setFormStatus] = useState('create');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    original_price: '',
    discount: '',
    discount_code: '',
    discount_url: '',
    category_id: null,
    start_date: '',
    end_date: '',
  });

  const [createAffiliate] = useCreateAffiliateMutation();
  const [updateDealAdmin] = useUpdateDealAdminMutation();
  const [deleteDealAdmin] = useDeleteDealAdminMutation();
  const { data: affiliates, isLoading } = useGetAffiliatesQuery();
  const { data: categories, isLoading: isLoadingCategories } =
    useGetAllCategoriesQuery();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
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
    formDataWF.append('end_date', formData.end_date);
    formDataWF.append('logo', formData.logo);
    formDataWF.append('brand_name', formData.brand_name);
    createAffiliate(formDataWF)
      .unwrap()
      .then(() => setOpen(false));
  };

  const handleInitiateEdit = (affiliate) => {
    setFormData(affiliate);
    setFormStatus('edit');
    setOpen(true);
    console.log(affiliate);
  };

  const resetForm = () => {
    setOpen(false);
    setFormStatus('create');
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
      .then(() => resetForm());
  };

  const handleDelete = (id) => {
    deleteDealAdmin({ id })
      .unwrap()
      .then((response)=> console.log(response))
      .catch((error)=> console.log(error))
  }
 
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
          setFormStatus={setFormStatus}
          handleEdit={handleEdit}
          isAffiliate={true}
        />

        <h1 className>Affiliate Links</h1>

        <Table>
          <TableCaption>A list of your recent affiliates.</TableCaption>
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
            {affiliates.data.map((affiliate) => (
              <TableRow key={affiliate.id}>
                <TableCell className='font-medium'>
                  <img
                    className='h-12 rounded-sm'
                    src={`${import.meta.env.VITE_FILE_URL}/deals/${
                      affiliate.image_url
                    }`}
                  />
                </TableCell>
                <TableCell>{affiliate.title}</TableCell>
                <TableCell>{affiliate.description}</TableCell>
                <TableCell>
                  {new Date(affiliate.start_date).getDate()}-
                  {new Date(affiliate.start_date).getMonth() + 1}-
                  {new Date(affiliate.start_date).getFullYear()}
                </TableCell>
                <TableCell>
                  {new Date(affiliate.end_date).getDate()}-
                  {new Date(affiliate.end_date).getMonth() + 1}-
                  {new Date(affiliate.end_date).getFullYear()}
                </TableCell>
                <TableCell>{affiliate.category.category_name}</TableCell>
                <TableCell>
                  {affiliate.status === 1
                    ? 'Approved'
                    : affiliate.status === 2
                    ? 'Not approved'
                    : 'Rejected'}
                </TableCell>
                <TableCell>
                  {/* edit and delete should come here */}
                  <EditIcon
                    className='cursor-pointer'
                    onClick={() => handleInitiateEdit(affiliate)}
                  />
                  <DeleteIcon
                    className='cursor-pointer'
                    onClick={() => handleDelete(affiliate.id)}
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

export default AffiliateLinks;
