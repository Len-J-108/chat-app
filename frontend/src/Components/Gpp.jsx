import React from 'react';
import { useForm } from 'react-hook-form';

const MyForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    // Add your form submission logic here
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>
        Username:
        <input
          {...register('username', { required: 'Username is required' })}
          style={{
            borderColor: errors.username ? 'red' : 'green',
          }}
        />
        {errors.username && <p>{errors.username.message}</p>}
      </label>

      {/* Add more input fields as needed */}

      <button type="submit">Submit</button>
    </form>
  );
};

export default MyForm;
