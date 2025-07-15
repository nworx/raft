"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { formatDistanceToNow } from "date-fns";
import { useToast } from "@/components/ui/use-toast";
import createComment from "@/services/comment/createComment";
import getCommentByTask from "@/services/comment/getCommentByTask";
import Spinner from "@/components/ui/spinner";
import updateComment from "@/services/comment/updateComment";
import { Pencil } from "lucide-react";
import { X } from "lucide-react";

const Tiptap = dynamic(() => import("@/components/common/text-editor/TipTap"), {
  ssr: false,
  loading: () => <div className="shimmer-loader"></div>,
});

export default function TaskDialog({ task, open, onOpenChange, onAddComment }) {
  const [newDescription, setNewDescription] = useState(task?.description || "");
  const [newComment, setNewComment] = useState("");
  const [allComments, setAllComments] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [addCommentLoader, setAddCommentLoader] = useState(false);
  const [commentLoader,setCommentLoader]=useState(false);
  const [updateCommentText, setUpdateCommentText] = useState("");
  const [updateCommentObj, setUpdateCommentObj] = useState("");
  const [showUpdateTestPopup, setShowUpdateTestPopup] = useState(false);
  const contentRef = useRef();
  const { toast } = useToast();


  const getTextFromHTML = (html) => {
  const div = document.createElement("div");
  div.innerHTML = html;
  return div.textContent || div.innerText || "";
};

  const handleAddComment = async () => {
    console.log(newComment, "newComment", task);
    if (!getTextFromHTML(newComment).trim()) {
      toast({
        title: "Error",
        description: "Comment cannot be empty",
        variant: "destructive",
      });
      return;
    }

    try {
      setAddCommentLoader(true);
      const response = await createComment({
        taskId: task?.id,
        content: newComment,
      });
      if (response) {
        onAddComment(newComment.trim());
        setAllComments((previouscoment) => [...previouscoment, response]);
        setNewComment(""); // Reset the input

        toast({
          title: "Success",
          description: "Comment added successfully",
        });
      } else {
        toast({
          title: "Error",
          description: "Unable to add comment.",
        });
      }
      setAddCommentLoader(false);
    } catch (errorMessage) {
      setAddCommentLoader(false);
      console.log(errorMessage, "errorMessage createComment");
    }
  };

  const handleUpdateComment = async () => {
    console.log(updateCommentText, "handleUpdateComment", task);
    if (!getTextFromHTML(updateCommentText).trim()) {
      toast({
        title: "Error",
        description: "Comment cannot be empty",
        variant: "destructive",
      });
      return;
    }

    try {
      
      const response = await updateComment({
        commentId: updateCommentObj?.id,
        content: updateCommentText,
      });
      if (response) {
        setUpdateCommentText("");
        setAllComments((prevComments) =>
          prevComments.map((comment) =>
          comment.id === response.id ? response : comment
        ));
        

        toast({
          title: "Success",
          description: "Comment updated successfully",
        });
      } else {
        toast({
          title: "Error",
          description: "Unable to update comment.",
        });
      }
       setShowUpdateTestPopup(false);
    
    } catch (errorMessage) {
      setShowUpdateTestPopup(false);
      console.log(errorMessage, "errorMessage updateComment");
    }
  };

  const handleUpdateCommentPopup = (comment) => {
    setUpdateCommentObj(comment);
    setUpdateCommentText(comment?.content);
    setShowUpdateTestPopup(true);
  };

  const getCommentByTaskFunc = async () => {
    const response = await getCommentByTask({ taskId: task.id });
    if (response) {

      setAllComments(response);
    } else {
      toast({
        title: "Error",
        description: "Unable to get comments",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    getCommentByTaskFunc();
  }, []);
  useEffect(() => {
    const container = contentRef.current;
    if (!container) return;

    const images = container.querySelectorAll("img");

    images.forEach((img) => {
      // Clear existing handlers to avoid duplicates
      img.onclick = null;

      img.style.cursor = "pointer";
      img.style.width = "96px"; // Tailwind w-24
      img.style.height = "auto";

      img.onclick = () => setSelectedImage(img.src);
    });

    return () => {
      images.forEach((img) => (img.onclick = null)); // cleanup
    };
  }, [allComments, selectedImage]);

  useEffect(() => {
    console.log(updateCommentText, "updateCommentTextupdateCommentText");
  }, [updateCommentText]);

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-50 bg-black opacity-50"
          onClick={() => onOpenChange(false)}
        />
      )}

      {selectedImage && (
        <div
          className="z-[9999] fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
          onClick={() => setSelectedImage(null)}
        >
          <img
            src={selectedImage}
            alt="Preview"
            className="max-w-full max-h-full rounded shadow-lg"
          />
        </div>
      )}

      {showUpdateTestPopup && (
        <div className="z-[9999] fixed inset-0 flex items-center justify-center bg-black bg-opacity-75">
          <div className="relative bg-white dark:bg-zinc-900 p-6 rounded-md shadow-lg w-full max-w-lg">
            {/* Close Icon */}
            <button
              className="absolute top-4 right-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-white "
              onClick={() => setShowUpdateTestPopup(false)}
              aria-label="Close"
            >
              <X className="w-5 h-5 ml-5 " />
            </button>

            {/* Tiptap Editor */}
            <Tiptap
              text={updateCommentText}
              setText={setUpdateCommentText}
              height="300px"
            />

            <Button
              onClick={handleUpdateComment}
              disabled={!updateCommentText}
              className="mt-4"
            >
              Update Comment
            </Button>
          </div>
        </div>
      )}

      {open && (
        <div className="fixed inset-0 z-50 flex justify-center items-center">
          <div className="bg-white rounded-lg shadow-lg w-[60vw] h-[90vh] p-6 flex flex-col">
            <div className="flex flex-col flex-grow overflow-scroll ">
              <h1 className="text-xl font-bold">Task Details</h1>
              <div className="my-2" title="Task Title">
                {/* <input
                  className="bg-[#27272a] text-white rounded-md text-base  h-auto px-4 py-1 border-transparent hover:border-input focus:border-input transition-colors w-full"
                  defaultValue={task.title}
                /> */}
                <Tiptap text={task.title} height="25px" />
              </div>

              <div className="grid gap-4" title="Task Description">
                <div className="space-y-2">
                  <Tiptap
                    text={newDescription}
                    setText={setNewDescription}
                    height="100px"
                  />
                </div>
              </div>

              <Separator className="my-6" />

              <h1 className="text-xl font-bold ">
                {allComments.length} Comments
              </h1>
              <div className="mt-2 space-y-4">
                <Tiptap
                  text={newComment}
                  setText={setNewComment}
                  height="200px"
                />
                <div className="flex items-center gap-2">
                  {addCommentLoader ? (
                    <Spinner />
                  ) : (
                    <Button onClick={handleAddComment} disabled={!newComment}>
                      Add Comment
                    </Button>
                  )}
                  <p className="text-sm text-muted-foreground">
                    Press{" "}
                    <kbd className="px-2 py-1 rounded bg-muted">
                      ⌘/Ctrl + Enter
                    </kbd>{" "}
                    to comment
                  </p>
                </div>
                <div className="mt-4 space-y-4 flex-grow overflow-hidden">
                  <label className="mt-2 mb-2 block font-medium">
                    Comments
                  </label>
                  <ScrollArea className="h-[calc(100%-2rem)] pr-4 py-2">
                    <div className="space-y-4">
                      {allComments.map((comment) => (
                        <div key={comment?.id} className="flex gap-4 group">
                          <Avatar>
                            <AvatarImage src={comment?.user?.avatar} />
                            <AvatarFallback>
                              {comment?.user?.name[0]}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-grow space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="font-semibold">
                                {comment?.user?.name}
                              </span>
                              <span className="text-sm text-muted-foreground">
                                {formatDistanceToNow(
                                  new Date(comment?.createdAt),
                                  {
                                    addSuffix: true,
                                  }
                                )}
                              </span>
                              <div
                                style={{ cursor: "pointer" }}
                                onClick={() =>
                                  handleUpdateCommentPopup(comment)
                                }
                              >
                                <Pencil className="w-4 h-4" />
                              </div>
                            </div>
                            {/* <p className="text-sm">{comment.content}</p> */}
                            <div
                              ref={contentRef}
                              className="text-sm prose prose-sm dark:prose-invert max-w-none [&_img]:w-24 [&_img]:h-auto"
                              dangerouslySetInnerHTML={{
                                __html: comment?.content,
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <Button
                onClick={() => onOpenChange(false)}
                variant="outline"
                className="w-full"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
