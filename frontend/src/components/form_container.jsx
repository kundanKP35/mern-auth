import React from 'react';

const FormContainer = ({ children }) => {
  return (
    <div className="w-full h-screen flex items-center justify-center font-poppins">
      <div className="bg-white shadow-md p-10 rounded-md w-full max-w-sm">
        {children}
      </div>
    </div>
  );
};

export default FormContainer;
