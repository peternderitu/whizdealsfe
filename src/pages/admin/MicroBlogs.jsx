import { useState } from 'react';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';

import SideNav from "./SideNav";
import { Button } from "@/components/ui/button";
import DeleteIcon from '@mui/icons-material/Delete';
import { useToast } from '@/components/ui/use-toast';
import { useGetAllMicroBlogsQuery, useDeleteMicroBlogAdminMutation } from "@/redux/features/microBlogSlice";

const DeleteMicroBlog = ({ open, setOpen, id }) => {
  const { toast } = useToast();
  const [deleteMicroBlogAdmin] = useDeleteMicroBlogAdminMutation();

  const handleDelete = (id) => {
    deleteMicroBlogAdmin({ id })
      .unwrap()
      .then((response) => {
        if (response.message === 'Deleted micro blog') {
          setOpen(false);
          toast({
            title: 'Success!',
            description: "You've deleted the deal successfully.",
          });
        } else {
          setOpen(false);
          toast({
            variant: 'destructive',
            title: 'Uh oh! Something went wrong.',
            description:
              'There was a problem deleting the deal. Try again later',
          });
        }
      })
      .catch((error) => {
        console.log(error);
        setOpen(false);
        toast({
          variant: 'destructive',
          title: 'Uh oh! Something went wrong.',
          description: 'There was a problem deleting the deal. Try again later',
        });
      });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className='w-96'>
        <DialogHeader>
          <DialogTitle>Delete this deal?</DialogTitle>
        </DialogHeader>
        <p>You will not be able to recover this deal</p>
        <DialogFooter className=''>
          <Button
            className='bg-grey200 hover:bg-grey300'
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button
            className='bg-red-500 hover:bg-red-600'
            onClick={() => handleDelete(id)}
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const MicroBlogs = () => {
  const [microBlogId, setMicroBlogId] = useState();
  const [open, setOpen] = useState(false);
  const {data: microBlogs, isLoading} = useGetAllMicroBlogsQuery();

  if(isLoading) return <p>Loading ...</p>
  return (
    <SideNav>
      Microblogs
      {/* table */}
      {/* fetch and map over all micro blogs */}
     
      <Table>
          <TableCaption>A list of your recent deals.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className='w-[100px]'>#</TableHead>
              <TableHead>Title</TableHead>

              <TableHead className='hidden lg:table-cell'>
                Description
              </TableHead>
              <TableHead className='hidden lg:table-cell'>Category</TableHead>
              <TableHead className='hidden lg:table-cell'>Original Price</TableHead>
              <TableHead className='hidden lg:table-cell'>Sale Price</TableHead>

              <TableHead className='w-[100px]'>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {microBlogs.data.map((microBlog) => (
              <TableRow key={microBlog.id}>
                <TableCell className='font-medium'>
                  <img
                    className='h-12 rounded-sm'
                    src={`${import.meta.env.VITE_FILE_URL}/microblogs/${
                      microBlog.image_url
                    }`}
                  />
                </TableCell>
                <TableCell>{microBlog.title}</TableCell>
                <TableCell className='hidden lg:table-cell'>
                  {microBlog.description}
                </TableCell>
                
                <TableCell className='hidden lg:table-cell'>
                  {microBlog.category.category_name}
                </TableCell>
                <TableCell className='hidden lg:table-cell'>
                  ${parseInt(microBlog.original_price)}
                </TableCell>
                <TableCell className='hidden lg:table-cell'>
                  ${parseInt(microBlog.discounted_price)}
                </TableCell>
                <TableCell>
                  {/* <VisibilityIcon
                    fontSize='small'
                    className='text-grey300 cursor-pointer mx-1'
                    onClick={() => navigate(`/do/deal-details/${deal.id}`)}
                  />
                  <EditIcon
                    fontSize='small'
                    className='text-grey300 cursor-pointer mx-1'
                    onClick={() => initiateEditDeal(deal)}
                  /> */}
                  <DeleteIcon
                    fontSize='small'
                    className='text-grey300 cursor-pointer mx-1'
                    onClick={() => {
                      setMicroBlogId(microBlog.id)
                      setOpen(true);
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
            <DeleteMicroBlog open={open} setOpen={setOpen} id={microBlogId}/>
          </TableBody>
        </Table>
    </SideNav>
  )
}

export default MicroBlogs