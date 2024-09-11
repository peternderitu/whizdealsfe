import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import HandleFormErrorMessages from '@/components/HandleFormErrorMessages';
import { useStoreStudentEmailMutation } from '@/redux/features/userAuthSlice';
import { useToast } from '@/components/ui/use-toast';

const StudentEmail = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { id } = useParams();
  const [studentEmail, setStudentEmail] = useState('');
  const [err, setErr] = useState('');
  const [formErrors, setFormErrors] = useState(null);
  const [storeStudentEmail, { data }] = useStoreStudentEmailMutation();

  //   console.log(data)
  // janedoe@uoguelph.ca
  const universityEmailEndings = [
    '@uoguelph.ca',
    // '@mcgill.ca',
    '@.utoronto.ca',
    '@acadiau.ca', '@acsenda.com', '@acadiau.ca', '@adler.ca', '@adler.edu', '@algomau.ca', '@ambrose.edu', '@uwindsor.ca', '@athabascau.ca', '@astheology.ns.ca', '@bethany.sk.ca', '@ubishops.ca', '@BoothUC.ca', '@brandonu.ca', '@uwo.ca', '@briercrest.ca', '@brocku.ca', '@burmanu.ca', '@campbellsville.edu', '@uregina.ca', '@canadachristiancollege.com', '@twu.ca', '@ccstvan.ca', '@clbi.edu', '@cmu.ca', '@uwindsor.ca', '@cbu.ca', '@cbu.ca', '@cbu.ca', '@cbu.ca', '@capilanou.ca', '@carey-edu.ca', '@carleton.ca', '@cmich.edu', '@csu.edu.au', '@cityu.edu', '@CityU.edu', '@clearwatercollege.com', '@usask.ca', '@concordiasem.ab.ca', '@brocku.ca', '@uwaterloo.ca', '@cornell.edu', '@crandallu.ca', '@dal.ca', '@udominicaine.ca', '@etsmtl.ca', '@hec.ca', '@enap.ca', '@polymtl.ca', '@ecuad.ca', '@emmanuelbiblecollege.ca', '@utoronto.ca', '@estoncollege.ca', '@fteacadia.com', '@fdu.edu', '@fbccanada.org', '@fnuniv.ca', '@uregina.ca', '@gonzaga.edu', '@macewan.ca', '@glbc.ca', '@grenfell.mun.ca', '@DiscoverHeritage.ca', '@horizon.edu', '@huntingtonu.ca', '@uwo.ca', '@umontreal.ca', '@iftm.ca', '@ipastorale.ca', '@ithq.qc.ca', '@inrs.ca', '@rogers.com', '@icscanada.edu', '@ibu.ca', '@itpscanada.com', '@uwindsor.ca', '@uwo.ca', '@kingswood.edu', '@utoronto.ca', '@kpu.ca', '@uregina.ca', '@lakeheadu.ca', '@laurentian.ca', '@ltu.edu', '@luthercollege.edu', '@saskatoontheologicalunion.ca', '@maimonidescollege.ca', '@mi.mun.ca', '@mccpei.com', '@wlu.ca', '@mcs.edu', '@mcgill.ca', '@mcmaster.ca', '@mun.ca', '@mbseminary.ca', '@millarcollege.ca', '@millarcollege.ca', '@dio-mdtc.ca', '@mtroyal.ca', '@msvu.ca', '@nyit.edu', '@newman.edu', '@nipawin.org', '@nipissingu.ca', '@neu.edu', '@northeastern.edu', '@nosm.ca', '@nbseminary.ca', '@nscad.ca', '@ocadu.ca', '@uoit.ca', '@pcu-whs.ca', '@utoronto.ca', '@prairie.edu', '@presbyteriancollege.ca', '@prov.ca', '@queensu.ca', '@queensu.ca', '@queensu.ca', '@questu.ca', '@redeemer.ca', '@regent-college.edu', '@uwaterloo.ca', '@rockymountaincollege.ca', '@rmc-cmr.ca', '@smu.ca', '@uOttawa.ca', '@paralynx.com', '@sfu.ca', '@saskatoontheologicalunion.ca', '@UManitoba.ca', '@utoronto.ca', '@stfx.ca', '@uwaterloo.ca', '@stmarkscollege.ca', '@stmu.ca', '@usask.ca', '@uwo.ca', '@ualberta.ca', '@usask.ca', '@usask.ca', '@sbcollege.ca', '@talpiot.ca', '@kingsu.ca', '@uwinnipeg.ca', '@thomasmore.qc.ca', '@tru.ca', '@thorneloe.ca', '@utoronto.ca', '@ryerson.ca', '@trentu.ca', '@tyndale.ca', '@uwaterloo.ca', '@utc.ca', '@uhearst.ca', '@uontario.ca', '@umoncton.ca', '@regis.umontreal.ca', '@ustboniface.ca', '@uquebec.ca', '@uqac.ca', '@uqam.ca', '@uqar.ca', '@uqat.ca', '@uqo.ca', '@reg.ulaval.ca', '@usainteanne.ca', '@ucanwest.ca', '@ucn.ca', '@ualberta.ca', '@ucalgary.ca', '@ufred.ca', '@registrar.uoguelph.ca', '@ukings.ca', '@uleth.ca', '@UManitoba.ca', '@verwaltung.uni-mannheim.de', '@unb.ca', '@verwaltung.uni-mannheim.de', '@unbc.ca', '@unbc.ca', '@uOttawa.ca', '@up.edu', '@upei.ca', '@uregina.ca', '@usask.ca', '@utoronto.ca', '@usudbury.ca', '@ufv.ca', '@utoronto.ca', '@uvic.ca', '@uwaterloo.ca', '@uwindsor.ca', '@viu.ca', '@vst.edu', '@vanguardcollege.com', '@utoronto.ca', '@vbci.org', '@uwo.ca', '@wlu.ca', '@utoronto.ca', '@yorku.ca', '@yorkvilleu.ca', '@yukonu.ca',
    // Add more university email endings as needed
    // below for testing purposes
    'sarakane17@gmail.com', 'snjauk@gmail.com', 'sheshenesi@gmail.com', 'tamiciru@gmail.com', 'tyannen4@gmail.com', 'kristin27yates@gmail.com', 'cirutami@gmail.com', 
    'gmail.com'
  ];

  const isUniversityEmail = (email) => {
    const lowercasedEmail = email.toLowerCase();

    // Check if the email ends with any of the specified university endings
    return universityEmailEndings.some((ending) =>
      lowercasedEmail.endsWith(ending)
    );
  };

  const handleCheck = () => {
    // Example usage:
    //   const userEmail = 'user@example.ac.ku';
    if (isUniversityEmail(studentEmail)) {
      setErr(null);
      console.log('This is a university email.');
      storeStudentEmail({ studentEmail, id })
        .unwrap()
        .then((response)=> {
          console.log(response)
          toast({
            title: 'Success!',
            description: 'Student email has been added',
          });
        })
        .catch((err)=> {
          setFormErrors(err.data.errors)
          console.log(err.data.errors)
          toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: err.data.errors.studentEmail,
          });
        });
    } else {
      setErr('Enter a valid university email');
      toast({
        variant: "destructive",
        title: "Enter a valid university email"
        // description: 'Enter a valid university email',
      });
    }
  };

  useEffect(() => {
    if (data && data.message === 'Added student email to user') {
      navigate(`/confirm-student-email/${data.user.id}`);
    }
  }, [data, navigate]);

  return (
    <>
      <div className='flex items-center flex-col h-screen bg-authBg bg-cover bg-no-repeat bg-center'>
        <a
          href='/'
          className={`transition duration-300 ease-in-out text-5xl font-medium block mt-8  text-burgundy500 font-playfair`}
        >
          <img src='/whizDealsWatermark2.png' className='h-32' />
        </a>
        <h3 className='text-3xl pb-5 text-grey300'>Student Email</h3>
        <Card className='lg:w-[450px] h-max border-none shadow-none bg-transparent'>
          <CardContent>
            <form>
              <div className='grid w-full items-center gap-4'>
                <div className='flex flex-col space-y-1.5'>
                  <Label htmlFor='name' className='text-grey300'>
                    Student Email
                  </Label>
                  <Input
                    id='email'
                    type='email'
                    className='bg-white border-grey200'
                    value={studentEmail}
                    onChange={(e) => setStudentEmail(e.target.value)}
                  />
                  <HandleFormErrorMessages errors={formErrors} field={'studentEmail'} formData={{studentEmail}} />
                  {err ? <p className='text-sm text-red-600'>{err}</p> : null}
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className='block'>
            <Button className='w-full font-semibold' onClick={handleCheck}>
              Next
            </Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default StudentEmail;
