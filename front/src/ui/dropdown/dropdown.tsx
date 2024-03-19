import React, { useState } from 'react';

import DropDownArrow from '@/assets/icons/dropdown-arrow.svg?react';

interface DropdownProps {
  defaultOption: React.ReactNode;
  options: { [key: string]: string };
  onSelect: (option: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ defaultOption, options, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = (option: string) => {
    onSelect(option);
    toggleDropdown();
  };

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className="inline-flex w-full justify-center rounded-md px-4 py-2 text-sm text-white"
          onClick={toggleDropdown}
        >
          {defaultOption}
          <DropDownArrow />
        </button>
      </div>

      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-gray-100 shadow-lg ring-0"
          role="menu"
          aria-orientation="vertical"
        >
          <div className="py-1" role="none">
            {Object.entries(options).map(([key, value]) => (
              <button
                key={key}
                className="block w-full px-4 py-2 text-left text-sm text-white hover:bg-gray-300 hover:text-gray-600"
                onClick={() => handleOptionSelect(key)}
              >
                {value}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
