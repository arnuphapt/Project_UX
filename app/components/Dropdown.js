// components/Dropdown.js
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
const Dropdown = ({ options, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const router=useRouter();
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const handleMouseLeave = () => {
    setIsOpen(false);
  };
  const handleOptionClick = (option) => {
    onSelect(option);
    if (option.value === 'docs') {
      router.push('/Learn');
    }
    setIsOpen(false);
  };

  return (
    <div className="relative"  style={{ zIndex: 100 }}>
      <button className="font-semibold p-2 px-4 rounded-full" onClick={toggleDropdown}>
        Learn
      </button>
      {isOpen && (
        <ul className="absolute mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5" onMouseLeave={handleMouseLeave} style={{ zIndex: 101 }}>
          {options.map((option) => (
            <li key={option.value} className="px-4 py-2 cursor-pointer" onClick={() => handleOptionClick(option)}>
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;