"use client"

import  React,{useEffect} from "react"
import { useState } from "react"
import KanbanColumn from "./kanban-column"
import { ScrollArea } from "@/components/ui/scroll-area"

import { useSearchParams } from 'next/navigation';

import useProjectStore from "@/zustand/projectStore"
import { useRouter } from 'next/navigation';
import updateTaskStatus from "@/services/task/updateTaskStatus"
import { useToast } from "../ui/use-toast"

import useUserStore from "@/zustand/userStore";
import getAllUsers from "@/services/profile/getAllUsers";
import SearchFilter from "./SearchFilter"

function transformBackendDataToFrontendFormat(backendTasks) {
  const formattedData = {
    ON_HOLD: [],
    TO_DO: [],
    IN_PROGRESS: [],
    DONE: [],
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
      project: task?.project?.name,
      assignee: task?.assignee,
      reporter: task?.reporter
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

export default function KanbanBoard({taskDataProp, isLoading, onTaskUpdate}) {
  
  const [taskData,setTaskData]=useState([]);
 
  const router=useRouter();
  const [columns, setColumns] = useState({});
  // const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const currentProject = useProjectStore((state) => state.currentProject)
  console.log("currentProject,", currentProject);

  const user = useUserStore((state) => state.user);
  const [reporterId, setReporterId] = useState("");
  const [allUsers, setAllUsers] = useState([]);
  
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
          id: `c${Date.now()}`, 
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
    try{
    const response= await updateTaskStatusFunc({taskId:itemId, status:targetColumn});
    if (response.status===200){
    
    setColumns((prev) => {
      const newColumns = { ...prev }
      const item = newColumns[sourceColumn].find((item) => item.id === itemId)
      if (item) {
        item.status = targetColumn
      }
      newColumns[sourceColumn] = newColumns[sourceColumn].filter((item) => item.id !== itemId)
      newColumns[targetColumn].push(item)
      return newColumns
    })
  }
  else if(response.status===403){
 toast({
        title: "Error",
        description: "Updating status is not permitted.",
        variant: "destructive",
      });
  }
  else{
      toast({
        title: "Error",
        description: "Unable to update task status.",
        variant: "destructive",
      });
  }
}
catch(message){
  console.log(message);
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

  function unslugify(slug) {
    return slug?.split('-').map((s) => s.charAt(0).toUpperCase() + s.slice(1)).join(' ');
  }

  useEffect(() => {
    // const fetchTaskByProjectIdFunc = async () => {
    //   if (!id) {
    //     console.warn("No ID provided in query params.");
    //     return;
    //   }

    //   setIsLoading(true); 

    //   try {
    //     const response = await fetchTasksByProjectId({ projectId: id });

    //     if (response) {
    //       const transformedv1 = transformBackendDataToFrontendFormat(response);
    //       console.log(transformedv1, "transformedv1", response);
    //       setColumns(transformedv1);
    //     } else {
    //       console.warn("No data returned for taskId:", id);
    //     }
    //   } catch (error) {
    //     console.error("Error in fetchTaskByProjectIdFunc:", error);
    //   } finally {
    //     setIsLoading(false);
    //   }
    // };

    // fetchTaskByProjectIdFunc();

    if(!unslugify(projectName)){
      // taskData
      if(taskData){
        console.log(taskData, "taskData");
        const transformedv1 = transformBackendDataToFrontendFormat(taskData);
        setColumns(transformedv1);
      }
      // getAllUserTaskFunc();
    } else if (id && taskData) {
      const transformedv1 = transformBackendDataToFrontendFormat(taskData);
      console.log(transformedv1, "transformedv1", taskData);
      setColumns(transformedv1);
    } else {
      console.warn("No data returned for taskId:", id);
    }
  }, [taskData,id]);

  useEffect(() => {
    const getAllUsersFunc = async () => {
      try {
        const response = await getAllUsers();
        if (Array.isArray(response)) {
          setAllUsers(response);
          const matchedUser = response.find(u => u.email === user?.email);
          if (matchedUser) {
            console.log(matchedUser.id, "matchedUser.id");
            setReporterId(matchedUser.id);
          }
        }
      } catch (err) {
        console.error('Failed to fetch users:', err);
      }
    };

    if (user?.email) {
      getAllUsersFunc();
    }
  }, [user?.email]);

   useEffect(()=>{
    setTaskData(taskDataProp||[]);
  },[taskDataProp])

  return (
    <ScrollArea className="container  py-2 m-auto mt-4">
      <div className="flex justify-center items-center mb-3 "
      style={{
        boxShadow:"rgba(27, 31, 35, 0.04) 0px 1px 0px, rgba(255, 255, 255, 0.25) 0px 1px 0px inset"
      }}
      >
          <h1 className="text-3xl font-bold">{unslugify(projectName)}</h1>
      </div>

     <SearchFilter rawData={taskDataProp} setProcessedData={setTaskData}/>

      <div className="flex  gap-4 h-[80vh] mt-4  m-auto">
      <KanbanColumn
          title="On Hold"
          columnId="ON_HOLD"
          items={columns["ON_HOLD"]}
          onDragStart={onDragStart}
          onDragOver={onDragOver}
          onDrop={(e) => onDrop(e, "ON_HOLD")}
          onAddComment={addComment}
          onTaskUpdate={onTaskUpdate}
          isLoading={isLoading}
          noOfSkeleton={5}
          projectName={projectName}
          reporterId={reporterId}
          allUsers={allUsers}
        />
        <KanbanColumn
          title="To Do"
          columnId="TO_DO"
          items={columns["TO_DO"]}
          onDragStart={onDragStart}
          onDragOver={onDragOver}
          onDrop={(e) => onDrop(e, "TO_DO")}
          onAddComment={addComment}
          onTaskUpdate={onTaskUpdate}
          isLoading={isLoading}
          noOfSkeleton={6}
          projectName={projectName}
          reporterId={reporterId}
          allUsers={allUsers}
        />
        <KanbanColumn
          title="In Progress"
          columnId="IN_PROGRESS"
          items={columns["IN_PROGRESS"]}
          onDragStart={onDragStart}
          onDragOver={onDragOver}
          onDrop={(e) => onDrop(e, "IN_PROGRESS")}
          onAddComment={addComment}
          onTaskUpdate={onTaskUpdate}
          isLoading={isLoading}
          noOfSkeleton={3}
          projectName={projectName}
          reporterId={reporterId}
          allUsers={allUsers}
        />
        <KanbanColumn
          title="Done"
          columnId="DONE"
          items={columns["DONE"]}
          onDragStart={onDragStart}
          onDragOver={onDragOver}
          onDrop={(e) => onDrop(e, "DONE")}
          onAddComment={addComment}
          onTaskUpdate={onTaskUpdate}
          isLoading={isLoading}
          noOfSkeleton={5}
          projectName={projectName}
          reporterId={reporterId}
          allUsers={allUsers}
        />
      </div>
    </ScrollArea>
  )
}

