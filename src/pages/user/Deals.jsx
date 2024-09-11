import { useState } from 'react';
import Nav from './Nav';
import Cookies from 'js-cookie';
import { Button } from '@/components/ui/button';
import UserNotLoggedIn from './UserNotLoggedIn';
import { useNavigate, useLocation } from 'react-router-dom';
import { useGetDealsQuery } from '@/redux/features/dealSlice';
import { useGetAllMicroBlogsQuery } from '@/redux/features/microBlogSlice';
import StudentEmailNotConfirmed from '@/components/StudentEmailNotConfirmed';
import { useGetAuthenticatedUserQuery } from '@/redux/features/userAuthSlice';
import { useStoreDealActivityMutation } from '@/redux/features/dealActivitySlice';
import CommentIcon from '@mui/icons-material/Comment';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ShareMicroBlog from '@/components/ShareMicroBlog';


const Deals = () => {
  const navigate = useNavigate();
  const location = useLocation();
  let token = Cookies.get('token');

  // for UserNotLoggedIn dialog
  const [open, setOpen] = useState(false);
  const [openSENC, setOpenSENC] = useState(false);

  const { data: user, isLoading: isLoadingUser } = useGetAuthenticatedUserQuery();
  const [storeDealActivity] = useStoreDealActivityMutation();

  const { data: deals, isLoading } = useGetDealsQuery();
  const { data: microBlogs, isLoading: isLoadingMicroBlogs } = useGetAllMicroBlogsQuery();

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
    storeDealActivity({deal_id: id})
      .unwrap()
      .then((response)=> console.log(response))
    navigate(`/deals/${id}`)
  }

  if (isLoading) {
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
      <div className='lg:grid grid-cols-12 gap-4'>
        <div className='col-span-10'>
          <div className='lg:grid grid-cols-4 gap-4'>
            {filterApprovedDeals().map((deal, idx) => {
              return (
                <div className='mb-3 first:col-span-2 ' key={deal.id}>
                  {idx === 0 ? (
                    <div className='flex justify-between relative '>
                      <div className='text-center flex-1 bg-burgundy100 lg:rounded-l-xl py-3 '>
                        <img
                          src={`${import.meta.env.VITE_FILE_URL}/logos/${deal.logo_url}`}
                          className='rounded-full h-24 w-24 mx-auto my-3 lg:my-9'
                        />
                        <h3 className='text-burgundy500 font-playfair text-xl lg:text-3xl mb-5'>
                          {deal.brand_name}
                        </h3>
                        <p className='text-grey350 text-sm lg:text-xl  mb-3'>
                          {deal.title}
                        </p>
                        <Button
                          variant='outline'
                          className='border-burgundy500 border-2 text-burgundy500 hover:bg-burgundy100 hover:text-burgundy400 hover:border-burgundy400 bg-transparent text-xs lg:text-base'
                          onClick={() =>{
                            token && user.studentEmailVerified === 1
                            ?  handleViewDeal(deal.id)
                            : token && user.studentEmailVerified === 0
                            ? setOpenSENC(true)
                            : setOpen(true)
                          }}
                        >
                          View details -&gt;
                        </Button>
                      </div>
                      <img
                        className='object-cover flex-1 lg:min-h-80 lg:h-80 lg:rounded-r-xl w-full'
                        src={`${import.meta.env.VITE_FILE_URL}/deals/${
                          deal.image_url
                        }`}
                      />
                    </div>
                  ) : (
                    <div className='px-3 lg:px-0'>
                      <img
                        src={`${import.meta.env.VITE_FILE_URL}/logos/${
                          deal.logo_url
                        }`}
                        className='h-16 w-16 rounded-full mx-auto -mb-8 z-10 relative'
                      />
                      <img
                        className='h-36 w-full object-cover rounded-xl mb-3'
                        src={`${import.meta.env.VITE_FILE_URL}/deals/${
                          deal.image_url
                        }`}
                      />
                      <div>
                        <p className='mb-3 text-grey300'>{deal.title}</p>
                        <Button
                          variant='outline'
                          className='border-burgundy500 border-2 text-burgundy500 hover:bg-burgundy100 hover:text-burgundy400 hover:border-burgundy400'
                          onClick={() =>{
                            token && user.studentEmailVerified === 1
                            ?  handleViewDeal(deal.id)
                            : token && user.studentEmailVerified === 0
                            ? setOpenSENC(true)
                            : setOpen(true)
                          }}
                        >
                          View details -&gt;
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* microblogs */}
        <div className='col-span-2 px-3 lg:px-0'>
          <h2 className='text-xl font-semibold text-grey400'>Chat</h2>
          <p className='text-grey400 font-light text-sm'>
            Discounts found by students
          </p>
          <div className='mt-3'>
            {!isLoadingMicroBlogs ? (
              <>
              {
                microBlogs.data.slice(0, 2).map((microBlog) => (
                  <div className='mb-3' key={microBlog.id}>
                    <img
                      src={`${import.meta.env.VITE_FILE_URL}/microblogs/${
                        microBlog.image_url
                      }`}
                      className='h-20 w-full object-cover rounded-md border cursor-pointer'
                      onClick={() => {
                        token && user.studentEmailVerified === 1
                        ?  navigate(`/micro-blogs/${microBlog.id}`)
                        : token && user.studentEmailVerified === 0
                        ? setOpenSENC(true)
                        : setOpen(true)
                      }}
                    />
                    <p className='font-medium text-grey300'>{microBlog.title}</p>
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
                    {/* <Button className='text-burgundy400 underline text-sm font-bold bg-transparent shadow-none' onClick={()=> navigate(`/micro-blogs/${microBlog.id}`)}>View</Button> */}
                    {/* <button
                      onClick={() => {
                        token && user.studentEmailVerified === 1
                        ?  navigate(`/micro-blogs/${microBlog.id}`)
                        : token && user.studentEmailVerified === 0
                        ? setOpenSENC(true)
                        : setOpen(true)
                      }}
                      className='text-burgundy400 underline text-sm font-bold cursor-pointer'
                    >
                      View
                    </button> */}
                  </div>
                ))
              }
              <Button className="w-full" onClick={()=> navigate('/micro-blogs')}>View all</Button>
              </>
            ) : (
              <p>No micro blogs available</p>
            )}
           
          </div>
        </div>
      </div>
    </Nav>
  );
};

export default Deals;
