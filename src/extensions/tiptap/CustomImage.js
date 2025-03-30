// extensions/CustomImage.js
import { mergeAttributes, Node } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';
import ImageNode from './ImageNode';

export const CustomImage = Node.create({
  name: 'customImage',

  group: 'inline',

  inline: false,
  draggable: true,

  addAttributes() {
    return {
      src: { default: null },
      alt: { default: null },
      caption: { default: '' },
      uploadImageHandler: { default: undefined }, // won't render to HTML
    };
  },

  parseHTML() {
    return [{ tag: 'figure' }];
  },

  renderHTML({ HTMLAttributes }) {
    const attrs = { ...HTMLAttributes };
    delete attrs.uploadImageHandler;

    return [
      'figure',
      ['img', mergeAttributes(attrs)],
      ['figcaption', HTMLAttributes.caption],
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(ImageNode);
  },
});
