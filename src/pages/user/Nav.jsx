import { useState } from 'react';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

import Cookies from 'js-cookie';
import MenuIcon from '@mui/icons-material/Menu';
import UserNotLoggedIn from './UserNotLoggedIn';
import SchoolIcon from '@mui/icons-material/School';
import NavProfilePhoto from '@/components/NavProfilePhoto';
import { useNavigate, useLocation } from 'react-router-dom';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useGetAllCategoriesQuery } from '@/redux/features/categorySlice';
import StudentEmailNotConfirmed from '@/components/StudentEmailNotConfirmed';
import { useGetAuthenticatedUserQuery } from '@/redux/features/userAuthSlice';

const Nav = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location.pathname);
  let token = Cookies.get('token');

  const [showNav, setShowNav] = useState(false);
  const [open, setOpen] = useState(false);
  const [openSENC, setOpenSENC] = useState(false);

  const { data: user, isLoading } = useGetAuthenticatedUserQuery();
  const { data: categories, isLoading: isLoadingCategories } =
    useGetAllCategoriesQuery();

  if (isLoading || isLoadingCategories) return <p>Loading... </p>;

  return (
    <>
      <UserNotLoggedIn open={open} setOpen={setOpen} action={'create a deal'} />
      <StudentEmailNotConfirmed
        open={openSENC}
        setOpen={setOpenSENC}
        action={'create a deal'}
        userId={user ? user.id : null}
      />
      <div className='lg:hidden'>
        <MenuIcon
          className='fixed top-4 left-4 z-30 text-grey300 '
          onClick={() => setShowNav(!showNav)}
        />
      </div>
      <div>
        <div
          className={`${
            showNav ? 'block bg-white' : 'hidden'
          } lg:flex justify-between items-center fixed top-0 z-20 w-full p-4 transition duration-300 ease-in-out bg-white`}
        >
          <a
            href='/'
            className={`transition duration-300 ease-in-out text-5xl font-medium block mt-8 lg:mt-0 text-burgundy500 font-playfair`}
          >
            <img src='/whizDealsWatermark.png' className='h-20' />
          </a>
          <div>
            {categories.data.map((category) => {
              return (
                <a
                  href={
                    location.pathname === '/deals'
                      ? `#${category.category_name}`
                      : `/deals#${category.category_name}`
                  }
                  key={category.id}
                  className='text-grey300 block lg:inline transition duration-300 ease-in-out hover:text-burgundy500 mx-3 py-1'
                >
                  {category.category_name}
                </a>
              );
            })}
          </div>

          <div className='lg:flex items-end gap-5'>
          <div className='flex flex-col items-center'
            onClick={()=>navigate('/student-placements')}
          >
            <SchoolIcon
              style={{ fontSize: '2.75rem' }}
              className='cursor-pointer'
            />
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <span className='text-sm font-light text-grey300 text-center'>
                    Student place...
                  </span>
                </TooltipTrigger>
                <TooltipContent side="right" className='bg-grey200'>
                  <p>Student placements</p>
                  </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
            <div className='flex flex-col items-center'>
              <AddCircleOutlineIcon
                style={{ fontSize: '2.75rem' }}
                className='cursor-pointer'
                onClick={() => {
                  // token ? navigate('/micro-blogs/create') : setOpen(true)
                  token && user.studentEmailVerified === 1
                    ? navigate('/micro-blogs/create')
                    : token && user.studentEmailVerified === 0
                    ? setOpenSENC(true)
                    : setOpen(true);
                }}
              />
              <span className='text-sm font-light text-grey300'>
                Post a Deal
              </span>
            </div>
            <NavProfilePhoto token={token} user={user} />
          </div>
        </div>

        <div className='pt-28 lg:px-14'>{children}</div>
      </div>
    </>
  );
};

export default Nav;
