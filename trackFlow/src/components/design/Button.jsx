import React from 'react';

const Button = ({ onClick, children, className = "", ...props }) => {
  const baseStyles =
    "px-4 py-2 font-semibold rounded bg-white border-2 border-black hover:bg-[#640d14] hover:text-white hover:border-white transition-colors duration-300";

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;