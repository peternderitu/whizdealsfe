import { useState, useEffect } from 'react';

import {
  useGetMicroBlogByIdQuery,
  useFavouriteMicroBlogMutation,
  useUnFavouriteMicroBlogMutation,
} from '@/redux/features/microBlogSlice';
import {
  useGetAllCommentsQuery,
  useCreateCommentMutation,
  useCreateReplyMutation,
} from '@/redux/features/commentSlice';

import Nav from './Nav';
import { useParams } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import SendIcon from '@mui/icons-material/Send';
import { Button } from '@/components/ui/button';
// import ShareIcon from '@mui/icons-material/Share';
import { Textarea } from '@/components/ui/textarea';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareMicroBlog from '@/components/ShareMicroBlog';
import ReportMicroBlog from '@/components/ReportMicroBlog';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const MicroBlogDetails = () => {
  const { id } = useParams();
  const [reply, setReply] = useState('');
  const [error, setError] = useState(null);
  const [comment, setComment] = useState('');
  const [viewReplies, setViewReplies] = useState(null);
  const [isFavourite, setIsFavourite] = useState(false);
  const [viewReplyBox, setViewReplyBox] = useState(false);

  const { data: microBlog, isLoading } = useGetMicroBlogByIdQuery({ id });
  const { data: comments, isLoading: isLoadingComments } =
    useGetAllCommentsQuery({ micro_blog_id: id });

  const [createReply] = useCreateReplyMutation();
  const [createComment] = useCreateCommentMutation();
  const [favouriteMicroBlog] = useFavouriteMicroBlogMutation();
  const [unFavouriteMicroBlog] = useUnFavouriteMicroBlogMutation();

  const addComment = () => {
    if (comment === '') {
      setError('Add comment');
    } else {
      createComment({ micro_blog_id: id, content: comment })
        .unwrap()
        .then(() => setComment(''));
    }
  };

  const handleGetReplies = (id) => {
    setViewReplies(id);
  };

  const sendReply = (id) => {
    createReply({ parent_comment_id: id, content: reply })
      .unwrap()
      .then(() => {
        setReply('');
        setViewReplyBox(null);
      });
  };

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
    if (microBlog) {
      setIsFavourite(microBlog.data.isFavourite);
    }
  }, [microBlog]);

  if (isLoading || isLoadingComments) {
    return <p>Loading...</p>;
  }

  return (
    <Nav>
      <div>
        <img
          src={`${import.meta.env.VITE_FILE_URL}/microblogs/${
            microBlog.data.image_url
          }`}
          className='w-full h-40 absolute left-0 right-0 object-cover top-16'
        />
        <div className='w-full h-40 bg-autumn100 absolute left-0 right-0 top-16 opacity-80'></div>
      </div>

      

      <div className='z-10 relative text-center text-grey300'>
        <img
          className='mx-auto rounded-lg max-h-96 lg:max-w-96 object-cover mb-3 min-h-40 mt-10'
          src={`${import.meta.env.VITE_FILE_URL}/microblogs/${
            microBlog.data.image_url
          }`}
        />
        <h1 className='text-3xl font-playfair font-semibold text-burgundy500 mb-3 max-w-[32ch] mx-auto'>
          {microBlog.data.title}
        </h1>
        <div className="flex justify-center my-7">
          <div dangerouslySetInnerHTML={{ __html: microBlog.data.description }} className="max-w-[52ch]" />
        </div>

        {microBlog.data.discount_code ? (
          <>
            <p className='text-sm mb-3 mt-3'>View code below</p>
            <div className='flex border-2 border-burgundy300 bg-burgundy100 w-fit mx-auto rounded-lg gap-16 mb-3'>
              <span className='text-burgundy300 font-semibold text-xl p-2'>
                {microBlog.data.discount_code}
              </span>
              <div
                className='bg-burgundy300 p-2 text-white cursor-pointer'
                onClick={() =>
                  handleCopyToClipboard(microBlog.data.discount_code)
                }
              >
                <ContentCopyIcon />
              </div>
            </div>
          </>
        ) : null}

        <>
          <p className='text-sm mb-3 mt-3'>
            Click the button below to access the discount
          </p>
          <Button
            className='font-semibold'
            onClick={() => window.open(microBlog.data.discount_url)}
          >
            Open website
          </Button>
        </>
      </div>

      <section className='mt-12 lg:container px-3 lg:px-40'>
        {/* micro blog actions */}
        <div className='flex flex-col justify-center items-end gap-10 absolute top-[232px] z-10 '>
          {isFavourite ? (
            <FavoriteIcon
              className='cursor-pointer'
              onClick={() => {
                unFavouriteMicroBlog({ id: microBlog.data.id })
                  .unwrap()
                  .then((response) => {
                    if (
                      response.message === 'Removed micro blog as favourite'
                    ) {
                      setIsFavourite(false);
                    }
                  });
              }}
            />
          ) : (
            <FavoriteBorderIcon
              className='cursor-pointer '
              onClick={() => {
                console.log('getting clicked');
                favouriteMicroBlog({ micro_blog_id: microBlog.data.id })
                  .unwrap()
                  .then((response) => {
                    if (response.message === 'Micro blog favourited') {
                      setIsFavourite(true);
                    }
                  })
                  .catch((error) => console.log(error));
              }}
            />
          )}
          {/* <ShareIcon /> */}
          <ShareMicroBlog/>
          <ReportMicroBlog />
        </div>

        {/* comments */}
        <h3 className='font-medium'>Add a comment</h3>
        <div className='flex items-center gap-4 justify-center'>
          <Textarea
            placeholder='Type your comment here.'
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <SendIcon className='cursor-pointer' onClick={addComment} />
        </div>
        {error ? <p className='text-burgundy300 text-sm'>{error}</p> : null}
        <div className='mt-5'>
          <div className='flex justify-between items-center'>
            <h3 className='font-semibold text-lg mb-2'>Comments</h3>
            {/* add hamburger menu here */}
            {/* <MoreVertIcon className="cursor-pointer" /> */}
            {/* <ReportMicroBlog/> */}
          </div>
          <div className='text-grey300'>
            {comments.data.map((comment) => (
              <>
                <div
                  key={comment.id}
                  className='p-3 bg-grey50 rounded-lg flex items-center gap-4'
                >
                  {comment.user ? (
                    comment.user.profile_picture ? (
                      <img
                        className='h-11 w-11 rounded-full'
                        src='beauty.png'
                      />
                    ) : (
                      <div className='bg-burgundy100 rounded-full w-10 h-10 flex items-center justify-center text-center'>
                        <p className='font-playfair text-burgundy500 text-lg'>
                          {comment.user.first_name[0]}
                        </p>
                      </div>
                    )
                  ) : null}
                  <div>
                    <p className='text-sm font-semibold'>
                      {comment.user.first_name} {comment.user.last_name}
                    </p>
                    <p>{comment.content}</p>
                  </div>
                </div>
                <div className='mt-3 flex gap-4 items-center'>
                  {/* <>Like</>
                  <>Dislike</> */}
                  <button
                    className='px-3 py-2 hover:bg-grey50 rounded-xl font-semibold text-sm'
                    onClick={() => setViewReplyBox(comment.id)}
                  >
                    Reply
                  </button>
                </div>

                {viewReplyBox === comment.id ? (
                  <>
                    <Input
                      placeholder='Add a reply'
                      value={reply}
                      onChange={(e) => setReply(e.target.value)}
                    />
                    <div className='my-3'>
                      <button
                        className='py-2 px-3 bg-grey50 text-sm rounded-lg mr-3'
                        onClick={() => setViewReplyBox(null)}
                      >
                        Cancel
                      </button>
                      <button
                        className='py-2 px-3 bg-grey50 text-sm rounded-lg'
                        onClick={() => sendReply(comment.id)}
                      >
                        Send
                      </button>
                    </div>
                  </>
                ) : null}

                <div className='mb-3'>
                  <button
                    className='cursor-pointer text-grey400 font-semibold text-sm'
                    onClick={() => handleGetReplies(comment.id)}
                  >
                    View replies
                  </button>
                  <div
                    className={`${
                      viewReplies === comment.id ? 'block' : 'hidden'
                    } ml-3 p-3`}
                  >
                    {comment.replies.length > 0 ? (
                      comment.replies.map((reply) => (
                        <p
                          key={reply.id}
                          className='p-3 bg-grey50 rounded-lg mb-3'
                        >
                          {reply.content}
                        </p>
                      ))
                    ) : (
                      <p className='p-3 bg-grey50 rounded-lg'>No replies yet</p>
                    )}
                  </div>
                </div>
              </>
            ))}
          </div>
        </div>
      </section>
    </Nav>
  );
};

export default MicroBlogDetails;
