import { Draggable } from "@hello-pangea/dnd";
import { useRouter } from "next/navigation";


const KanbanCard = ({ task, index,setTaskModelOpen ,setSelectedTask}) => {
  const router=useRouter();

  const handleCardClick=()=>{
    console.log("Raj",task)
    router?.push("/ticket/"+task?.id);
    // setTaskModelOpen(true);
    setSelectedTask(task);
  }
  return (
    <Draggable draggableId={task.id.toString()} index={index} >
      {(provided, snapshot) => (
        <div
        onClick={handleCardClick}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`group p-4 mb-4 bg-card rounded-lg border shadow-sm hover:shadow-md transition-shadow duration-200 ${
            snapshot.isDragging ? "shadow-lg bg-gray-100" : ""
          }`}
        >
          <div className="flex justify-between items-start">
            <h3 className="font-semibold text-foreground">{task.name}</h3>
            <span className="text-xs text-muted-foreground">
              {new Date(task.date).toLocaleDateString()}
            </span>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">{task.description}</p>
          <div className="mt-3 text-xs text-muted-foreground space-y-1">
            <div className="flex items-center gap-1">
              <span className="font-medium">Assignee:</span>
              <span>{task.assignee || "Unassigned"}</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="font-medium">Reporter:</span>
              <span>{task.reporter}</span>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default KanbanCard;
