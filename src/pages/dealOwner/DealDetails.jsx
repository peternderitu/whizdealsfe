import SideNav from './SideNav';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { useParams } from 'react-router-dom';
import {
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  AreaChart,
  Area,
  Label,
} from 'recharts';
import { useGetDealByIdQuery } from '@/redux/features/dealSlice';
import { useGetOneDealActivityQuery } from '@/redux/features/dealActivitySlice';

const DealDetails = () => {
  const { id } = useParams();
  const { data: deal, isLoading } = useGetDealByIdQuery({ id });
  const { data } = useGetOneDealActivityQuery({ id });

  if (isLoading) return <p>Loading ...</p>;
  return (
    <SideNav>
      <div className='min-h-[440px] grid grid-cols-12 pb-5 mb-3'>
        <div className='col-span-5'>
          <img
            src={`${import.meta.env.VITE_FILE_URL}/deals/${
              deal.data.image_url
            }`}
            className='h-[440px] w-full object-cover rounded-md'
          />
        </div>

        <div className='col-span-7 ml-9 h-[440px] overflow-y-auto pb-3'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-3'>
              <img
                src={`${import.meta.env.VITE_FILE_URL}/logos/${
                  deal.data.logo_url
                }`}
                className='rounded-full h-8 w-8 object-cover'
              />
              <p className='font-semibold text-grey300'>
                {deal.data.brand_name}
              </p>
            </div>
            <div
              className={`p-3 rounded-lg ${
                deal.data.status === 1
                  ? 'bg-green-200'
                  : deal.data.status === 2
                  ? 'bg-amber-200'
                  : 'bg-red-300'
              }`}
            >
              Status:{' '}
              {deal.data.status === 1
                ? 'Approved'
                : deal.data.status === 2
                ? 'Awaiting approval'
                : 'Rejected'}
            </div>
          </div>
          <h1 className='font-medium text-2xl mb-3'>{deal.data.title}</h1>
          <p className='mb-3'>Category: {deal.data.category.category_name}</p>

          <div className='p-3 bg-burgundy100 mb-3 rounded-lg'>
            <p>{deal.data.description}</p>
          </div>

          <div className='flex p-3 bg-autumn100 mb-3 rounded-lg gap-8'>
            <div>
              <p>Start date</p>
              <p>
                {new Date(deal.data.start_date).getDate()}-
                {new Date(deal.data.start_date).getMonth() + 1}-
                {new Date(deal.data.start_date).getFullYear()}
              </p>
            </div>
            <div>
              <p>End date</p>
              <p>
                {new Date(deal.data.end_date).getDate()}-
                {new Date(deal.data.end_date).getMonth() + 1}-
                {new Date(deal.data.end_date).getFullYear()}
              </p>
            </div>
          </div>

          <div className='bg-burgundy100 mb-3 p-3 rounded-lg'>
            <p>Original price: {deal.data.original_price}</p>
            <p>Discount: {parseInt(deal.data.discount)}%</p>
            <p>Discounted price: {deal.data.discounted_price}</p>
          </div>

          <div className='bg-autumn100 p-3 mb-3 rounded-lg'>
            {deal.data.discount_code ? (
              <>
                <p>Discount code</p>
                <p className='font-semibold'>{deal.data.discount_code}</p>
              </>
            ) : (
              <>
                <p>Discount link</p>
                <p className='font-semibold'>{deal.data.discount_url}</p>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Line Graph */}
      <div>
        <Card className='mb-3 p-3'>
          <CardHeader>User Clicks</CardHeader>
          <CardContent className='h-80'>
            {
                data && data.length > 0 ?
                    <ResponsiveContainer width={'100%'} height={'100%'}>
                    <AreaChart width={730} height={250} data={data}>
                        <XAxis dataKey='month' height={50}>
                        <Label value='Months' offset={-10} position='bottom' />
                        </XAxis>
                        <YAxis dataKey='clicks'>
                        <Label
                            value='Clicks'
                            offset={0}
                            position='left'
                            angle={-90}
                        />
                        </YAxis>
                        <Area
                        type='monotone'
                        dataKey='clicks'
                        stroke='#FF6B89'
                        fill='#FFDFE5'
                        />
                        <Tooltip />
                    </AreaChart>
                    </ResponsiveContainer>
                : <p>No user has viewed this deal yet.</p>
            }
          </CardContent>
        </Card>
      </div>

      {/* <LineChart width={600} height={300} data={data}>
        <Tooltip />
        <Line type='monotone' dataKey='clicks' stroke='#89001B' />
        <XAxis dataKey='month' />
        <YAxis dataKey='clicks' />
        </LineChart> */}
    </SideNav>
  );
};

export default DealDetails;
