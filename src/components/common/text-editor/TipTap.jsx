"use client"
import React, { useState } from 'react';
import { useEditor, EditorContent, BubbleMenu } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import BubbleMenuExtension from '@tiptap/extension-bubble-menu';
import Link from '@tiptap/extension-link';
import Mention from '@tiptap/extension-mention';
import Placeholder from '@tiptap/extension-placeholder';
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';
import Blockquote from '@tiptap/extension-blockquote';
import CodeBlock from '@tiptap/extension-code-block';
import Image from '@tiptap/extension-image';

import { SlashCommand } from "./SlashCommand";
import suggestion from './mention/Suggestion';
import { DropdownItem } from './DropdownItem';

import {
  FaListUl,
  FaCaretSquareUp,
  FaExternalLinkAlt,
} from 'react-icons/fa';
import { BiBold, BiItalic } from 'react-icons/bi';
import { IoMdLink } from 'react-icons/io';
import {
  RiStrikethrough,
  RiCodeSSlashLine,
  RiCodeBoxLine,
  RiArrowDropDownLine,
  RiDoubleQuotesR,
} from 'react-icons/ri';
import { TiCancel } from 'react-icons/ti';
import { MdOutlineDeleteForever } from 'react-icons/md';
import { HiMiniH1, HiMiniH2, HiMiniH3 } from 'react-icons/hi2';
import {
  PiTextAa,
  PiListBullets,
  PiListNumbers,
  PiCheckSquare,
} from 'react-icons/pi';


export default function Tiptap() {
  const [showTextDropdown, setShowTextDropdown] = useState(false);
  const [showListDropdown, setShowListDropdown] = useState(false);
  const [isLinkInputVisible, setIsLinkInputVisible] = useState(false);
  const [linkValue, setLinkValue] = useState('');

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ typography: false }),
      Image,
      Link.configure({
        openOnClick: false,
        autolink: true,
        defaultProtocol: 'https',
        protocols: ['http', 'https'],
        isAllowedUri: (url, ctx) => {
          try {
            const parsedUrl = url.includes(':') ? new URL(url) : new URL(`${ctx.defaultProtocol}://${url}`);
            if (!ctx.defaultValidate(parsedUrl.href)) return false;

            const disallowedProtocols = ['ftp', 'file', 'mailto'];
            const protocol = parsedUrl.protocol.replace(':', '');
            if (disallowedProtocols.includes(protocol)) return false;

            const allowedProtocols = ctx.protocols.map(p => (typeof p === 'string' ? p : p.scheme));
            if (!allowedProtocols.includes(protocol)) return false;

            const disallowedDomains = ['example-phishing.com', 'malicious-site.net'];
            const domain = parsedUrl.hostname;
            return !disallowedDomains.includes(domain);
          } catch {
            return false;
          }
        },
        shouldAutoLink: url => {
          try {
            const parsedUrl = url.includes(':') ? new URL(url) : new URL(`https://${url}`);
            const disallowedDomains = ['example-no-autolink.com', 'another-no-autolink.com'];
            return !disallowedDomains.includes(parsedUrl.hostname);
          } catch {
            return false;
          }
        },
      }),
      CodeBlock.configure({
        HTMLAttributes: {
          class: 'custom-code-block',
        },
      }),
      BubbleMenuExtension,
      Placeholder.configure({
        placeholder: 'Write a description, a project brief or collect ideas...',
      }),
      Mention.configure({
        HTMLAttributes: {
          class: 'my-custom-class',
        },
        renderText({ options, node }) {
          return `${options.suggestion.char}${node.attrs.label ?? node.attrs.id}`;
        },
        suggestion,
      }),
      TaskList,
      TaskItem,
      SlashCommand,
      Blockquote,
    ],
    editorProps: {
      attributes: {
        class: 'tiptap-editor relative min-h-[150px] text-white',
      },
    },
    onSelectionUpdate: () => {
      setShowTextDropdown(false);
      setShowListDropdown(false);
      if (editor) {
        const selectedLink = editor.getAttributes('link');
        const isLink = editor.isActive('link');
        setLinkValue(isLink && selectedLink?.href ? selectedLink.href : '');
      }
    },
  });

  if (!editor) return null;

  const handleCancel = () => editor.commands.clearContent();
  const handleSave = () => editor.getHTML();

  const toggleTextDropdown = () => {
    setShowTextDropdown(prev => !prev);
    setShowListDropdown(false);
  };

  const toggleListDropdown = () => {
    setShowListDropdown(prev => !prev);
    setShowTextDropdown(false);
  };

  const closeDropdowns = () => {
    setShowTextDropdown(false);
    setShowListDropdown(false);
  };

  const openLinkBubble = () => {
    const currentLink = editor.getAttributes('link');
    setLinkValue(currentLink?.href || '');
    setIsLinkInputVisible(true);
    closeDropdowns();
  };

  const onLinkInputChange = (e) => setLinkValue(e.target.value);

  const applyLink = () => {
    const value = linkValue.trim();
    if (value) {
      editor.chain().focus().extendMarkRange('link').setLink({ href: value }).run();
      setLinkValue('');
    } else {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
    }
  };

  const removeLink = () => {
    editor.chain().focus().extendMarkRange('link').unsetLink().run();
    setLinkValue('');
  };

  const openInNewTab = () => {
    if (linkValue.trim()) window.open(linkValue.trim(), '_blank');
  };

  const cancelLink = () => setIsLinkInputVisible(false);

  const baseButton =
    'p-1 rounded border border-transparent flex items-center justify-center transition-all duration-200 cursor-pointer';
  const activeButton = `${baseButton} bg-zinc-800`;

  const shouldShowBubbleMenu = ({ editor, from, to }) => {
    if (!editor.isFocused) return false;
    const isTextSelected = from !== to;
    const isLinkSelected = editor.isActive('link');
    return isLinkInputVisible && isLinkSelected ? true : isTextSelected;
  };

  const mainBubbleContent = (
    <div className="w-[393px] flex gap-1 bg-zinc-900 text-white rounded-lg p-2 items-center border border-white/15 shadow-md relative">
      <button className={`bubble-btn ${editor.isActive('bold') ? activeButton : baseButton}`} onClick={() => { editor.chain().focus().toggleBold().run(); closeDropdowns(); }}><BiBold size={18} className="text-gray-400" /></button>
      <button className={`bubble-btn ${editor.isActive('italic') ? activeButton : baseButton}`} onClick={() => { editor.chain().focus().toggleItalic().run(); closeDropdowns(); }}><BiItalic size={18} className="text-gray-400" /></button>
      <button className={`bubble-btn ${editor.isActive('strike') ? activeButton : baseButton}`} onClick={() => { editor.chain().focus().toggleStrike().run(); closeDropdowns(); }}><RiStrikethrough size={18} className="text-gray-400" /></button>
      <button className={`bubble-btn ${editor.isActive('code') ? activeButton : baseButton}`} onClick={() => { editor.chain().focus().toggleCodeBlock().run(); closeDropdowns(); }}><RiCodeSSlashLine size={18} className="text-gray-400" /></button>
      <button className={`bubble-btn ${editor.isActive('codeBlock') ? activeButton : baseButton}`} onClick={() => { editor.chain().focus().toggleCode().run(); closeDropdowns(); }}><RiCodeBoxLine size={18} className="text-gray-400" /></button>
      <button className={`bubble-btn ${editor.isActive('blockquote') ? activeButton : baseButton}`} onClick={() => { editor.chain().focus().toggleBlockquote().run(); closeDropdowns(); }}><RiDoubleQuotesR size={18} className="text-gray-400" /></button>
      <button className={`bubble-btn ${editor.isActive('link') ? activeButton : baseButton}`} onClick={openLinkBubble}><IoMdLink size={18} className="text-gray-400" /></button>
      <button className={`bubble-btn ${baseButton}`} onClick={closeDropdowns}><FaCaretSquareUp size={18} className="text-gray-400" /></button>

      <div className="relative">
        <button className={`bubble-btn ${baseButton}`} onClick={toggleTextDropdown}>
          <PiTextAa size={18} className="text-gray-400" />
          <RiArrowDropDownLine size={18} className="text-gray-400" />
        </button>
        {showTextDropdown && (
          <div className="absolute top-11 left-0 w-40 p-2 rounded-md bg-zinc-900 text-gray-400 shadow-md z-10">
            <DropdownItem icon={<PiTextAa size={16} />} label="Regular text" onClick={() => { editor.chain().focus().setParagraph().run(); closeDropdowns(); }} />
            <DropdownItem icon={<HiMiniH1 size={16} />} label="Heading 1" onClick={() => { editor.chain().focus().setHeading({ level: 1 }).run(); closeDropdowns(); }} />
            <DropdownItem icon={<HiMiniH2 size={16} />} label="Heading 2" onClick={() => { editor.chain().focus().setHeading({ level: 2 }).run(); closeDropdowns(); }} />
            <DropdownItem icon={<HiMiniH3 size={16} />} label="Heading 3" onClick={() => { editor.chain().focus().setHeading({ level: 3 }).run(); closeDropdowns(); }} />
          </div>
        )}
      </div>

      <div className="relative">
        <button className={`bubble-btn ${baseButton}`} onClick={toggleListDropdown}>
          <FaListUl size={18} className="text-gray-400" />
          <RiArrowDropDownLine size={18} className="text-gray-400" />
        </button>
        {showListDropdown && (
          <div className="absolute top-11 left-0 w-40 p-2 rounded-md bg-zinc-900 text-gray-400 shadow-md z-10">
            <DropdownItem icon={<PiListBullets size={16} />} label="Bullet List" onClick={() => { editor.chain().focus().toggleBulletList().run(); closeDropdowns(); }} />
            <DropdownItem icon={<PiListNumbers size={16} />} label="Ordered List" onClick={() => { editor.chain().focus().toggleOrderedList().run(); closeDropdowns(); }} />
            <DropdownItem icon={<PiCheckSquare size={16} />} label="Check List" onClick={() => { editor.chain().focus().toggleTaskList().run(); closeDropdowns(); }} />
          </div>
        )}
      </div>
    </div>
  );


  const linkBubbleContent = (
    <div className={`flex items-center gap-2 bg-zinc-900 rounded-lg p-2 shadow-md ${linkValue.trim() ? 'w-[350px]' : 'w-[245px]'}`}>
      <input
        type="text"
        placeholder="Enter URL"
        value={linkValue}
        onChange={onLinkInputChange}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            applyLink();
            setIsLinkInputVisible(false);
          }
        }}
        className="flex-1 rounded px-2 py-1 text-sm text-gray-400 bg-transparent border border-gray-700 focus:outline-none"
      />
      {linkValue.trim() && (
        <>
          <button className={`bubble-btn ${baseButton}`} onClick={openInNewTab}><FaExternalLinkAlt size={18} className="text-gray-400" /></button>
          <button className={`bubble-btn ${baseButton}`} onClick={removeLink}><MdOutlineDeleteForever size={18} className="text-gray-400" /></button>
        </>
      )}
      <button className={`bubble-btn ${baseButton}`} onClick={cancelLink}><TiCancel size={18} className="text-gray-400" /></button>
    </div>
  );


  return (
    <>
      <div className="w-[680px] h-[300px] bg-zinc-800 text-white rounded-lg p-4 overflow-y-auto">
        <BubbleMenu
          editor={editor}
          shouldShow={shouldShowBubbleMenu}
          tippyOptions={{
            placement: 'top',
            interactive: true,
            hideOnClick: false,
            onClickOutside: () => {
              if (isLinkInputVisible) setIsLinkInputVisible(false);
            },
          }}
        >
          {isLinkInputVisible ? linkBubbleContent : mainBubbleContent}
        </BubbleMenu>
        <EditorContent editor={editor} />
      </div>
      <div className="flex gap-4 mt-4">
        <button className="btn secondary cursor-pointer" onClick={handleCancel}>Cancel</button>
        <button className="btn primary cursor-pointer" onClick={handleSave}>Save text</button>
      </div>
    </>
  );
}