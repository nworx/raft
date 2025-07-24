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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import assignTask from "@/services/task/assignTask";
import { format } from 'date-fns';
import useProjectStore from "@/zustand/projectStore";
const Tiptap = dynamic(() => import("@/components/common/text-editor/TipTap"), {
  ssr: false,
  loading: () => <div className="shimmer-loader"></div>,
});

import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import updateTask from "@/services/task/updateTask";
import {TASK_STATUS_LABEL,TASK_PRIORITY,TASK_TYPE} from "@/constant/task"
import useUserStore from "@/zustand/userStore";
// import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";





export default function TaskDialog({ task, open, onOpenChange, onAddComment, projectName, reporterId, onTaskUpdate }) {
 
  const user = useUserStore((state) => state.user);
  const [taskWholeData,setTaskWholeData]=useState(task)
  const currentProject = useProjectStore((state) => state.currentProject)


  const [taskTitle, setTaskTitle]=useState(taskWholeData?.title||"");
  const [newDescription, setNewDescription] = useState(taskWholeData?.description || "");
  const [newComment, setNewComment] = useState("");
  const [allComments, setAllComments] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [addCommentLoader, setAddCommentLoader] = useState(false);
  const [updateTitleAndDescriptionLoader,setUpdateTitleAndDescriptionLoader]=useState(false);
  const [updateCommentText, setUpdateCommentText] = useState("");
  const [updateCommentObj, setUpdateCommentObj] = useState("");
  const [showUpdateTestPopup, setShowUpdateTestPopup] = useState(false);
  const contentRef = useRef();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [assignedToId, setAssignedToId] = useState("");
  const [localAssignee, setLocalAssignee] = useState(null);

  const [isUpdated, setIsUpdated] = useState(false);

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
      const safeContentInComment = newComment.replace(/"/g, "'");
      const response = await createComment({
        taskId: taskWholeData?.id,
        content: safeContentInComment,
      });
      if (response) {
        onAddComment(newComment.trim());
        setAllComments((previouscoment) => [...previouscoment, response]);
        setNewComment(""); // Reset the input
        
        setIsUpdated(true);
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

  const handleUpdateTaskTitleAndDesc = async () =>{
    setUpdateTitleAndDescriptionLoader(true);
     try{
    const response=await updateTask({
      taskId:taskWholeData?.id,
      title:taskTitle,
      description:newDescription,
    })
    if(response?.status === 200){
      setIsUpdated(true);
      setTaskWholeData((prev)=>({
        ...prev,
        ...response?.data,
        project:response?.data?.project?.name
      }))
       toast({
          title: "Success",
          description: "Task updated successfully.",
        });
    }
    else{
      toast({
        title: "Error",
        description: "Unable to update task.",
        variant: "destructive",
      });
    }
    }
    catch{
    setUpdateTitleAndDescriptionLoader(false);
     toast({
        title: "Error",
        description: "Unable to update task.",
        variant: "destructive",
      });
    }
     setUpdateTitleAndDescriptionLoader(false);
  }

  const updateTaskSingleValue=async({place,value})=>{
    setIsLoading(true);
    try{
    const response=await updateTask({
      taskId:task?.id,
     [place]:value
    })
    if(response?.status === 200){
    setIsUpdated(true);
      setTaskWholeData((prev)=>({
        ...prev,
        ...response?.data,
        project:response?.data?.project?.name
      }))
       toast({
          title: "Success",
          description: "Task updated successfully",
        });
    }
    else{
      toast({
        title: "Error",
        description: "Unable to update.",
        variant: "destructive",
      });
    }
    }
    catch{
    setIsLoading(false);
     toast({
        title: "Error",
        description: "Unable to update.",
        variant: "destructive",
      });
    }
    setIsLoading(false);
  }

  const handleUpdateComment = async () => {
    console.log(updateCommentText, "handleUpdateComment");
    if (!getTextFromHTML(updateCommentText).trim()) {
      toast({
        title: "Error",
        description: "Comment cannot be empty.",
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
    const response = await getCommentByTask({ taskId: taskWholeData.id });
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

  function getInitials(fullName) {
    if (!fullName || typeof fullName !== 'string') return '';

    const parts = fullName
      .trim()
      .split(' ')
      .filter(Boolean);

    if (parts.length === 0) return '';

    const firstInitial = parts[0]?.[0]?.toUpperCase() || '';
    const lastInitial = parts.length > 1 ? parts[parts.length - 1]?.[0]?.toUpperCase() : '';

    return firstInitial + lastInitial;
  }

  const closeTaskDialogHandler = async () => {
    
    if(isUpdated){
      await onTaskUpdate();
      onOpenChange(false);
    } else {
      onOpenChange(false);
    }
  }

  const assignTaskHandler = async (assigneeId) => {
    setIsLoading(true);
    try {
      const response = await assignTask({ taskId: taskWholeData?.id, assigneeId });
      console.log("assignTask Response:", response);
      setIsUpdated(true)
      // await onTaskUpdate();
    } catch (error) {
      console.log("Error in assign task handler:", error);
    } finally {
      setIsLoading(false);
    }
  };


  const assignTaskFunc = () => {
    assignTaskHandler(reporterId);
  };

  useEffect(() => {
    if (assignedToId) {
      assignTaskHandler(assignedToId);
    }
  }, [assignedToId]);

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
          className="z-[9999] fixed inset-0 flex items-center justify-center bg-black bg-opacity-75"
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
          <div className="bg-white rounded-lg shadow-lg w-[70vw] h-[90vh] p-6 flex flex-row gap-4">

            <div className="flex flex-col flex-grow overflow-scroll pr-4">
              <h1 className="text-xl font-bold">Task Details</h1>
              <div className="my-2" title="Task Title">
                {/* <input
                  className="bg-[#27272a] text-white rounded-md text-base  h-auto px-4 py-1 border-transparent hover:border-input focus:border-input transition-colors w-full"
                  defaultValue={task.title}
                /> */}
                <Tiptap text={taskTitle} setText={setTaskTitle} height="25px" />
              </div>

              <div className="grid gap-4" title="Task Description">
                <div className="space-y-2">
                  <Tiptap
                    text={newDescription}
                    setText={setNewDescription}
                    height="100px"
                  />
                </div>

                 <div className="flex items-center gap-2">
                { 
                 updateTitleAndDescriptionLoader?
                 <Spinner/>
                 :
                  <Button onClick={handleUpdateTaskTitleAndDesc} disabled={!getTextFromHTML(taskTitle)||!getTextFromHTML(newDescription) } >
                    Update Title & Description
                 </Button>
                 }
                 </div>
              </div>

              <Separator className="my-6" />

              <div className="flex justify-between">
                <h1 className="text-xl font-bold ">
                  {allComments.length} Comments
                </h1>

                {/* {projectName && <div className="flex justify-center items-center gap-1">


                {!task?.assignee && <Button 
                  type="button"
                  className="bg-transparent text-black hover:text-white hover:bg-black/80 transition-colors duration-200" 
                  onClick={assignTaskFunc}
                  disabled={isLoading}
                >
                  {isLoading? <Spinner/> : "Assign to Me" }
                </Button>}

                  <TooltipProvider>
                    {task?.assignee && <div className="flex -space-x-3">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Avatar className="h-7 w-7 data-[slot=avatar]:ring-2 data-[slot=avatar]:ring-background data-[slot=avatar]:grayscale">
                              <AvatarFallback className="font-bold text-sm ">{(localAssignee?.username || task?.assignee?.username)?.charAt(0)?.toUpperCase()}</AvatarFallback>
                            </Avatar>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{localAssignee?.username || task?.assignee?.username}</p>
                          </TooltipContent>
                        </Tooltip>
                    </div>}
                  </TooltipProvider>
                </div>} */}
              </div>

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
                              {getInitials(comment?.authorName)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-grow space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="font-semibold">
                                {comment?.authorName}
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

            <div className="w-36 border-l pl-4 flex-shrink-0">
              <h2 className="text-lg font-semibold mb-4">Properties</h2>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Project</label>
                <p className="text-sm text-gray-900 font-semibold">{taskWholeData?.project}</p>
              </div>
              
              {/* <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <p className="text-sm text-gray-900 font-semibold">{TASK_STATUS_LABEL[taskWholeData?.status]||taskWholeData?.status}</p>
              </div> */}
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="w-40 grid gap-2 mb-4">
                      <Label htmlFor="status" className="flex items-center">
                        Status
                      </Label>
                      <Select
                        disabled={projectName && currentProject && taskWholeData?.assignee && user?.email !== taskWholeData?.assignee?.email}
                        id="status"
                        value={taskWholeData?.status}
                        onValueChange={(value) => {

                          updateTaskSingleValue({ place: "status", value })
                        }}
                      >
                        <SelectTrigger id="status" className="overflow-hidden text-ellipsis whitespace-nowrap">
                          <SelectValue placeholder={taskWholeData?.status ? taskWholeData?.status : "Select Status"} className="overflow-hidden text-ellipsis whitespace-nowrap" />
                        </SelectTrigger>
                        <SelectContent>
                          {Object?.keys?.(TASK_STATUS_LABEL)?.map((key) => (
                            <SelectItem key={key} value={key}>
                              {TASK_STATUS_LABEL[key]}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </TooltipTrigger>
                  {projectName &&
                    currentProject &&
                    taskWholeData?.assignee &&
                    user?.email !== taskWholeData?.assignee?.email ? (
                    <TooltipContent>
                      Only the assignee can update the status
                    </TooltipContent>
                  ) : null}
                </Tooltip>
              </TooltipProvider>

              {/* <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Priority</label>
                <p className="text-sm text-gray-900 font-semibold">{taskWholeData?.priority}</p>
              </div> */}
              <div className="w-40 grid gap-2">
                    <Label htmlFor="priority" className="flex items-center">
                      Priority
                    </Label>
                    <Select
                      id="priority"
                      value={taskWholeData?.priority}
                      onValueChange={(value) => {
                      updateTaskSingleValue({place:"priority",value});
                    }}
                    >
                      <SelectTrigger id="priority" className="overflow-hidden text-ellipsis whitespace-nowrap">
                        <SelectValue placeholder={taskWholeData?.priority? taskWholeData?.priority : "Select Priority "} className="overflow-hidden text-ellipsis whitespace-nowrap"/>
                      </SelectTrigger>
                      <SelectContent>
                        {Object?.keys?.(TASK_PRIORITY)?.map(( key ) => (
                          <SelectItem key={key} value={key}>
                            {TASK_PRIORITY[key]}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

              {/* <div className="mt-4 mb-4">
                <label className="block text-sm font-medium text-gray-700">Type</label>
                <p className="text-sm text-gray-900 font-semibold">{taskWholeData?.type}</p>
              </div> */}

               <div className="w-40 grid gap-2 mt-4 mb-4">
                    <Label htmlFor="type" className="flex items-center">
                      Type
                    </Label>
                    <Select
                      id="type"
                      value={taskWholeData?.type}
                      onValueChange={(value) => {
                      updateTaskSingleValue({place:"type",value})
                    }}
                    >
                      <SelectTrigger id="type" className="overflow-hidden text-ellipsis whitespace-nowrap">
                        <SelectValue placeholder={taskWholeData?.type? taskWholeData?.type : "Select Task Type "} className="overflow-hidden text-ellipsis whitespace-nowrap"/>
                      </SelectTrigger>
                      <SelectContent>
                        {Object?.keys?.(TASK_TYPE)?.map(( key ) => (
                          <SelectItem key={key} value={key}>
                            {TASK_TYPE[key]}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Due Date</label>
                <p className="text-sm text-gray-900 font-semibold">{taskWholeData.dueDate ? format(new Date(taskWholeData.dueDate), 'dd MMMM yyyy') : "N/A"}</p>
              </div>

              <div className="mb-4">
                {/* <label className="block text-sm font-medium text-gray-700" htmlFor="assignee">Assign</label> */}
                {/* <p className="text-sm text-gray-900">{task?.assignee?.username}</p> */}
                {projectName && currentProject && <div className="w-40 grid gap-2">
                    <Label htmlFor="assignee" className="flex items-center">
                      Assign To
                    </Label>
                    <Select
                      id="assignee"
                      value={assignedToId}
                      onValueChange={(value) => {
                      setAssignedToId(value);
                      const selectedUser = currentProject?.members.find(({ user }) => String(user.id) === value)?.user;
                      setLocalAssignee(selectedUser);
                    }}
                    >
                      <SelectTrigger id="assignee" className="overflow-hidden text-ellipsis whitespace-nowrap">
                        <SelectValue placeholder={taskWholeData?.assignee?.username? taskWholeData?.assignee?.username : "Assign task to"} className="overflow-hidden text-ellipsis whitespace-nowrap"/>
                      </SelectTrigger>
                      <SelectContent>
                        {currentProject?.members?.map(({ user }) => (
                          <SelectItem key={user.id} value={String(user.id)}>
                            {user?.username}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>}
              </div>

            </div>

            <div className="-mt-5 -mr-3">
              <button
                onClick={closeTaskDialogHandler}
                className="text-gray-500 hover:text-gray-700 rounded-full p-1 transition-colors"
                aria-label="Close"
                disabled={isLoading}
              >
                {isLoading? <Spinner className="w-5 h-5"/> :<X className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
