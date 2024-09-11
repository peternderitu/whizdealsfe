import SideNav from './SideNav';
import { useGetDealsDOQuery } from '@/redux/features/dealSlice';
import { useGetDealActivityQuery } from '@/redux/features/dealActivitySlice'
import DealUserEngagementChart from '@/components/DealUserEngagementChart';

const Dashboard = () => {
  const { data: deals, isLoading } = useGetDealsDOQuery();
  const { data: dealActivity, isLoading: isLoadingDealActivity } =
    useGetDealActivityQuery();
  console.log(dealActivity);
  const recentDeals = deals ? deals.data.slice(0, 3) : [];

  if (isLoading || isLoadingDealActivity) {
    return <p>Loading ...</p>;
  }

  return (
    <SideNav>
      <div className='lg:grid grid-cols-12 gap-4 px-3'>
        <div className='col-span-8'>
          <div className='lg:flex gap-4 mb-3'>
            <div className='p-5 rounded-lg bg-burgundy100 w-full mb-3'>
              <h2 className='text-grey350 font-bold text-lg'>
                User Conversion
              </h2>
              <p className='text-5xl font-playfair text-burgundy500'>0</p>
            </div>
            <div className='p-5 rounded-lg bg-autumn100 w-full mb-3'>
              <h2 className='text-grey350 font-bold text-lg'>
                User Engagement
              </h2>
              <p className='text-5xl font-playfair text-autumn400'>
                {dealActivity.data.length}
              </p>
            </div>
            <div className='p-5 rounded-lg bg-burgundy100 w-full mb-3'>
              <h2 className='text-grey350 font-bold text-lg'>
                Number of Deals
              </h2>
              <p className='text-5xl font-playfair text-burgundy500'>
                {deals.data.length}
              </p>
            </div>
          </div>

          {/* graph to come here */}
          {/* <DealUserEngagementChart data={dealActivity.data}/> */}
          {/* {[{deals: deals.data.length, userEngagement: dealActivity.data.length}]} */}
        </div>
        <div className='col-span-4'>
          <h4 className='text-xl mb-2 text-grey300'>Current Deals</h4>
          <div className='pt-[1px] bg-grey200 mb-3'></div>
          {/* <div className='mb-3'>
            <div className='flex items-center gap-2'>
              <img src='/fashion.png' className='h-10 w-10 rounded-lg' />
              <p className='text-grey300'>10% off on dress</p>
            </div>
          </div> */}
          {recentDeals.length > 0 ? recentDeals.map((recentDeal) => (
            <div className='mb-3' key={recentDeal.id}>
              <div className='flex items-center gap-2'>
                <img
                  src={`${import.meta.env.VITE_FILE_URL}/deals/${recentDeal.image_url}`}
                  className='h-10 w-10 rounded-lg'
                />
                <p className='text-grey300'>{recentDeal.title}</p>
              </div>
            </div>
          )): <p>No recent deals</p>}
        </div>
      </div>
    </SideNav>
  );
};

export default Dashboard;
