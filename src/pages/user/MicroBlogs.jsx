import { useState } from 'react';
import Nav from './Nav';
import Cookies from 'js-cookie';
import { Button } from '@/components/ui/button';
import UserNotLoggedIn from './UserNotLoggedIn';
import CommentIcon from '@mui/icons-material/Comment';
import { useNavigate, useLocation } from 'react-router-dom';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import { useGetDealsQuery } from '@/redux/features/dealSlice';
import { useGetAllMicroBlogsQuery } from '@/redux/features/microBlogSlice';
import StudentEmailNotConfirmed from '@/components/StudentEmailNotConfirmed';
import { useGetAuthenticatedUserQuery } from '@/redux/features/userAuthSlice';
import { useStoreDealActivityMutation } from '@/redux/features/dealActivitySlice';
import ShareMicroBlog from '@/components/ShareMicroBlog';

const MicroBlogs = () => {
  const navigate = useNavigate();
  const location = useLocation();
  let token = Cookies.get('token');

  // for UserNotLoggedIn dialog
  const [open, setOpen] = useState(false);
  const [openSENC, setOpenSENC] = useState(false);

  const [storeDealActivity] = useStoreDealActivityMutation();

  const { data: deals, isLoading } = useGetDealsQuery();
  const { data: user } = useGetAuthenticatedUserQuery();
  const { data: microBlogs, isLoading: isLoadingMicroBlogs } =
    useGetAllMicroBlogsQuery();
  console.log(microBlogs);

  const filterApprovedDeals = () => {
    let categoryName = decodeURIComponent(location.hash).substring(1);

    if (categoryName) {
      return deals.data.filter(
        (deal) =>
          deal.status === 1 && deal.category.category_name === categoryName
      );
    } else {
      return deals.data.filter((deal) => deal.status === 1);
    }
  };

  const handleViewDeal = (id) => {
    storeDealActivity({ deal_id: id })
      .unwrap()
      .then((response) => console.log(response));
    navigate(`/deals/${id}`);
  };

  if (isLoading || isLoadingMicroBlogs) {
    return <p>Loading ...</p>;
  }

  return (
    <Nav>
      <UserNotLoggedIn open={open} setOpen={setOpen} action={'view deal details'}/>
      <StudentEmailNotConfirmed
        open={openSENC}
        setOpen={setOpenSENC}
        action={'view deal details'}
        userId={user ? user.id : null}
      />
      <div className='lg:grid grid-cols-12 gap-4 container'>
        <div className='col-span-10'>
          <h1 className='text-2xl font-semibold text-grey400'>Chat</h1>
          <p className='text-grey400 font-light text-sm mb-3'>
            Discounts found by students
          </p>
          <div className='lg:grid grid-cols-4 gap-4'>
            {microBlogs.data.map((microBlog) => {
              return (
                <div className='mb-3' key={microBlog.id}>
                  {
                    <div className='px-3 lg:px-0'>
                      <img
                        className='h-36 w-full object-cover rounded-xl mb-3'
                        src={`${import.meta.env.VITE_FILE_URL}/microblogs/${
                          microBlog.image_url
                        }`}
                      />
                      <div>
                        <p className='mb-3 text-grey300'>{microBlog.title}</p>

                       
                        <div className='flex items-center justify-between mr-5 my-3'>
                          <div className='flex gap-3 text-grey200'>
                            <div className='flex items-center gap-1'>
                              <ThumbUpAltIcon fontSize='small' />
                              <span>{microBlog.micro_blog_favourite_count}</span>
                            </div>
                            <div className='flex items-center gap-1'>
                              <CommentIcon fontSize='small' />
                              <span>{microBlog.parent_comment_count}</span>
                            </div>
                          </div>
                          <ShareMicroBlog shareIconSize="small" shareIconStyles={'text-grey200'}/>
                        </div>

                        <Button
                          variant='outline'
                          className='border-burgundy500 border-2 text-burgundy500 hover:bg-burgundy100 hover:text-burgundy400 hover:border-burgundy400'
                          onClick={() => {
                            token && user.studentEmailVerified === 1
                            ? navigate(`/micro-blogs/${microBlog.id}`)
                            : token && user.studentEmailVerified === 0
                            ? setOpenSENC(true)
                            : setOpen(true)
                          }}
                        >
                          View details -&gt;
                        </Button>
                      </div>
                    </div>
                  }
                </div>
              );
            })}
          </div>
        </div>

        {/* deals */}
        <div className='col-span-2 px-3 lg:px-0'>
          <h2 className='text-lg font-semibold text-grey400'>Deals</h2>
          <div className='mt-3'>
            {!isLoading ? (
              filterApprovedDeals().slice(0, 2).map((deal) => (
                <div className='mb-3' key={deal.id}>
                  <img
                    src={`${import.meta.env.VITE_FILE_URL}/deals/${
                      deal.image_url
                    }`}
                    className='h-20 w-full object-cover rounded-md border'
                  />
                  <p className='font-medium text-grey300'>{deal.title}</p>
                  <button
                    onClick={() => {
                      token && user.studentEmailVerified === 1
                      ? handleViewDeal(deal.id)
                      : token && user.studentEmailVerified === 0
                      ? setOpenSENC(true)
                      : setOpen(true)
                    }}
                    className='text-burgundy400 underline text-sm font-bold cursor-pointer'
                  >
                    View
                  </button>
                </div>
              ))
            ) : (
              <p>No micro blogs available</p>
            )}
          </div>
          <Button className="w-full" onClick={()=> navigate('/deals')}>Return to Deals</Button>
        </div>
      </div>
    </Nav>
  );
};

export default MicroBlogs;
