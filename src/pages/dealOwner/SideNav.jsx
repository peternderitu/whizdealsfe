import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import DiscountIcon from '@mui/icons-material/Discount';
import PaymentsIcon from '@mui/icons-material/Payments';
import { useGetAuthenticatedDealOwnerQuery } from '@/redux/features/dealOwnerAuthSlice';

const SideNav = ({ children }) => {
  const navigate = useNavigate();
  let path = window.location.pathname;

  const [showNav, setShowNav] = useState(false);

  const { data: authenticatedDealOwner, isLoading } =
    useGetAuthenticatedDealOwnerQuery();

  const buttonStyles =
    'flex my-3 py-2 w-full text-left pl-8 rounded-lg hover:bg-burgundy100 hover:text-burgundy300 font-semibold text-sm items-center';

  if (isLoading) {
    return <p>Loading ...</p>;
  }

  return (
    <>
      <div className='lg:hidden'>
        <MenuIcon
          className={`fixed top-4 z-30 text-grey300 transition duration-300 ease-in-out lg:hidden ${showNav ? 'left-56' : 'left-0'}`}
          onClick={() => setShowNav(!showNav)}
        />
      </div>
      {/* sidenav */}
      <div className={`w-56 h-screen border-r fixed bg-white z-10 lg:left-0 ${showNav ? 'left-0' : '-left-56'}`}>
        <div className='border-b border-grey100 px-5 py-10'>
          
          <a
          href='/'
          className={`transition duration-300 ease-in-out text-5xl font-medium block text-burgundy500 font-playfair`}
        >
          <img src='/whizDealsWatermark2.png' className='h-20' />
        </a>
        </div>

        <div className='px-5 py-2'>
          <button
            onClick={() => navigate('/do')}
            className={` ${buttonStyles} ${
              path === '/do' ? 'bg-burgundy300 text-white' : null
            } `}
          >
            <HomeIcon />
            <span>&nbsp; Home</span>
          </button>
          <button
            onClick={() => navigate('/do/deals')}
            className={`${buttonStyles} ${
              path === '/do/deals' ? 'bg-burgundy300 text-white' : null
            }`}
          >
            <DiscountIcon />
            <span>&nbsp; Deals</span>
          </button>
          {/* <button
            onClick={() => navigate('/do/payments')}
            className={`${buttonStyles} ${
              path === '/do/payments' ? 'bg-burgundy300 text-white' : null
            }`}
          >
            <PaymentsIcon />
            <span>&nbsp; Payments</span>
          </button> */}
        </div>

        <div className='mt-auto border-t bottom-0 absolute w-full px-5 py-6'>
          <button className={buttonStyles} onClick={() => navigate('/do/login')}>
            <LogoutIcon />
            <span>&nbsp; Logout</span>
          </button>
        </div>
      </div>

      {/* topnav */}
      <div
        className='lg:ml-56 flex justify-between pt-3 lg:py-9 px-14 fixed bg-white lg:z-20 lg:w-4/5'
      >
        <p className='text-xl lg:text-2xl text-grey400'>
          Welcome back, {authenticatedDealOwner.first_name}
        </p>
        {authenticatedDealOwner ? (
          authenticatedDealOwner.profile_picture ? (
            <img className='h-11 w-11 rounded-full' src='beauty.png' />
          ) : (
            <div className='bg-burgundy100 rounded-full w-11 h-11 flex items-center justify-center text-center'>
              <p className='font-playfair text-burgundy500 text-2xl'>
                {authenticatedDealOwner.first_name[0]}
              </p>
            </div>
          )
        ) : null}
      </div>

      <div className='ml-0 lg:ml-56 lg:px-14 pt-32'>{children}</div>
    </>
  );
};

export default SideNav;
