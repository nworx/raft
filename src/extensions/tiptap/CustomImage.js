// extensions/CustomImage.js
import { mergeAttributes, Node } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';
import ImageNode from './ImageNode';

export const CustomImage = Node.create({
  name: 'customImage',

  group: 'block',
  inline: false,
  draggable: true,
  atom: true, // since the node uses custom rendering and isn't editable inside

  addAttributes() {
    return {
      src: { default: null },
      alt: { default: null },
      caption: { default: '' },
      uploadImageHandler: { default: undefined }, // not rendered in HTML
    };
  },

  parseHTML() {
    return [
      {
        tag: 'figure',
      },
    ];
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
