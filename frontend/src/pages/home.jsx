import React from 'react';
import { useSelector } from 'react-redux';

const Home = () => {

  return (
    <div className='flex justify-center items-center mt-[3rem] font-poppins'>
      <div className='text-center border-2 w-1/2 p-4'>
        <h1 className='text-3xl font-bold mb-4'>MERN Authentication</h1>
        <p className='text-md'>
          This is a sample application for demonstrating MERN stack authentication.
        </p>
      </div>
    </div>
  );
};

export default Home;
