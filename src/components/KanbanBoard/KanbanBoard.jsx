import { useState, useCallback,useEffect } from "react";
import {
  DragDropContext,
  Droppable,
  DropResult,
  DraggableLocation,
} from "@hello-pangea/dnd";
import TaskForm from "./TaskForm";
import KanbanColumn from "./KanbanColumn";
import TaskDescModel from "./TaskDescModel";
import { usePathname } from "next/navigation";


const KanbanBoard = () => {
  const [id,setId] =useState("")
  //  typeof window !== "undefined" ? window.location.pathname.split("/").pop() : null; 
  const pathname=usePathname();
  
  const [tasks, setTasks] = useState({
    backlog: [
      {
        id: 1,
        name: "Design new logo",
        description: "Create logo concepts for the rebranding",
        status: "backlog",
        assignee: null,
        reporter: "Alice",
        date: new Date().toISOString(),
      },
      {
        id: 2,
        name: "Update privacy policy",
        description: "Review and update privacy policy document",
        status: "backlog",
        assignee: null,
        reporter: "Bob",
        date: new Date().toISOString(),
      },
    ],
    inProgress: [
      {
        id: 3,
        name: "Implement dark mode",
        description: "Add dark theme support to the application",
        status: "inProgress",
        assignee: "Charlie",
        reporter: "Alice",
        date: new Date().toISOString(),
      },
    ],
    done: [
      {
        id: 4,
        name: "Setup CI/CD pipeline",
        description: "Configure GitHub Actions for automated testing",
        status: "done",
        assignee: "Bob",
        reporter: "Charlie",
        date: new Date().toISOString(),
      },
    ],
  });
  const [selectedTask,setSelectedTask]=useState({});
  
  const [taskModelOpen,setTaskModelOpen]=useState(false);

  const addTask = (newTask) => {
    setTasks((prev) => ({
      ...prev,
      backlog: [...prev.backlog, newTask],
    }));
  };

  const onDragEnd = useCallback((result) => {
    const { source, destination } = result;

    // If dropped outside the list
    if (!destination) {
      return;
    }

    // If dropped in the same position
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    setTasks((prevTasks) => {
      // Get the source and destination columns
      const start = prevTasks[source.droppableId];
      const finish = prevTasks[destination.droppableId];

      // If moving within same column
      if (source.droppableId === destination.droppableId) {
        const newTasks = Array.from(start);
        const [removed] = newTasks.splice(source.index, 1);
        newTasks.splice(destination.index, 0, removed);

        return {
          ...prevTasks,
          [source.droppableId]: newTasks,
        };
      }

      // Moving between columns
      const startTasks = Array.from(start);
      const finishTasks = Array.from(finish);
      const [removed] = startTasks.splice(source.index, 1);

      // Create a new task object with updated status
      const updatedTask = {
        ...removed,
        status: destination.droppableId,
      };

      finishTasks.splice(destination.index, 0, updatedTask);

      return {
        ...prevTasks,
        [source.droppableId]: startTasks,
        [destination.droppableId]: finishTasks,
      };
    });
  }, []);


   useEffect(()=>{
    if(pathname){
      setId(pathname.split("/").filter(Boolean).pop());
    }
  },[pathname]);

  return (
    <>
    <TaskDescModel  
    isOpen={taskModelOpen}
     onClose={()=>setTaskModelOpen(false)}
      taskData={selectedTask}/>
    <DragDropContext onDragEnd={onDragEnd}>
      <div
        className="flex flex-col h-screen p-8 overflow-hidden"
        style={{
          background:
            "radial-gradient(circle at top left, var(--tw-gradient-stops))",
          backgroundImage: "var(--tw-gradient)",
          "--tw-gradient-from": "var(--brand-blue)",
          "--tw-gradient-to": "var(--brand-orange)",
          "--tw-gradient-stops":
            "var(--tw-gradient-from), var(--tw-gradient-to)",
        }}
      >
        <div className="flex justify-between items-center mb-8 px-4">
        <h1 className={"text-2xl font-bold text-foreground bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"}
          style={{color:"black"}}
          >{id}</h1>
          <h1 className="text-2xl font-bold text-foreground bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
          >
            Kanban Board
          </h1>
         

          <TaskForm
            onSubmit={(newTask) => {
              setTasks((prev) => ({
                ...prev,
                [newTask.status]: [...prev[newTask.status], newTask],
              }));
            }}
          />
        </div>

        <div className="flex flex-1 gap-6 overflow-x-auto px-4 pb-4">
          {Object.entries(tasks).map(([columnId, columnTasks]) => (
            <Droppable key={columnId} droppableId={columnId}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                 
                  className="flex-1 
                  min-w-[300px] 
                  max-w-[400px]
                  bg-card/80
                 
                  rounded-lg 
                  border shadow-3d 
                  hover:shadow-3d-hover 
                  transition-all 
                  duration-300 
                  p-6"
                >
                  {/*  backdrop-blur-sm in above css creating problem */}
                  <KanbanColumn
                    title={columnId}
                    tasks={columnTasks}
                    status={columnId}
                    setTasks={setTasks}
                    setTaskModelOpen={setTaskModelOpen}
                    setSelectedTask={setSelectedTask}
                  />
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </div>
    </DragDropContext>
    </>
  );
};

export default KanbanBoard;
