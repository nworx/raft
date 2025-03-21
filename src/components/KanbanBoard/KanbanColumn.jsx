import   KanbanCard  from "./KanbanCard";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";

// interface KanbanColumnProps {
//   title: string;
//   tasks: Task[];
//   status: string;
//   setTasks: React.Dispatch<React.SetStateAction<{
//     backlog: Task[];
//     inProgress: Task[];
//     done: Task[];
//   }>>;
// }

const KanbanColumn = ({ title, tasks, status, setTasks,setTaskModelOpen,setSelectedTask }) => {
  return (
    <Card className="flex-1 h-full shadow-sm hover:shadow-md transition-shadow duration-300">
      <CardHeader className="px-6 pt-6 pb-4 border-b">
        <CardTitle className="text-lg font-semibold capitalize">
          {title.replace(/([A-Z])/g, ' $1').trim()}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-4 overflow-y-auto min-h-[calc(100vh-270px)] "
      //  style={{border:"solid red"}}
      >
        {tasks.map((task, index) => (
          <KanbanCard key={task.id} task={task} index={index} setTaskModelOpen={setTaskModelOpen} setSelectedTask={setSelectedTask}/>
        ))}
      </CardContent>
    </Card>
  );
};

export default KanbanColumn;
