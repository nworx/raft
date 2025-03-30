import React, { useEffect, useState } from 'react';

const ImageNode = ({ node, updateAttributes }) => {
  const { src, alt, caption, uploadImageHandler } = node.attrs;
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (uploadImageHandler && src?.startsWith('data') && !isUploading) {
      setIsUploading(true);
      uploadImageHandler().then((imgUrl) => {
        updateAttributes({ src: imgUrl });
        setIsUploading(false);
      });
    }
  }, [uploadImageHandler, src, isUploading]);

  return (
    <figure contentEditable={false}>
      <img src={src} alt={alt} style={{ maxWidth: '100%' }} />
      <figcaption contentEditable>{caption}</figcaption>
    </figure>
  );
};

export default ImageNode;
