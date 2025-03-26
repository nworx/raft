import React, { useState } from 'react';

const SlashCommandListItem = ({ item, onRunCommand }) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div
      className={`flex items-center px-2 py-1 gap-2 rounded cursor-pointer transition-all duration-200 ${
        isHovered ? 'bg-[#666] border border-[#999]' : 'border border-transparent'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onRunCommand(item)}
    >
      <div className="mr-2">{item.icon}</div>
      <div className="text-sm text-white">{item.label}</div>
    </div>
  );
};

export default SlashCommandListItem;