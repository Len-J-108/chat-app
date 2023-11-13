import { useState } from 'react';

const MyForm = () => {
  const [formData, setFormData] = useState({
    name: '',
  });


  const handleSubmit = (event) => {
    event.preventDefault();

    const form = new FormData();

    // Append form data properties
    for (const key in formData) {
        console.log({key})
      form.append(key, formData.name);
    }

    // Fetch API to send form data to the backend
    const url = 'http://localhost:4321/register'
    fetch(url, {
      method: 'POST',
      body: form,
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        // Handle success, update UI, etc.
      })
      .catch(error => {
        console.error('Error:', error);
        // Handle error, update UI, etc.
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Your input fields */}
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={(e) => {
            e.preventDefault();
            setFormData({name: e.target.value});
        }}
        placeholder="Name"
      />

      {/* Add more input fields as needed */}
      
      <button type="submit">Submit</button>
    </form>
  );
};

export default MyForm;