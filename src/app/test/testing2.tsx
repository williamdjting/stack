'use client'

import React from 'react';
import axios from 'axios';

const TestSubmitData = () => {
  const testSubmitData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/submitData');
      console.log('Response:', response.data);
      console.log("line 11")
    } catch (error) {
      console.error('Error:', error.response?.data || error.message);
      console.log("line 14")
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await testSubmitData();
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Add your form fields here */}
      <button type="submit">Submit</button>
    </form>
  );
};

export default TestSubmitData;
