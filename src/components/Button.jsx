import React from 'react';

const Button = ({ children, onClick, type = 'button', className = '', ...props }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`w-full bg-lexgo-dark text-white font-medium py-3 rounded-lg hover:bg-opacity-90 transition duration-200 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
