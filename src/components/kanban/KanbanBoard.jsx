"use client"

import  React,{useEffect} from "react"
import { useState } from "react"
import KanbanColumn from "./kanban-column"
import { ScrollArea } from "@/components/ui/scroll-area"
import fetchTasksByProjectId from "@/services/task/fetchTasksByProjectId"
import { Button } from "../ui/button"

import { useSearchParams } from 'next/navigation';

import useProjectStore from "@/zustand/projectStore"
import getAllUserTask from "@/services/task/getAllUserTask"
import { useRouter } from 'next/navigation';
import updateTaskStatus from "@/services/task/updateTaskStatus"
import { useToast } from "../ui/use-toast"


function transformBackendDataToFrontendFormat(backendTasks) {
  const formattedData = {
    ON_HOLD: [],
    TO_DO: [],
    IN_PROGRESS: [],
    DONE: [],
  };

  // Map backend `status` to frontend keys
  const statusMap = {
    TO_DO: "todo",
    IN_PROGRESS: "in-progress",
    ON_HOLD: "on_hold",
    DONE: "done",
  };

  backendTasks.forEach(task => {
    const statusKey = task.status || "TO_DO";

    const formattedTask = {
      id: task?.id,
      title: task?.title,
      content: task?.title,
      description: task?.description,
      comments: [],
      priority: task?.priority,
      status: task?.status,
      dueDate: task?.dueDate,
      type: task?.type,
      project: task?.project?.name
    };

    formattedData[statusKey].push(formattedTask);
  });

  return formattedData;
}

// Mock current user
const currentUser = {
  name: "Current User",
  avatar: "/placeholder.svg?height=40&width=40",
}

export default function KanbanBoard() {
  const router=useRouter();
  const [columns, setColumns] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const currentProject = useProjectStore((state) => state.currentProject)
  console.log("currentProject,", currentProject);
  
  const searchParams = useSearchParams();
  const projectName = searchParams.get('project');
  const id = searchParams.get('id');

  const addComment = (columnId, taskId, commentContent) => {
    setColumns((prev) => {
      const newColumns = { ...prev }
      const column = newColumns[columnId]
      const taskIndex = column.findIndex((task) => task.id === taskId)

      if (taskIndex !== -1) {
        const newComment = {
          id: `c${Date.now()}`, // Simple way to generate unique IDs
          user: currentUser,
          content: commentContent,
          createdAt: new Date().toISOString(),
        }

        column[taskIndex] = {
          ...column[taskIndex],
          comments: [...column[taskIndex].comments, newComment],
        }
      }

      return newColumns
    })
  }

  const onDragStart = (e, itemId, sourceColumn) => {

    e.dataTransfer.setData("text/plain", JSON.stringify({ itemId, sourceColumn }))
  }

  const onDragOver = (e) => {
    e.preventDefault()
  }

  const onDrop = async(e, targetColumn) => {
    e.preventDefault()
   
    const { itemId, sourceColumn } = JSON.parse(e.dataTransfer.getData("text"))
     console.log(itemId, targetColumn,"e, targetColumn onDrop")
    if (sourceColumn === targetColumn) return
    const response= await updateTaskStatusFunc({taskId:itemId, status:targetColumn});
    if (response.status===200){
    
    setColumns((prev) => {
      const newColumns = { ...prev }
      const item = newColumns[sourceColumn].find((item) => item.id === itemId)
      newColumns[sourceColumn] = newColumns[sourceColumn].filter((item) => item.id !== itemId)
      newColumns[targetColumn].push(item)
      return newColumns
    })
  }
  else{
      toast({
        title: "Error",
        description: "Unable to update task status.",
        variant: "destructive",
      });
  }
  }

  const updateTaskStatusFunc=async({taskId, status})=>{
    
    const response=await updateTaskStatus({taskId, status});
    return response;
  }

  const createTask = (columnId, task) => {
    setColumns((prev) => {
      const newColumns = { ...prev }
      const newTask = {
        id: `t${Date.now()}`, // Simple way to generate unique IDs
        title: task?.title,
        content: task.title, // For backwards compatibility
        projectId: task?.projectId,
        description: task?.description,
        assigneeId: task?.assigneeId,
        reporterId: 4,
        type: task?.type,
        status: columnId,
        priority: task?.priority,
        dueDate: task?.dueDate,
      }

      newColumns[columnId] = [...newColumns[columnId], newTask]
      return newColumns
    })
  }

  function unslugify(slug) {
    return slug?.split('-').map((s) => s.charAt(0).toUpperCase() + s.slice(1)).join(' ');
  }

  useEffect(() => {
    const fetchTaskByProjectIdFunc = async () => {
      if (!id) {
        console.warn("No ID provided in query params.");
        return;
      }

      setIsLoading(true); 

      try {
        const response = await fetchTasksByProjectId({ projectId: id });

        if (response) {
          const transformedv1 = transformBackendDataToFrontendFormat(response);
          console.log(transformedv1, "transformedv1", response);
          setColumns(transformedv1);
        } else {
          console.warn("No data returned for taskId:", id);
        }
      } catch (error) {
        console.error("Error in fetchTaskByProjectIdFunc:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTaskByProjectIdFunc();
  }, [id]);


  const getAllUserTaskFunc=async()=>{
    try{
       setIsLoading(true);
      const response =await getAllUserTask();
      console.log(response,"responseresponse")
      if(response){
        const transformedv1 = transformBackendDataToFrontendFormat(response?.data);
        setColumns(transformedv1);
      }
       setIsLoading(false);
    }
    catch(error){
      setIsLoading(false);
    }
  }


  useEffect(()=>{
    if(!unslugify(projectName)){
      getAllUserTaskFunc();
    }
  },[router.isReady])

  return (
    <ScrollArea className="container  py-2 m-auto mt-6">
      <div className="flex justify-center items-center">
          <h1 className="text-3xl font-bold">{unslugify(projectName)}</h1>
      </div>

      <div className="flex  gap-4 h-[80vh] mt-4 m-auto">
      <KanbanColumn
          title="On Hold"
          columnId="ON_HOLD"
          items={columns["ON_HOLD"]}
          onDragStart={onDragStart}
          onDragOver={onDragOver}
          onDrop={(e) => onDrop(e, "ON_HOLD")}
          onAddComment={addComment}
          onCreateTask={createTask}
          isLoading={isLoading}
          noOfSkeleton={5}
          projectName={projectName}
        />
        <KanbanColumn
          title="To Do"
          columnId="TO_DO"
          items={columns["TO_DO"]}
          onDragStart={onDragStart}
          onDragOver={onDragOver}
          onDrop={(e) => onDrop(e, "TO_DO")}
          onAddComment={addComment}
          onCreateTask={createTask}
          isLoading={isLoading}
          noOfSkeleton={6}
          projectName={projectName}
        />
        <KanbanColumn
          title="In Progress"
          columnId="IN_PROGRESS"
          items={columns["IN_PROGRESS"]}
          onDragStart={onDragStart}
          onDragOver={onDragOver}
          onDrop={(e) => onDrop(e, "IN_PROGRESS")}
          onAddComment={addComment}
          onCreateTask={createTask}
          isLoading={isLoading}
          noOfSkeleton={3}
          projectName={projectName}
        />
        <KanbanColumn
          title="Done"
          columnId="DONE"
          items={columns["DONE"]}
          onDragStart={onDragStart}
          onDragOver={onDragOver}
          onDrop={(e) => onDrop(e, "DONE")}
          onAddComment={addComment}
          onCreateTask={createTask}
          isLoading={isLoading}
          noOfSkeleton={5}
          projectName={projectName}
        />
      </div>
    </ScrollArea>
  )
}

