import Nav from './Nav';
import { Button } from '@/components/ui/button';

const StudentPlacements = () => {
  return (
    <Nav>
      <h1 className='mb-3 text-2xl font-semibold text-grey300'>
        Student Placements
      </h1>
      <div className='grid grid-cols-2 gap-4 container'>
        <div className='mb-3'>
          <div className='rounded-r-md rounded-bl-md bg-autumn100 grid grid-cols-2'>
            <div className='p-5'>
              <h3 className='mb-3 text-lg font-semibold text-grey350'>
                Public Health Ontario
              </h3>
              <p className='mb-3 text-grey300'>
                Current Job Opportunities at Public Health Ontario
              </p>
              <Button
                onClick={() =>
                  window.open(
                    'https://www.publichealthontario.ca/en/About/Careers/Current-Job-Opportunities'
                  )
                }
              >
                View page
              </Button>
            </div>
            <div>
              <img
                src='studentPlacement.jpeg'
                className='rounded-r-md h-full object-cover'
              />
            </div>
          </div>
        </div>

        <div className='mb-3'></div>
      </div>
    </Nav>
  );
};

export default StudentPlacements;
