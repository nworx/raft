import React, { useState } from 'react';

export const DropdownItem = ({ icon, label, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div>
      <div
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`cursor-pointer px-2 py-1 flex items-center gap-2 rounded transition duration-200 ${
          isHovered ? 'bg-[#2e2d2d]' : ''
        }`}
      >
        {icon}
        <span>{label}</span>
      </div>
      <div className="h-px bg-gray-500 my-1" />
    </div>
  );
};
