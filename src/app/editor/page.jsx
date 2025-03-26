import dynamic from 'next/dynamic';
const Tiptap = dynamic(() => import("@/components/common/text-editor/TipTap"), {
  ssr: false,
});
const page = () => {
  return (  
    <Tiptap />
  )
}

export default page;