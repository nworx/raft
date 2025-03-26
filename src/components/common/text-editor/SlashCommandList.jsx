'use client';

import React, { useEffect, useState } from 'react';
import SlashCommandListItem from "./SlashCommandListItem";
import { createPortal } from "react-dom";

export default function SlashCommandList({ items, onRunCommand, position }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true); // Ensures we're on the client and `document.body` is ready
  }, []);

  if (!position || !mounted) return null;

  const dropdown = (
    <div
      className="absolute w-[170px] p-2 text-white rounded-md bg-[#1D1D1F] shadow-md"
      style={{
        top: position.top ?? 0,
        left: position.left ?? 0,
        zIndex: 10000,
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

  return createPortal(dropdown, document.body);
}
