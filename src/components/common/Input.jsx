import React from 'react';

const Input = ({ type = 'text', className = '', ...props }) => {
  const baseStyle = "w-full px-3 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm";
  const errorStyle = props.error ? "border-red-300" : "border-gray-300";
  
  return (
    <div className="w-full">
      <input
        type={type}
        className={`${baseStyle} ${errorStyle} ${className}`}
        {...props}
      />
      {props.error && (
        <p className="mt-1 text-sm text-red-600">{props.error}</p>
      )}
    </div>
  );
};

export default Input; 