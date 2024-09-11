import * as React from 'react';
import Autoplay from 'embla-carousel-autoplay';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';

const SectionContent = () => {
  const navigate = useNavigate();
  return (
    <div className='p-4 lg:p-10'>
      <h1 className='text-7xl lg:text-[140px] text-burgundy500 font-playfair mt-16 lg:mt-0'>
        MaplyDeals
      </h1>
      <p className='text-2xl lg:text-4xl lg:w-[25ch] mb-7 mt-4 text-grey300'>
        Great student deals…exclusive to students in Canada!
      </p>
      <p className='my-7 lg:w-[40ch] text-grey300'>
        Make the best of your student life with amazing deals, right here on
        MaplyDeals!
      </p>
      <Button
        className='block mt-5 font-bold'
        onClick={() => navigate('/login')}
      >
        Explore now -&gt;
      </Button>
    </div>
  );
};

const HomeCarousel = () => {
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  );

  return (
    <Carousel
      plugins={[plugin.current]}
      className=''
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        <CarouselItem>
          <section className='bg-happyStudentsMobile lg:bg-happyStudents bg-no-repeat bg-cover h-screen'>
            <SectionContent />
          </section>
        </CarouselItem>

        <CarouselItem>
          <section className='bg-guysLaughingMobile lg:bg-guysLaughing bg-no-repeat bg-cover h-screen'>
            <SectionContent />
          </section>
        </CarouselItem>

        <CarouselItem>
          <section className='bg-hikingMobile lg:bg-hiking bg-no-repeat bg-cover h-screen'>
            <SectionContent />
          </section>
        </CarouselItem>
      </CarouselContent>
    </Carousel>
  );
};

export default HomeCarousel;
