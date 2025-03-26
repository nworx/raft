import React from 'react';
import SlashCommandListItem from "./SlashCommandListItem";

export default function SlashCommandList({ items, onRunCommand, position }) {
  if (!position) return null;

  return (
    <div
      className="absolute w-[170px] p-2 text-white rounded-md bg-[#1D1D1F] shadow-md z-10"
      style={{
        top: position.top,
        left: position.left,
        position: 'absolute',
      }}
    >
      {items.map((item, index) => {
        if (item.type === 'separator') {
          return (
            <div
              key={`sep-${index}`}
              className="border-t border-[#444] my-1.5"
            />
          );
        }
        return (
          <SlashCommandListItem
            item={item}
            onRunCommand={onRunCommand}
            key={index}
          />
        );
      })}
    </div>
  );
}
