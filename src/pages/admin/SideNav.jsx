import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import DiscountIcon from '@mui/icons-material/Discount';
import CategoryIcon from '@mui/icons-material/Category';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';

const SideNav = ({ children }) => {
  let path = window.location.pathname;
  const navigate = useNavigate();

  const buttonStyles =
    'flex my-3 py-2 w-full text-left pl-8 rounded-lg hover:bg-burgundy100 hover:text-burgundy300 font-semibold text-sm items-center';
  return (
    <>
      {/* sidenav */}
      <div className='w-56 h-screen border-r fixed '>
        <div className='border-b border-grey100 px-5 py-10'>
          <a
          href='/'
          className={`transition duration-300 ease-in-out text-5xl font-medium block text-burgundy500 font-playfair`}
        >
          <img src='/whizDealsWatermark2.png' className='h-20' />
        </a>
        </div>

        <div className="px-5 py-2">
          <button
            onClick={()=> navigate('/admin/dashboard')}
            className={` ${buttonStyles} ${
              path === '/admin/dashboard' ? 'bg-burgundy300 text-white' : null
            } `}
          >
            <HomeIcon />
            <span>&nbsp; Home</span>
          </button>

          <button
            onClick={()=> navigate('/admin/categories')}
            className={` ${buttonStyles} ${
              path === '/admin/categories' ? 'bg-burgundy300 text-white' : null
            } `}
          >
            <CategoryIcon />
            <span>&nbsp; Categories</span>
          </button>

          <button
            onClick={()=> navigate('/admin/deals')}
            className={`${buttonStyles} ${
              path === '/admin/deals' ? 'bg-burgundy300 text-white' : null
            }`}
          >
            <DiscountIcon />
            <span>&nbsp; Deals</span>
          </button>

          {/* <button
            onClick={()=> navigate('/admin-owned/deals')}
            className={`${buttonStyles} ${
              path === '/admin-owned/deals' ? 'bg-burgundy300 text-white' : null
            }`}
          >
            <SupervisorAccountIcon />
            <span>&nbsp; Created Deals</span>
          </button> */}

          <button
            onClick={()=> navigate('/admin/affiliate-links')}
            className={`${buttonStyles} ${
              path === '/admin/affiliate-links' ? 'bg-burgundy300 text-white' : null
            }`}
          >
            <ShoppingBagIcon />
            <span>&nbsp; Affiliate Links</span>
          </button>

          <button
            onClick={()=> navigate('/admin/micro-blogs')}
            className={`${buttonStyles} ${
              path === '/admin/micro-blogs' ? 'bg-burgundy300 text-white' : null
            }`}
          >
            <Diversity3Icon />
            <span>&nbsp; Student Chats</span>
          </button>
        </div>

        <div className="mt-auto border-t bottom-0 absolute w-full px-5 py-6">
            <button className={buttonStyles} onClick={() => navigate('/admin/login')} >
                <LogoutIcon />
                <span>&nbsp; Logout</span>
                </button>
        </div>
      </div>

      {/* topnav */}
      <div style={{width: 'calc(100vw - 14rem)'}} className='ml-56 flex justify-between py-9 px-14 fixed bg-white z-20'>
            <p className="text-2xl text-grey400">Welcome back, Admin</p>
            <img
              className="h-11 w-11 rounded-full" 
              src="/beauty.png"
            />
      </div>

      <div className='ml-56 px-14 pt-32'>{children}</div>
    </>
  );
};

export default SideNav;
