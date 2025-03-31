import React, { useEffect, useState } from 'react';
import { NodeViewWrapper } from '@tiptap/react';
import { Progress } from '@/components/ui/progress'; 

const ImageNode = ({ node, updateAttributes }) => {
  const { src, alt, caption, uploadImageHandler } = node.attrs;
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (uploadImageHandler && src?.startsWith('data') && !isUploading) {
      setIsUploading(true);
      let fakeProgress = 0;
      const interval = setInterval(() => {
        fakeProgress += 5;
        setProgress(fakeProgress);
      }, 100);

      uploadImageHandler().then((imgUrl) => {
        clearInterval(interval);
        setProgress(100);
        updateAttributes({ src: imgUrl });
        setIsUploading(false);
      });
    }
  }, [uploadImageHandler, src, isUploading]);

  return (
    <NodeViewWrapper as="figure" className="custom-image-wrapper" contentEditable={false} style={{ position: 'relative' }}>
      <img
        src={src}
        alt={alt}
        style={{
          maxWidth: '100%',
          borderRadius: '6px',
          opacity: isUploading ? 0.6 : 1,
        }}
      />

      {isUploading && (
        <div
          style={{
            position: 'absolute',
            bottom: '12px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '80%',
            zIndex: 10,
            background: 'rgba(255, 255, 255, 0.9)',
            padding: '4px 8px',
            borderRadius: '4px',
          }}
        >
          <Progress value={progress} />
        </div>
      )}

      <figcaption contentEditable suppressContentEditableWarning>
        {caption}
      </figcaption>
    </NodeViewWrapper>
  );
};

export default ImageNode;
