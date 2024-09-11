import { useState, useEffect } from 'react';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

import Cookies from 'js-cookie';
import XIcon from '@mui/icons-material/X';
import { Label } from '@/components/ui/label';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import MenuIcon from '@mui/icons-material/Menu';
import UserNotLoggedIn from './UserNotLoggedIn';
import { Textarea } from '@/components/ui/textarea';
import SchoolIcon from '@mui/icons-material/School';
import CommentIcon from '@mui/icons-material/Comment';
import ShareMicroBlog from '@/components/ShareMicroBlog';
import InstagramIcon from '@mui/icons-material/Instagram';
import NavProfilePhoto from '@/components/NavProfilePhoto';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import { useGetDealsQuery } from '@/redux/features/dealSlice';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import { useGetAllCategoriesQuery } from '@/redux/features/categorySlice';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useGetAllMicroBlogsQuery } from '@/redux/features/microBlogSlice';
import StudentEmailNotConfirmed from '@/components/StudentEmailNotConfirmed';
import { useGetAuthenticatedUserQuery } from '@/redux/features/userAuthSlice';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useStoreDealActivityMutation } from '@/redux/features/dealActivitySlice';

const Home = () => {
  const navigate = useNavigate();
  let token = Cookies.get('token');

  // for UserNotLoggedIn dialog
  const [open, setOpen] = useState(false);
  const [openSENC, setOpenSENC] = useState(false);
  const [action, setAction] = useState('create a deal');
  const [showNav, setShowNav] = useState(false);
  const [scrolling, setScrolling] = useState(false);

  const [storeDealActivity] = useStoreDealActivityMutation();

  const { data: user, isLoading: isLoadingUser } =
    useGetAuthenticatedUserQuery();
  const { data: categories, isLoading } = useGetAllCategoriesQuery();
  const { data: deals, isLoading: isLoadingDeals } = useGetDealsQuery();
  const { data: microBlogs, isLoading: isLoadingMicroBlogs } =
    useGetAllMicroBlogsQuery();

  const filterApprovedDeals = () => {
    return deals.data.length > 0
      ? deals.data.slice(0, 5).filter((deal) => deal.status === 1)
      : [];
  };

  const handleViewDeal = (id) => {
    storeDealActivity({ deal_id: id })
      .unwrap()
      .then((response) => console.log(response));
    navigate(`/deals/${id}`);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  if (isLoading || isLoadingDeals || isLoadingUser) return <p>Loading...</p>;

  return (
    <>
      <UserNotLoggedIn open={open} setOpen={setOpen} action={action} />
      <StudentEmailNotConfirmed
        open={openSENC}
        setOpen={setOpenSENC}
        action={action}
        userId={user ? user.id : null}
      />
      {/* hero */}
      <div className='lg:hidden'>
        <MenuIcon
          className='fixed top-4 left-4 z-30 text-grey300 '
          onClick={() => setShowNav(!showNav)}
        />
      </div>

      <nav
        className={`${
          showNav ? 'block bg-white' : 'hidden'
        } lg:flex justify-between items-center fixed top-0 z-20 w-full p-4 transition duration-300 ease-in-out ${
          scrolling ? 'bg-white' : null
        }`}
      >
        <a
          href='/'
          className={`transition duration-300 ease-in-out text-5xl font-medium block mt-8 lg:mt-0 text-burgundy500 font-playfair`}
        >
          <img src='/whizDealsWatermark.png' className='h-20' />
        </a>

        {/* categories */}
        <div className='my-3 lg:my-0'>
          {categories.data.slice(0, 3).map((category) => {
            return (
              <a
                key={category.id}
                href={`/deals#${category.category_name}`}
                className='mx-3 transition duration-300 ease-in-out hover:text-burgundy500 hover:underline block lg:inline'
              >
                {category.category_name}
              </a>
            );
          })}
          <a
            href='#categories'
            className='mx-3 transition duration-300 ease-in-out hover:text-burgundy500 hover:underlineblock lg:inline'
          >
            More
          </a>
        </div>

        <div className='flex items-end gap-5'>
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
                setAction('create a deal');
                token && user.studentEmailVerified === 1
                  ? navigate('/micro-blogs/create')
                  : token && user.studentEmailVerified === 0
                  ? setOpenSENC(true)
                  : setOpen(true);
              }}
            />
            <span className='text-sm font-light text-grey300'>Post a Deal</span>
          </div>
          {/* <div className="flex flex-col items-center justify-end"> */}
          <NavProfilePhoto token={token} user={user} />
          {/* <span className="text-sm font-light text-grey300">Account</span> */}
          {/* </div> */}
        </div>
      </nav>

      <div
        className='bg-no-repeat bg-cover mt-24 text-center py-32 px-3'
        style={{
          backgroundImage:
            "linear-gradient(rgba(255, 255, 255, 0.6),rgba(255, 255, 255, 0.6)),url('/heroImg3.jpg')",
        }}
      >
        <h3 className='text-xl text-burgundy500 font-bold mb-3 lg:text-3xl z-10'>
          Simply the best student deals in Canada!
          {/* Great student discounts from <br /> your favourite brands! */}
        </h3>
        <p className='text-grey300 text-sm font-semibold lg:text-lg lg:w-[52ch] block mx-auto'>
          Make the best of your student life with amazing deals, found by the
          WhizDeals community and scouts, right here on WhizDeals.ca!
        </p>
      </div>

      {/* Deals & Microblog */}
      <section className='pt-3 container'>
        <div className='lg:grid grid-cols-12 gap-4'>
          {/* deals */}
          <div className='col-span-8 mb-3'>
            <h2 className='lg:text-xl font-semibold text-grey400 mb-3'>
              Deals from your favourite brands
            </h2>

            <div className='lg:grid grid-cols-3 gap-4'>
              {filterApprovedDeals().map((deal, idx) => {
                return (
                  <div className='mb-3 first:col-span-2 ' key={deal.id}>
                    {idx === 0 ? (
                      <div className='flex justify-between relative '>
                        <div className='text-center flex-1 bg-burgundy100 rounded-l-xl py-3 '>
                          <img
                            src={`${import.meta.env.VITE_FILE_URL}/logos/${
                              deal.logo_url
                            }`}
                            className='rounded-full h-16 w-16 mx-auto my-3 lg:my-9 object-cover'
                          />
                          <h3 className='text-burgundy500 font-playfair text-xl lg:text-3xl mb-5'>
                            {deal.brand_name}
                          </h3>
                          <p className='text-grey350 text-sm lg:text-xl mb-3'>
                            {deal.title}
                          </p>
                          <Button
                            variant='outline'
                            className='border-burgundy500 border-2 text-burgundy500 hover:bg-burgundy100 hover:text-burgundy400 hover:border-burgundy400 bg-transparent text-xs lg:text-base'
                            onClick={() => {
                              // token ? handleViewDeal(deal.id) : setOpen(true)
                              setAction('view deal details');
                              token && user.studentEmailVerified === 1
                                ? handleViewDeal(deal.id)
                                : token && user.studentEmailVerified === 0
                                ? setOpenSENC(true)
                                : setOpen(true);
                            }}
                          >
                            View details -&gt;
                          </Button>
                        </div>
                        <img
                          className='object-cover flex-1 lg:h-[19rem] lg:min-h-[19rem] rounded-r-xl w-full'
                          src={`${import.meta.env.VITE_FILE_URL}/deals/${
                            deal.image_url
                          }`}
                        />
                      </div>
                    ) : (
                      <div className=''>
                        {deal.logo_url ? (
                          <img
                            src={`${import.meta.env.VITE_FILE_URL}/logos/${
                              deal.logo_url
                            }`}
                            className='h-16 w-16 rounded-full mx-auto -mb-8 z-10 relative'
                          />
                        ) : (
                          <img
                            src='beauty.png'
                            className='h-16 w-16 rounded-full mx-auto -mb-8 z-10 relative'
                          />
                        )}
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
                            onClick={() => {
                              // token ? handleViewDeal(deal.id) : setOpen(true)
                              setAction('view deal details');
                              token && user.studentEmailVerified === 1
                                ? handleViewDeal(deal.id)
                                : token && user.studentEmailVerified === 0
                                ? setOpenSENC(true)
                                : setOpen(true);
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
            <div className='lg:grid grid-cols-3 gap-4'>
              <Button
                className='w-full col-span-1'
                onClick={() => navigate('/deals')}
              >
                View all Deals
              </Button>
            </div>
          </div>

          {/* microblogs */}
          <div className='col-span-4 mb-3'>
            <h2 className='text-xl font-semibold text-grey400'>Chat</h2>
            <p className='text-grey400 lg:font-semibold text-sm'>
              Discounts found by students and WhizDeals scouts
            </p>
            <Button
              className='lg:font-semibold mt-3'
              onClick={() => {
                // token ? handleViewDeal(deal.id) : setOpen(true)
                setAction('create a deal');
                token && user.studentEmailVerified === 1
                  ? navigate('/micro-blogs/create')
                  : token && user.studentEmailVerified === 0
                  ? setOpenSENC(true)
                  : setOpen(true);
              }}
            >
              Post a deal
            </Button>
            <div className='mt-3 grid lg:grid-cols-2 gap-2'>
              {!isLoadingMicroBlogs ? (
                <>
                  {microBlogs.data.slice(0, 6).map((microBlog) => (
                    <>
                      <div className='mb-3' key={microBlog.id}>
                        <img
                          src={`${import.meta.env.VITE_FILE_URL}/microblogs/${
                            microBlog.image_url
                          }`}
                          className='h-20 w-full object-cover rounded-md border cursor-pointer'
                          onClick={() => {
                            // token ? handleViewDeal(deal.id) : setOpen(true)
                            setAction('view deal details');
                            token && user.studentEmailVerified === 1
                              ? navigate(`/micro-blogs/${microBlog.id}`)
                              : token && user.studentEmailVerified === 0
                              ? setOpenSENC(true)
                              : setOpen(true);
                          }}
                        />
                        <p className='font-medium text-grey300'>
                          {microBlog.title}
                        </p>
                        <div className='flex items-center justify-between mr-5 my-3'>
                          <div className='flex gap-3 text-grey200'>
                            <div className='flex items-center gap-1'>
                              <ThumbUpAltIcon fontSize='small' />
                              <span>
                                {microBlog.micro_blog_favourite_count}
                              </span>
                            </div>
                            <div className='flex items-center gap-1'>
                              <CommentIcon fontSize='small' />
                              <span>{microBlog.parent_comment_count}</span>
                            </div>
                          </div>
                          <ShareMicroBlog
                            shareIconSize='small'
                            shareIconStyles={'text-grey200'}
                          />
                        </div>
                        {/* <button
                          // href={`/micro-blogs/${microBlog.id}`}
                          onClick={() => {
                            // token ? handleViewDeal(deal.id) : setOpen(true)
                            setAction('view deal details');
                            token && user.studentEmailVerified === 1
                              ? navigate(`/micro-blogs/${microBlog.id}`)
                              : token && user.studentEmailVerified === 0
                              ? setOpenSENC(true)
                              : setOpen(true);
                          }}
                          className='text-burgundy400 underline text-sm font-bold cursor-pointer'
                        >
                          View
                        </button> */}
                      </div>
                    </>
                  ))}
                  <button
                    onClick={() => navigate(`/micro-blogs`)}
                    className='text-burgundy400 p-2 rounded-lg text-sm font-bold cursor-pointer border-2 border-burgundy200 
                                hover:border-burgundy400 transition col-span-1'
                  >
                    View all Chats
                  </button>
                </>
              ) : (
                <p>No micro blogs available</p>
              )}
            </div>
          </div>
        </div>
        <div className='py-7'>
          {/* <Button className='mx-auto block' onClick={() => navigate('/deals')}>
            View all deals
          </Button> */}
        </div>
      </section>

      {/* why choose us */}
      <section className='pt-24 bg-grey50 pb-24'>
        <h2 className='text-center text-burgundy500 text-3xl lg:text-4xl mb-12'>
          Why shop on WhizDeals
        </h2>
        <div className='lg:flex gap-24 justify-center px-8'>
          <Card className='my-3'>
            <img
              src='wcu1.png'
              alt='students viewing sunset'
              className='w-full rounded-t-md'
            />
            <CardHeader>
              <CardTitle className='text-burgundy500 text-xl'>
                Student-Centric Deals
              </CardTitle>
            </CardHeader>
            <CardContent className='w-[25ch] text-grey200 '>
              Our platform is designed with students in mind. Discover deals
              that cater to your lifestyle, from study essentials to
              entertainment and beyond.
            </CardContent>
          </Card>
          <Card className='my-3'>
            <img
              src='wcu2.png'
              alt='student raising arms while walking'
              className='w-full rounded-t-md'
            />
            <CardHeader>
              <CardTitle className='text-burgundy500 text-xl'>
                Verified Discounts
              </CardTitle>
            </CardHeader>
            <CardContent className='w-[25ch] text-grey200 '>
              Rest assured, every deal on our platform is carefully curated and
              verified to ensure you get the best discounts available.
            </CardContent>
          </Card>
          <Card className='my-3'>
            <img
              src='wcu3.png'
              alt='students happily chatting while using device'
              className='w-full rounded-t-md'
            />
            <CardHeader>
              <CardTitle className='text-burgundy500 text-xl'>
                Easy-to-Use Interface
              </CardTitle>
            </CardHeader>
            <CardContent className='w-[25ch] text-grey200 '>
              Navigate our user-friendly interface effortlessly. Find deals,
              redeem discounts and explore a world of savings with just a few
              clicks.
            </CardContent>
          </Card>
        </div>
      </section>

      {/* categories */}
      <section className='pt-24 pb-24' id='categories'>
        <h2 className='text-center text-burgundy500 text-3xl lg:text-4xl mb-12'>
          Categories
        </h2>
        <div className='grid place-items-center px-4'>
          <div className='grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-32 md:gap-y-8 mx-auto'>
            {categories.data.map((category) => {
              return (
                <div className='relative group' key={category.id}>
                  <img
                    // h- 180, w-170
                    className='max-h-48 w-full object-cover'
                    src={`${import.meta.env.VITE_FILE_URL}/categories/${
                      category.image_url
                    }`}
                    alt='drinks and food category'
                  />
                  <div className='absolute top-0 z-10 h-full border w-full text-white p-3 bg-translusentBlack  flex-col justify-end items-center hidden group-hover:flex'>
                    {/* style={{background: 'rgba(0,0,0, )'}} */}
                    <p className=''>{category.category_name}</p>
                    <button
                      className='my-3 text-sm font-semibold bg-burgundy300 rounded-md w-fit px-3 py-1'
                      onClick={() =>
                        navigate(`/deals#${category.category_name}`)
                      }
                    >
                      View more
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* connect with us */}
      <section className='bg-redFlowBg text-white bg-cover bg-no-repeat py-12'>
        <h3 className='text-center text-3xl lg:text-4xl py-12 '>
          Connect With Us
        </h3>
        {/* social icons */}
        <div className='lg:w-3/5 mx-auto'>
          <div className='flex justify-around mb-16 mt-4'>
            <a href='#'>
              <InstagramIcon />
            </a>
            <a href='#'>
              <FacebookRoundedIcon />
            </a>
            <a href='#'>
              <XIcon />
            </a>
          </div>
          <div>
            <Button
              className='mx-auto block lg:w-1/3 my-3'
              onClick={() => navigate('/do/register')}
            >
              Register as a vendor
            </Button>
          </div>
          <form className='px-8 lg:px-36'>
            <Label className='mb-3 block text-xl'>Send us a message</Label>
            <Textarea
              className='bg-white h-32 text-grey300'
              placeholder='Type your message here.'
            />
            <Button className='w-full my-4'>Send</Button>
          </form>
        </div>
      </section>
    </>
  );
};

export default Home;
