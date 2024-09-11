import { useState, useEffect } from 'react';
import Nav from './Nav';
import {
  useGetDealByIdWithFavouriteQuery,
  useFavouriteDealMutation,
  useUnFavouriteDealMutation,
} from '@/redux/features/dealSlice';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Button } from '@/components/ui/button';
import { useParams } from 'react-router-dom';

const DealDetails = () => {
  const { id } = useParams();
  const [isFavourite, setIsFavourite] = useState(false);
  const { data: deal, isLoading } = useGetDealByIdWithFavouriteQuery({ id });
  console.log(deal);
  const [favouriteDeal] = useFavouriteDealMutation();
  const [unFavouriteDeal] = useUnFavouriteDealMutation();

  const handleCopyToClipboard = (textToCopy) => {
    // Create a temporary textarea element
    const textarea = document.createElement('textarea');

    // Set the value of the textarea to the text you want to copy
    textarea.value = textToCopy;

    // Make the textarea invisible
    textarea.style.position = 'absolute';
    textarea.style.left = '-9999px';

    // Append the textarea to the document
    document.body.appendChild(textarea);

    // Select and copy the text from the textarea
    textarea.select();
    document.execCommand('copy');

    // Remove the textarea from the document
    document.body.removeChild(textarea);

    // Optionally, you can provide user feedback
    alert('Discount code copied to clipboard!');
  };

  useEffect(() => {
    if (deal) {
      setIsFavourite(deal.data.isFavourite);
    }
  }, [deal]);

  if (isLoading) return <p>Loading...</p>;

  return (
    <Nav>
      {console.log(deal.data.isFavourite)}
      <div>
        <img
          src={`${import.meta.env.VITE_FILE_URL}/deals/${deal.data.image_url}`}
          className='w-full h-40 absolute left-0 right-0 object-cover top-16'
        />
        <div className='w-full h-40 bg-autumn100 absolute left-0 right-0 top-16 opacity-80'></div>
      </div>
      {isFavourite ? (
        <FavoriteIcon
          className='absolute top-52 right-2 lg:right-96 z-30 ml-auto cursor-pointer'
          onClick={() => {
            unFavouriteDeal({ id: deal.data.id })
              .unwrap()
              .then((response) => {
                if (response.message === 'Removed deal as favourite') {
                  setIsFavourite(false);
                }
              });
          }}
        />
      ) : (
        <FavoriteBorderIcon
          className='absolute top-52 right-2 lg:right-96 z-10 ml-auto cursor-pointer '
          onClick={() => {
            console.log('getting clicked');
            favouriteDeal({ deal_id: deal.data.id })
              .unwrap()
              .then((response) => {
                if (response.message === 'Deal favourited') {
                  setIsFavourite(true);
                }
              })
              .catch((error) => console.log(error));
          }}
        />
      )}

      <div className='z-10 relative text-center text-grey300'>
        <img
          className='mx-auto rounded-lg max-h-96 lg:max-w-96 object-cover mb-3 min-h-40 mt-10'
          src={`${import.meta.env.VITE_FILE_URL}/deals/${deal.data.image_url}`}
        />
        <h1 className='text-3xl font-playfair font-semibold text-burgundy500 mb-3'>
          {deal.data.brand_name}
        </h1>
        <h3 className='text-xl font-playfair font-semibold text-grey300 mb-3'>
          {deal.data.title}
        </h3>
        <div className="flex justify-center my-7">
          <p className="max-w-[52ch]">{deal.data.description}</p>
        </div>
        {deal.data.discount_code ? (
          <>
            <p className='text-sm mb-3 mt-3'>View code below</p>
            <div className='flex border-2 border-burgundy400 bg-burgundy100 w-fit mx-auto rounded-lg gap-16 mb-10'>
              <span className='text-burgundy400 font-semibold text-xl p-2'>
                {deal.data.discount_code}
              </span>
              <div
                className='bg-burgundy400 p-2 text-white cursor-pointer'
                onClick={() => handleCopyToClipboard(deal.data.discount_code)}
              >
                <ContentCopyIcon />
              </div>
            </div>
          </>
        ) : (
          <>
            <p className='text-sm mb-3 mt-3'>
              Click the button below to access the discount
            </p>
            <Button
              className='font-semibold mb-10'
              onClick={() => window.open(deal.data.discount_url)}
            >
              Open website
            </Button>
          </>
        )}
      </div>
    </Nav>
  );
};

export default DealDetails;
