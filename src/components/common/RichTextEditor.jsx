"use client";

// import { useEditor } from "@tiptap/react";
// import StarterKit from "@tiptap/starter-kit";
// import React, { useRef, useState } from "react";
// import { useEditor, EditorContent } from "@tiptap/react";
// // import StarterKit from "@tiptap/starter-kit";
// import { Button } from "@/components/ui/button"; // ShadCN Button
// import { Bold, Italic, Strikethrough } from "lucide-react"; // Icons
// import clsx from "clsx";
// import Link from "@tiptap/extension-link";

// const RichTextEditor = () => {
//   const rteRef = useRef(null);
//   const editor = useEditor({
//     extensions: [StarterKit, Link.configure({ openOnClick: false })],
//     content: "",
//   });
//   const [errors, setErrors] = useState({
//     name: false,
//     duration: false,
//     step_number: false,
//     gridError:false,
//     descriptionError:true
//   });

// // const editor = useEditor({
// //     extensions: [StarterKit],
// //     content: "<p>Start writing...</p>",
// //   });

// //   if (!editor) return null; // Prevents errors before editor loads


//   return (
//     <RichTextEditor
//       ref={rteRef}
//       extensions={[StarterKit, Link.configure({ openOnClick: true })]}
//       className={errors.descriptionError ? "richTextError" : "richTextNormal"}
//       css={css`
//         .ProseMirror {
//           height: 290px;
//           overflow-y: scroll;
//           border: solid transparent;
//         }

//         ${errors.descriptionError ? "border: 1px solid red;" : ""}

//         min-height: 100%;

//         height: 355px;
//         max-height: 355px;
//         border: solid transparent;
//         overflow: hidden;
//         box-sizing: border-box;
//       `}
//       content={editorContent}
//       renderControls={() => (
//         <MenuControlsContainer>
//           <MenuSelectHeading />
//           <MenuDivider />
//           <MenuButtonBold />
//           <MenuButtonItalic />
//           <MenuDivider />
//           <MenuButtonHorizontalRule />
//           <MenuButtonEditLink onClick={addLink} />
//           <MenuDivider />
//           <MenuButtonOrderedList />
//           <MenuButtonBulletedList />
//         </MenuControlsContainer>
//       )}
//       onUpdate={({ editor }) => {
//         const content = editor.getText().trim();
//         if (!content) {
//           setErrors((prev) => ({
//             ...prev,
//             descriptionError: true,
//           }));
//         } else {
//           setErrors((prev) => ({
//             ...prev,
//             descriptionError: false,
//           }));
//         }
//         handleEditorChange(editor.getHTML());
//         // @ts-ignore
//         setEditorInstance(editor);
//       }}
//     />
//   );
// };

// export default RichTextEditor;















"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Youtube from "@tiptap/extension-youtube";
import { Button } from "@/components/ui/button"; // ShadCN Button
import { Bold, Italic, Strikethrough, Link as LinkIcon, Image as ImageIcon, Video, Send } from "lucide-react"; // Icons
import clsx from "clsx";
import { useState } from "react";

export default function RichTextEditor({setTextEditorContent}) {



  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({ openOnClick: true }),
      Image,
      Youtube.configure({ width: 500, height: 300 }),
    ],
    content: "",
  });

  if (!editor) return null;



  const addLink = () => {
    const url = prompt("Enter the URL:");
    if (url) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  };

  const addImage = () => {
    const url = prompt("Enter image URL:");
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  const addVideo = () => {
    const url = prompt("Enter YouTube video URL:");
    if (url) {
      editor.chain().focus().setYoutubeVideo({ src: url }).run();
    }
  };

  const sendContent = () => {
    setTextEditorContent(editor.getHTML())
    console.log( editor.getHTML());
    editor.commands.clearContent();
  };

  return (
    <div className="w-full mx-auto p-4 border border-gray-300 rounded-lg bg-white text-black">
      {/* Toolbar */}
      <div className="flex gap-2 mb-2 border-b border-gray-300 pb-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={clsx("text-black", { "bg-gray-200": editor.isActive("bold") })}
        >
          <Bold size={16} />
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={clsx("text-black", { "bg-gray-200": editor.isActive("italic") })}
        >
          <Italic size={16} />
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={clsx("text-black", { "bg-gray-200": editor.isActive("strike") })}
        >
          <Strikethrough size={16} />
        </Button>

        <Button variant="ghost" size="sm" onClick={addLink} className="text-black">
          <LinkIcon size={16} />
        </Button>

        <Button variant="ghost" size="sm" onClick={addImage} className="text-black">
          <ImageIcon size={16} />
        </Button>

        <Button variant="ghost" size="sm" onClick={addVideo} className="text-black">
          <Video size={16} />
        </Button>
      </div>

      {/* Editor Content */}
      <EditorContent editor={editor} className="min-h-[200px] p-2 bg-white text-black focus:outline-none" />

      {/* Send Button */}
      <div className="mt-4 flex justify-end">
        <Button variant="default" size="sm" onClick={sendContent}>
          <Send size={16} className="mr-1" /> Send
        </Button>
      </div>
    </div>
  );
}









