import { Extension } from '@tiptap/core';
import Suggestion from '@tiptap/suggestion';
import React from 'react';
import { createRoot } from 'react-dom/client';
import SlashCommandList from "./SlashCommandList";

import { HiMiniH3 } from "react-icons/hi2";
import { HiMiniH2 } from "react-icons/hi2";
import { HiMiniH1 } from "react-icons/hi2";
import { GoFileMedia } from "react-icons/go";
import { PiListBullets, PiListNumbers } from "react-icons/pi";
import { RiAttachment2 } from "react-icons/ri";
import { HiOutlineGif } from "react-icons/hi2";

import {
  handleImageInsert,
  handleFileAttach,
  handleGIFInsert,
} from "../../../utilities/mediaHandlers";

export const SlashCommand = Extension.create({
  name: 'slash-command',

  addOptions() {
    return {
      uploadHandlers: {
        onImageInsert: handleImageInsert,
        onGIFInsert: handleGIFInsert,
        onFileAttach: handleFileAttach
      },
      suggestion: {
        char: '/',
        startOfLine: true,
        items: ({ query = '' }) => {
          const normalizedQuery = query.replace(/\s+/g, '').toLowerCase();
        
          const headings = [
            {
              label: 'Heading 1',
              icon: <HiMiniH1 size={16} color="#fff" />,
              execute: (editor, range) =>
                editor.chain().focus().deleteRange(range).setHeading({ level: 1 }).run(),
            },
            {
              label: 'Heading 2',
              icon: <HiMiniH2 size={16} color="#fff" />,
              execute: (editor, range) =>
                editor.chain().focus().deleteRange(range).setHeading({ level: 2 }).run(),
            },
            {
              label: 'Heading 3',
              icon: <HiMiniH3 size={16} color="#fff" />,
              execute: (editor, range) =>
                editor.chain().focus().deleteRange(range).setHeading({ level: 3 }).run(),
            },
          ];
        
          const lists = [
            {
              label: 'Bulleted List',
              icon: <PiListBullets size={16} color="#fff" />,
              execute: (editor, range) =>
                editor.chain().focus().deleteRange(range).toggleBulletList().run(),
            },
            {
              label: 'Numbered List',
              icon: <PiListNumbers size={16} color="#fff" />,
              execute: (editor, range) =>
                editor.chain().focus().deleteRange(range).toggleOrderedList().run(),
            },
          ];
        
          const media = [
            {
              label: 'Insert Media',
              icon: <GoFileMedia size={16} color="#fff" />,
              execute: async (editor, range) => {
                const content = await editor.extensionManager.extensions.find(e => e.name === 'slash-command')?.options.uploadHandlers.onImageInsert();
                editor.chain().focus().deleteRange(range).insertContent(content).run();
              },
            },
            {
              label: 'Insert GIF',
              icon: <HiOutlineGif size={16} color="#fff" />,
              execute: async (editor, range) => {
                const content = await editor.extensionManager.extensions.find(e => e.name === 'slash-command')?.options.uploadHandlers.onGIFInsert();
                editor.chain().focus().deleteRange(range).insertContent(content).run();
              },
            },
            {
              label: 'Attach File',
              icon: <RiAttachment2 size={16} color="#fff" />,
              execute: async (editor, range) => {
                const content = await editor.extensionManager.extensions.find(e => e.name === 'slash-command')?.options.uploadHandlers.onFileAttach();
                editor.chain().focus().deleteRange(range).insertContent(content).run();
              },
            },
          ];
        
          const buildSection = (sectionItems) =>
            sectionItems
              .filter(item =>
                item.label.replace(/\s+/g, '').toLowerCase().includes(normalizedQuery)
              )
              .map(item => ({ ...item, type: 'item' }));
        
          // Add separator as a special object
          const separator = { type: 'separator' };
        
          return [
            ...buildSection(headings),
            separator,
            ...buildSection(lists),
            separator,
            ...buildSection(media),
          ];
        },
          
        render: () => {
          let reactRoot;
          let popup;
          let selectedIndex = 0;
          let currentRange = null; 
          return {
            onStart: (props) => {
              currentRange = props.range;
              popup = document.createElement('div');
              document.body.appendChild(popup);
              reactRoot = createRoot(popup);
        
              const { top, left } = props.clientRect();

              reactRoot.render(
                <SlashCommandList
                  items={props.items}
                  onRunCommand={(item) => item.execute(props.editor, currentRange)}
                  position={{ top, left }}
                />
              );
            },
        
            onUpdate(props) {
              const { top, left } = props.clientRect();
              const { editor } = props;
              reactRoot.render(
                <SlashCommandList
                  items={props.items}
                  onRunCommand={(item) => item.execute(props.editor, currentRange)}
                  position={{ top, left }}
                />
              );
            },
        
            onKeyDown(props) {
              const { event, editor, items } = props;
        
              if (!items || items.length === 0) return false;
        
              if (event.key === 'ArrowDown') {
                selectedIndex = (selectedIndex + 1) % items.length;
                return true;
              }
        
              if (event.key === 'ArrowUp') {
                selectedIndex = (selectedIndex - 1 + items.length) % items.length;
                return true;
              }
        
              if (event.key === 'Enter') {
                const selected = items[selectedIndex];
                if (selected) {
                  selected.execute(editor, currentRange); // ✅ execute with range
                }
                return true;
              }
        
              return false;
            },
        
            onExit() {
              if (popup) {
                reactRoot.unmount();
                popup.remove();
              }
            },
          };
        }        
      },
    };
  },

  addProseMirrorPlugins() {
    return [
      Suggestion({
        editor: this.editor,
        ...this.options.suggestion,
      }),
    ];
  },
});
