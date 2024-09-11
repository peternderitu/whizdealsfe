import { useState, useEffect } from 'react';

import {
  useGetAuthenticatedUserQuery,
  useUpdateUserMutation,
} from '@/redux/features/userAuthSlice';

import Nav from './Nav';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const MyProfile = () => {
  const [formData, setFormData] = useState({});
  const [updateUser] = useUpdateUserMutation();
  const { data: user, isLoading } = useGetAuthenticatedUserQuery();

  const handleChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser(formData).unwrap()
        .then((response)=> console.log(response))
  }

  useEffect(() => {
    setFormData(user);
  }, [user]);

  if (isLoading || !formData) return <p>Loading ...</p>;
  return (
    <Nav>
      <form onSubmit={handleSubmit}>
        <div className='border rounded-md grid grid-cols-2 mb-3'>
          <div className='flex flex-col justify-center h-full items-center py-16'>
            {user.profile_picture ? (
              <img className='h-32 w-32 rounded-full' src='beauty.png' />
            ) : (
              <div className='bg-burgundy100 rounded-full w-32 h-32 flex items-center justify-center text-center'>
                <p className='font-playfair text-burgundy500 text-5xl'>
                  {user.first_name[0]}
                </p>
              </div>
            )}
            {/* work in progress */}
            <div className='mt-8 hidden'>
              <p className='ml-5 text-sm text-grey300'>
                *Change your profile photo
              </p>
              <Input
                type='file'
                placeholder='Change'
                onChange={(e) =>
                  handleChange('profile_picture', e.target.files[0])
                }
              />
            </div>
          </div>
          <div className='border-l px-7 py-16'>
            <h1 className='text-3xl text-burgundy500 mb-5'>
              Edit your details
            </h1>

            <div className='mb-3'>
              <Label>First name</Label>
              <Input
                type='text'
                placeholder='First name'
                value={formData.first_name}
                onChange={(e) => handleChange('first_name', e.target.value)}
              />
            </div>

            <div className='mb-3'>
              <Label>Last name</Label>
              <Input
                type='text'
                placeholder='Last name'
                value={formData.last_name}
                onChange={(e) => handleChange('last_name', e.target.value)}
              />
            </div>

            <div className='mb-3'>
              <Label>Email</Label>
              <Input
                type='email'
                placeholder='Email'
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
              />
            </div>

            <div className='mb-3'>
              <Label className='text-grey300'>Student email</Label>
              <Input
                type='email'
                placeholder='Student email'
                disabled
                value={formData.studentEmail}
              />
            </div>

            <Button className='w-full'>Submit</Button>
          </div>
        </div>
      </form>
    </Nav>
  );
};

export default MyProfile;
