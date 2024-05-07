import VisibilityOffIcon from '@mui/icons-material/VisibilityOffOutlined';
import VisibilityIcon from '@mui/icons-material/VisibilityOutlined';
import React, { useState, forwardRef } from 'react';

interface PasswordInputProps {
  label: string;
  helpeText?: string;
}

const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(({ label, helpeText }, ref) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prevVisible) => !prevVisible);
  };

  return (
    <div className="relative mb-4 w-full">
      <div className="flex w-full flex-col items-center gap-3 md:flex-row">
        <label
          htmlFor={label}
          className="mb-2 flex-none text-sm font-medium text-gray-900 md:mb-0 md:text-base dark:text-gray-300"
          style={{ minWidth: '20%' }}
        >
          {label}
        </label>
        <div className="flex w-full grow items-center rounded-lg bg-white/50 shadow-sm">
          <input
            type={isPasswordVisible ? 'text' : 'password'}
            ref={ref}
            id={label}
            className="w-full flex-1 rounded-none rounded-l-lg bg-white/50 p-2.5 text-gray-900 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            required
          />
          <button onClick={togglePasswordVisibility} className="px-3">
            {isPasswordVisible ? <VisibilityIcon /> : <VisibilityOffIcon />}
          </button>
        </div>
      </div>
      {helpeText && <small className="mt-2 text-xs text-red-300">{helpeText}</small>}
    </div>
  );
});

export default PasswordInput;
