"use client";
// import { useState } from "react";
// import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

// const initialTasks = {
//   todo: [
//     { id: "1", content: "Task 1" },
//     { id: "2", content: "Task 2" },
//   ],
//   inProgress: [
//     { id: "3", content: "Task 3" },
//   ],
//   done: [
//     { id: "4", content: "Task 4" },
//   ],
// };

// export default function Home() {
//   const [tasks, setTasks] = useState(initialTasks);

//   const onDragEnd = (result) => {
//     if (!result.destination) return;

//     const { source, destination } = result;
//     const sourceColumn = tasks[source.droppableId];
//     const destColumn = tasks[destination.droppableId];

//     // Remove task from source
//     const movedTask = sourceColumn[source.index];
//     const newSourceColumn = [...sourceColumn];
//     newSourceColumn.splice(source.index, 1);

//     // Add task to destination
//     const newDestColumn = [...destColumn];
//     newDestColumn.splice(destination.index, 0, movedTask);

//     setTasks({
//       ...tasks,
//       [source.droppableId]: newSourceColumn,
//       [destination.droppableId]: newDestColumn,
//     });
//   };

//   return (
//     <div className="flex justify-center min-h-screen bg-gray-100 p-10">
//       <DragDropContext onDragEnd={onDragEnd}>
//         <div className="grid grid-cols-3 gap-4 w-full max-w-5xl">
//           {Object.keys(tasks).map((columnKey) => (
//             <Droppable droppableId={columnKey} key={columnKey}>
//               {(provided) => (
//                 <div
//                   {...provided.droppableProps}
//                   ref={provided.innerRef}
//                   className="bg-white rounded-lg shadow-md p-4 min-h-[300px]"
//                 >
//                   <h2 className="text-lg font-bold capitalize mb-2">
//                     {columnKey.replace(/([A-Z])/g, " $1")}
//                   </h2>
//                   {tasks[columnKey].map((task, index) => (
//                     <Draggable key={task.id} draggableId={task.id} index={index}>
//                       {(provided) => (
//                         <div
//                           ref={provided.innerRef}
//                           {...provided.draggableProps}
//                           {...provided.dragHandleProps}
//                           className="bg-blue-500 text-white p-2 rounded mb-2 shadow-md cursor-pointer"
//                         >
//                           {task.content}
//                         </div>
//                       )}
//                     </Draggable>
//                   ))}
//                   {provided.placeholder}
//                 </div>
//               )}
//             </Droppable>
//           ))}
//         </div>
//       </DragDropContext>
//     </div>
//   );
// }

import React from 'react'
import KanbanBoard from '@/components/kanban/KanbanBoard';
import LeftNavbar from '@/components/common/LeftNavbar';

const page = () => {
  return (
    <LeftNavbar>
    <KanbanBoard/>
    </LeftNavbar>
  )
}

export default page

