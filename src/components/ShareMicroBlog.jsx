import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import ShareIcon from '@mui/icons-material/Share';
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import LinkIcon from '@mui/icons-material/Link';
import { useToast } from '@/components/ui/use-toast';


const ShareMicroBlog = ({shareIconSize, shareIconStyles}) => {
  const currentUrl = window.location.href;
  const { toast } = useToast();


  const shareInNewTab = (link) => {
    console.log(link);
    window.open(link, '_blank');
  };

  const copyLink = (textToCopy) => {
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        toast({
          description: 'Link copied!',
        });
      })
      .catch((err) => {
        console.error('Failed to copy text: ', err);
        toast({
          variant: 'destructive',
          title: 'Uh oh! Something went wrong.',
          description: 'Failed to copy text.',
        });
      });
  };

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <ShareIcon className={'cursor-pointer ' + shareIconStyles} fontSize={shareIconSize}/>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='w-56' side='right'>
          {/* facebook */}
          {/* https://www.facebook.com/sharer/sharer.php?u=http://localhost:5173/micro-blogs/3 */}
          <DropdownMenuItem className='cursor-pointer'
          onClick={() =>
            shareInNewTab(
              `https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`
            )
          }
          >
            <FacebookIcon fontSize='small' /> &nbsp; Facebook
          </DropdownMenuItem>

          {/* x or twitter */}
          <DropdownMenuItem
            className='cursor-pointer'
            onClick={() =>
              shareInNewTab(
                `https://twitter.com/intent/tweet?url=${currentUrl}&text=Check%20out%20this%20deal!%0A`
              )
            }
          >
            <XIcon fontSize='small' /> &nbsp; X
          </DropdownMenuItem>

          {/* linkedin */}
          <DropdownMenuItem
            className='cursor-pointer'
            onClick={() =>
              shareInNewTab(
                `https://www.linkedin.com/shareArticle?url=${currentUrl}`
              )
            }
          >
            <LinkedInIcon fontSize='small' /> &nbsp; LinkedIn
          </DropdownMenuItem>

          {/* whatsapp */}
          <DropdownMenuItem
            className='cursor-pointer'
            onClick={() =>
              shareInNewTab(
                `https://api.whatsapp.com/send?text=Check%20this%20deal%20out!%20${currentUrl}`
              )
            }
          >
            <WhatsAppIcon fontSize='small' /> &nbsp; WhatsApp
          </DropdownMenuItem>

          <DropdownMenuItem
            className='cursor-pointer'
            onClick={() => copyLink(currentUrl)}
          >
            <LinkIcon fontSize='small' /> &nbsp; Copy Link
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ShareMicroBlog;
