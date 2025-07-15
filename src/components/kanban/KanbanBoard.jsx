"use client"

import  React,{useEffect} from "react"
import { useState } from "react"
import KanbanColumn from "./kanban-column"
import { ScrollArea } from "@/components/ui/scroll-area"
import fetchTasksByProjectId from "@/services/task/fetchTasksByProjectId"
import { Button } from "../ui/button"

import { useSearchParams } from 'next/navigation';

import useProjectStore from "@/zustand/projectStore"


function transformBackendDataToFrontendFormat(backendTasks) {
  const formattedData = {
    on_hold: [],
    todo: [],
    "in-progress": [],
    done: [],
  };

  // Map backend `status` to frontend keys
  const statusMap = {
    OPEN: "todo",
    "in-progress": "in-progress",
    "on_hold": "on_hold",
    "done": "done",
  };

  backendTasks.forEach(task => {
    const statusKey = statusMap[task.status] || "todo";

    const formattedTask = {
      id: task?.id,
      title: task?.title,
      content: task?.title,
      description: task?.description,
      comments: [],
      priority: task?.priority,
      status: task?.status,
      dueDate: task?.dueDate
    };

    formattedData[statusKey].push(formattedTask);
  });

  return formattedData;
}


const backendResponse = [
  {
    id: 1,
    title: "test1_task1",
    description: "descriptiondescription",
    status: "OPEN",
    type: "TASK",
    priority: "MEDIUM",
    createdAt: "2025-07-04T18:51:51.061231",
    updatedAt: "2025-07-04T18:51:51.061312",
    dueDate: null,
    project: {
      id: 52,
      name: "test1"
    }
  },
  {
    id: 2,
    title: "test1_task1",
    description: "descriptiondescription",
    status: "",
    type: "TASK",
    priority: "",
    createdAt: "2025-07-07T13:36:47.351428",
    updatedAt: "2025-07-07T13:36:47.351523",
    dueDate: null,
    project: {
      id: 52,
      name: "test1"
    }
  },
  {
    id: 3,
    title: "test 2",
    description: " test 2 description",
    status: "OPEN",
    type: null,
    priority: "MEDIUM",
    createdAt: "2025-07-07T14:12:10.107838",
    updatedAt: "2025-07-07T14:12:10.107875",
    dueDate: null,
    project: {
      id: 52,
      name: "test1"
    }
  }
];

const transformed = transformBackendDataToFrontendFormat(backendResponse);
console.log(transformed);



const initialData = {
  on_hold:[
    // {
    //   id: "o1",
    //   title: "Create a Kanban board",
    //   content: "Create a Kanban board",
    //   description: "Implement a Kanban board with drag and drop functionality using React and Tailwind CSS.",
    //   comments: [
    //     {
    //       id: "o1",
    //       user: { name: "John Doe", avatar: "/placeholder.svg?height=40&width=40" },
    //       content: "This looks great! Let's add more features.",
    //       createdAt: "2024-03-01T10:00:00Z",
    //     },
    //     {
    //       id: "o2",
    //       user: { name: "Jane Smith", avatar: "/placeholder.svg?height=40&width=40" },
    //       content: "I can help with the styling.",
    //       createdAt: "2024-03-01T11:30:00Z",
    //     },
    //     {
    //       id: "o1",
    //       user: { name: "John Doe", avatar: "/placeholder.svg?height=40&width=40" },
    //       content: "This looks great! Let's add more features.",
    //       createdAt: "2024-03-01T10:00:00Z",
    //     },
    //     {
    //       id: "o2",
    //       user: { name: "Jane Smith", avatar: "/placeholder.svg?height=40&width=40" },
    //       content: "I can help with the styling.",
    //       createdAt: "2024-03-01T11:30:00Z",
    //     },
    //   ],
    // },
    // {
    //   id: "o21",
    //   title: "Add drag and drop functionality",
    //   content: "Add drag and drop functionality",
    //   description: "Implement drag and drop functionality for cards between columns.",
    //   comments: [],
    // },
  ],
  todo: [
    // {
    //   id: "t1", // hai
    //   title: "Create a Kanban board", // hai
    //   content: "Create a Kanban board", 
    //   description: "Implement a Kanban board with drag and drop functionality using React and Tailwind CSS.",
    //   comments: [
    //     {
    //       id: "c1",
    //       user: { name: "John Doe", avatar: "/placeholder.svg?height=40&width=40" },
    //       content: "This looks great! Let's add more features.",
    //       createdAt: "2024-03-01T10:00:00Z",
    //     },
    //     {
    //       id: "c2",
    //       user: { name: "Jane Smith", avatar: "/placeholder.svg?height=40&width=40" },
    //       content: "I can help with the styling.",
    //       createdAt: "2024-03-01T11:30:00Z",
    //     },
    //   ],
    // },
    // {
    //   id: "t2",
    //   title: "Add drag and drop functionality",
    //   content: "Add drag and drop functionality",
    //   description: "Implement drag and drop functionality for cards between columns.",
    //   comments: [],
    // },
  ],
  "in-progress": [
    // {
    //   id: "t3",
    //   title: "Design UI for board",
    //   content: "Design UI for board",
    //   description: "Create a clean and modern UI design for the Kanban board.",
    //   comments: [],
    // },
  ],
  done: [
    // {
    //   id: "t4",
    //   title: "Set up project structure",
    //   content: "Set up project structure",
    //   description: "Initialize the project and set up necessary dependencies.",
    //   comments: [],
    // },
  ],
}

// Mock current user
const currentUser = {
  name: "Current User",
  avatar: "/placeholder.svg?height=40&width=40",
}

export default function KanbanBoard() {
  const [columns, setColumns] = useState({})
  const [isLoading, setIsLoading] = useState(false)

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

  const onDrop = (e, targetColumn) => {
    e.preventDefault()
    const { itemId, sourceColumn } = JSON.parse(e.dataTransfer.getData("text"))

    if (sourceColumn === targetColumn) return

    setColumns((prev) => {
      const newColumns = { ...prev }
      const item = newColumns[sourceColumn].find((item) => item.id === itemId)
      newColumns[sourceColumn] = newColumns[sourceColumn].filter((item) => item.id !== itemId)
      newColumns[targetColumn].push(item)
      return newColumns
    })
  }

  const createTask = (columnId, task) => {
    setColumns((prev) => {
      const newColumns = { ...prev }
      const newTask = {
        id: `t${Date.now()}`, // Simple way to generate unique IDs
        title: task.title,
        content: task.title, // For backwards compatibility
        description: task.description,
        comments: [],
      }

      newColumns[columnId] = [...newColumns[columnId], newTask]
      return newColumns
    })
  }

  function unslugify(slug) {
    return slug?.split('-').map((s) => s.charAt(0).toUpperCase() + s.slice(1)).join(' ');
  }

  // useEffect(()=>{
  //   const fetchTaskByProjectIdFunc=async()=>{
  //     try{
  //     const response= await fetchTasksByProjectId({projectId:1});
  //     console.log(response,"response fetchTaskByProjectId")
  //     }
  //     catch(e){
  //       console.log(e<"error fetchTaskByProjectId");
  //     }
  //   }
  //   fetchTaskByProjectIdFunc();
  
  // },[])

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

  return (
    <ScrollArea className="container  py-2 m-auto mt-6">
      <div className="flex justify-center items-center">
          <h1 className="text-3xl font-bold">{unslugify(projectName)}</h1>
      </div>

      <div className="flex  gap-4 h-[80vh] mt-4 m-auto">
      <KanbanColumn
          title="On Hold"
          columnId="on_hold"
          items={columns["on_hold"]}
          onDragStart={onDragStart}
          onDragOver={onDragOver}
          onDrop={(e) => onDrop(e, "on_hold")}
          onAddComment={addComment}
          onCreateTask={createTask}
          isLoading={isLoading}
          noOfSkeleton={5}
        />
        <KanbanColumn
          title="To Do"
          columnId="todo"
          items={columns["todo"]}
          onDragStart={onDragStart}
          onDragOver={onDragOver}
          onDrop={(e) => onDrop(e, "todo")}
          onAddComment={addComment}
          onCreateTask={createTask}
          isLoading={isLoading}
          noOfSkeleton={6}
        />
        <KanbanColumn
          title="In Progress"
          columnId="in-progress"
          items={columns["in-progress"]}
          onDragStart={onDragStart}
          onDragOver={onDragOver}
          onDrop={(e) => onDrop(e, "in-progress")}
          onAddComment={addComment}
          onCreateTask={createTask}
          isLoading={isLoading}
          noOfSkeleton={3}
        />
        <KanbanColumn
          title="Done"
          columnId="done"
          items={columns["done"]}
          onDragStart={onDragStart}
          onDragOver={onDragOver}
          onDrop={(e) => onDrop(e, "done")}
          onAddComment={addComment}
          onCreateTask={createTask}
          isLoading={isLoading}
          noOfSkeleton={5}
        />
      </div>
    </ScrollArea>
  )
}

