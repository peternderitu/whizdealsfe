import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  useGetReportingReasonsQuery,
  useCreateMicroBlogReportMutation,
} from '@/redux/features/microBlogReportSlice';

import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FlagOutlinedIcon from '@mui/icons-material/FlagOutlined';

const TellUsWhyDialog = ({ open, setOpen }) => {
  const { id } = useParams();
  const { toast } = useToast();
  const [reason, setReason] = useState('');
  const [otherReason, setOtherReason] = useState('');
  const [createMicroBlogReport] = useCreateMicroBlogReportMutation();
  const { data, isLoading } = useGetReportingReasonsQuery();
  console.log(data);

  const report = (e) => {
    e.preventDefault();
    createMicroBlogReport({
      micro_blogs_id: id,
      reporting_reasons_id: reason,
      reason: otherReason,
    })
      .unwrap()
      .then((response) => {
        if (response.message === 'Added micro blog report') {
          toast({
            description: 'Your report has been sent.',
          });
        } else {
          toast({
            variant: 'destructive',
            title: 'Uh oh! Something went wrong.',
            description: 'Could not send report. Try again later.',
          });
        }
      });
  };

  if (isLoading) {
    return <p>Loading ...</p>;
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Report Community Deal</DialogTitle>
          <DialogDescription>
            Let us know why you are reporting this deal.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={report}>
          <select
            className='block w-full mt-1 p-2 rounded-lg bg-white border border-gray-300 focus-visible:ring-0 focus-visible:border-grey350'
            onChange={(e) => setReason(e.target.value)}
          >
            <option disabled selected>
              Select a reason
            </option>
            {data.data.map((reportingReason) => (
              <option key={reportingReason.id} value={reportingReason.id}>
                {reportingReason.name}
              </option>
            ))}
            <option value='other'>Other</option>
          </select>

          {reason === 'other' ? (
            <Textarea
              placeholder='Type your reason here.'
              className='mt-3'
              value={otherReason}
              onChange={(e) => setOtherReason(e.target.value)}
            />
          ) : null}

          <Button
            type='submit'
            className='w-full mt-3'
            // onClick={() => {
            //   toast({
            //     description: 'Your message has been sent.',
            //   });
            // }}
          >
            Submit
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

const ReportMicroBlog = () => {
  const [open, setOpen] = useState(null);

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <MoreVertIcon className='cursor-pointer' />
        </DropdownMenuTrigger>
        <DropdownMenuContent className='w-56' side='right'>
          <DropdownMenuItem
            className='cursor-pointer'
            onClick={() => setOpen(true)}
          >
            <FlagOutlinedIcon /> Report Community Deal
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <TellUsWhyDialog open={open} setOpen={setOpen} />
    </div>
  );
};

export default ReportMicroBlog;
