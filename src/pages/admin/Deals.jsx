import { useState, useRef } from 'react';

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
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from '@/components/ui/drawer';
import {
  useGetDealsQuery,
  useApproveDealMutation,
  useRejectDealMutation
} from '@/redux/features/dealSlice';

import SideNav from './SideNav';
import { Button } from '@/components/ui/button';
import VisibilityIcon from '@mui/icons-material/Visibility';

const DealDetails = ({ drawerRef, deal, drawerCloseRef }) => {
  const [approveDeal] = useApproveDealMutation();
  const [rejectDeal] = useRejectDealMutation();

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button ref={drawerRef} className='hidden'>
          Open Drawer
        </Button>
      </DrawerTrigger>

      <DrawerClose className='hidden' ref={drawerCloseRef}>
        <Button>Close</Button>
      </DrawerClose>

      <DrawerContent>
        {!deal ? (
          <p>Loading ...</p>
        ) : (
          <div className='min-h-[440px] grid grid-cols-12 px-5 pb-5'>
            <div className='col-span-4'>
              <img
                src={`${import.meta.env.VITE_FILE_URL}/deals/${deal.image_url}`}
                className='h-[440px] w-full object-cover rounded-md'
              />
            </div>

            <div className='col-span-6 ml-9'>
              <div className='flex items-center gap-3'>
                <img
                  src={`${import.meta.env.VITE_FILE_URL}/logos/${
                    deal.logo_url
                  }`}
                  className='rounded-full h-8 w-8 object-cover'
                />
                <p className='font-semibold text-grey300'>{deal.brand_name}</p>
              </div>
              <h1 className='font-medium text-2xl mb-3'>{deal.title}</h1>
              <p className='mb-3'>Category: {deal.category.category_name}</p>

              <div className='p-3 bg-burgundy100 mb-3 rounded-lg'>
                <p>{deal.description}</p>
              </div>

              <div className='flex p-3 bg-autumn100 mb-3 rounded-lg gap-8'>
                <div>
                  <p>Start date</p>
                  <p>
                    {new Date(deal.start_date).getDate()}-
                    {new Date(deal.start_date).getMonth() + 1}-
                    {new Date(deal.start_date).getFullYear()}
                  </p>
                </div>
                <div>
                  <p>End date</p>
                  <p>
                    {new Date(deal.end_date).getDate()}-
                    {new Date(deal.end_date).getMonth() + 1}-
                    {new Date(deal.end_date).getFullYear()}
                  </p>
                </div>
              </div>

              <div className='bg-burgundy100 mb-3 p-3 rounded-lg'>
                <p>Original price: {deal.original_price}</p>
                <p>Discount: {parseInt(deal.discount)}%</p>
                <p>Discounted price: {deal.discounted_price}</p>
              </div>

              <div className='bg-autumn100 p-3 mb-3 rounded-lg'>
                {deal.discount_code ? (
                  <>
                    <p>Discount code</p>
                    <p className='font-semibold'>{deal.discount_code}</p>
                  </>
                ) : (
                  <>
                    <p>Discount link</p>
                    <p className='font-semibold'>{deal.discount_url}</p>
                  </>
                )}
              </div>
            </div>

            <div className='col-span-2 mt-auto ml-auto'>
              <Button
                className='mr-3'
                onClick={() => {
                  approveDeal({ id: deal.id })
                    .unwrap()
                    .then(() => drawerCloseRef.current.click());
                }}
              >
                Approve
              </Button>
              <Button
                variant='outline'
                onClick={() => {
                  rejectDeal({ id: deal.id })
                    .unwrap()
                    .then(() => drawerCloseRef.current.click());
                }}
              >
                Reject
              </Button>
            </div>
          </div>
        )}
      </DrawerContent>
    </Drawer>
  );
};

const Deals = () => {
  const drawerRef = useRef(null);
  const drawerCloseRef = useRef(null);
  const [singleDeal, setSingleDeal] = useState();

  const { data: deals, isLoading } = useGetDealsQuery();
  

  if (isLoading) {
    return <p>Loading ...</p>;
  }

  return (
    <SideNav>
      <div>
        Deals
        <DealDetails
          drawerRef={drawerRef}
          deal={singleDeal}
          drawerCloseRef={drawerCloseRef}
        />
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
                  <VisibilityIcon
                    fontSize='small'
                    className='text-grey300 cursor-pointer mx-1'
                    onClick={() => {
                      setSingleDeal(deal);
                      drawerRef.current.click();
                    }}
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
