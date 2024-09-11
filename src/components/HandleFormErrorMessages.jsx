const HandleFormErrorMessages = ({ errors, field, formData }) => {
  console.log(errors)
  const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  // pattern.test(email)
  // && (formData[field] === '' || formData[field] === 'https://' )
  return (
    <>
      {errors && errors[field] 
        ? errors[field].map((err) => (
            <p key={err} className='text-red-500 text-sm'>
              {err}
            </p>
          ))
        : null}
    </>
  );
};

export default HandleFormErrorMessages;
