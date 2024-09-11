import { useState } from 'react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const NavProfilePhoto = ({ token, user }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const logout = () => {
   Cookies.remove('token')
   navigate('/')
  }

  return (
    <div>
      <DropdownMenu>
        {token ? (
          user.profile_picture ? (
            <DropdownMenuTrigger>
              <div className="flex flex-col items-center justify-end">
                <img
                  className='h-11 w-11 rounded-full'
                  src='beauty.png'
                  onClick={() => setOpen(true)}
                />
                <span className="text-sm font-light text-grey300">Account</span>
              </div>
            </DropdownMenuTrigger>
          ) : (
            <DropdownMenuTrigger>
              <div className="flex flex-col items-center justify-end">
                <div
                  className='bg-burgundy100 rounded-full w-11 h-11 flex items-center justify-center text-center'
                  onClick={() => setOpen(true)}
                >
                  <p className='font-playfair text-burgundy500 text-2xl'>
                    {user.first_name[0]}
                  </p>
                </div>
                <span className="text-sm font-light text-grey300">Account</span>
              </div>
            </DropdownMenuTrigger>
          )
        ) : (
          <div className="py-4">
            <Button className='font-bold' onClick={() => navigate('/register')}>
              Register
            </Button>
          </div>
        )}

        <DropdownMenuContent>
          <DropdownMenuItem onClick={()=> navigate('/my-profile')}>My Profile</DropdownMenuItem>
          <DropdownMenuItem onClick={()=> navigate('/my-deals')}>My Deals</DropdownMenuItem>
          <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default NavProfilePhoto;
