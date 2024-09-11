import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useNavigate } from 'react-router-dom';

const UserNotLoggedIn = ({ open, setOpen, action }) => {
  const navigate = useNavigate();
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader className='mb-3'>
          <DialogTitle>You&apos;re not signed in!</DialogTitle>
          <DialogDescription>
            Please sign in or create an account to {action}
            {/* view deal details */}
          </DialogDescription>
        </DialogHeader>
        <Button onClick={() => navigate('/login')}>Sign in</Button>
        <p className='text-center text-sm text-grey300'>
          Don&apos;t have an account?
        </p>
        <Button
          variant='outline'
          className='hover:bg-burgundy100 border-burgundy100 text-burgundy400 hover:text-burgundy400'
          onClick={() => navigate('/register')}
        >
          Create an account
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default UserNotLoggedIn;
