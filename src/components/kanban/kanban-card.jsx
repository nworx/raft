"use client"

import  React, { useEffect } from "react"
import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import TaskDialog from "./task-dialog"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

import { Bug, Layers, UserRoundCheck, LaptopMinimalCheck, TriangleAlert  } from "lucide-react";
import { format } from "date-fns";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

import { Badge } from "@/components/ui/badge"

const dummyData = [
  { src: 'https://github.com/shadcn.png', alt: '@shadcn', fallback: 'CN' },
]

const priorityColors = {
  LOW: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  MEDIUM: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
  HIGH: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
  CRITICAL: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
}

export default function KanbanCard({ id, columnId, task, onDragStart, onAddComment, projectName, reporterId, onCreateTask }) {
  const [formattedDueDate, setFormattedDueDate] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  console.log(task, "taskkkkkkkk", projectName);

  const statusMap = {
    EPIC: { icon: Layers, label: "EPIC" },
    STORY: { icon: UserRoundCheck, label: "STORY" },
    TASK: { icon: LaptopMinimalCheck, label: "TASK" },
    BUG: { icon: Bug, label: "BUG" },
    ISSUE: { icon: TriangleAlert , label: "ISSUE" },
  };

  useEffect(() => {
    if (task?.dueDate) {
      setFormattedDueDate(format(new Date(task.dueDate), 'dd-MM'));
    } else {
      setFormattedDueDate("N/A");
    }
  }, [task]);
  
  return (
    <>
      <Card
        draggable
        onDragStart={onDragStart}
        onClick={() => setIsDialogOpen(true)}
        className="cursor-pointer hover:bg-accent"
      >
        <CardContent className="relative flex-row p-3">

          <TooltipProvider>
            <div className="absolute top-1 right-3">
              {task?.type && statusMap[task.type] && (() => {
                const { icon: Icon, label } = statusMap[task.type];
                return (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Icon className="h-4 w-4 text-pretty" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{label}</p>
                    </TooltipContent>
                  </Tooltip>
                );
              })()}
            </div>
          </TooltipProvider>

          <div className="font-medium h-12 max-h-12 line-clamp-2 mt-1">{task?.title}</div>

          <div className="flex justify-start gap-1 overflow-hidden mt-1">
               
                {/* <div className="text-sm text-muted-foreground mt-1">
                  {task.comments.length > 0 ? (
                    <span>
                      {task.comments.length} comment{task.comments.length !== 1 ? "s" : ""}
                    </span>
                  ): (
                    <span>
                      0 comment
                    </span>
                  )}
                </div> */}

                  <Badge
                    className={`line-clamp-1 ${
                      projectName === null
                        ? "bg-black text-white dark:bg-blue-900"
                        : "bg-yellow-500 text-black dark:bg-yellow-700"
                    }`}
                    title={projectName ? "Due Date" : "Project Name"}
                  >
                      {projectName ? formattedDueDate : task?.project ?? "N/A"}
                  </Badge>

                  <Badge className={`line-clamp-1 ${priorityColors[task?.priority]}`}>
                    {task?.priority ?? "No Priority"}
                  </Badge>

          </div>

          <TooltipProvider>
            {task?.assignee && <div className="absolute bottom-3 right-3">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Avatar className="h-6 w-6 data-[slot=avatar]:ring-2 data-[slot=avatar]:ring-background data-[slot=avatar]:grayscale">
                      {/* <AvatarImage src={user.src} alt={user.alt} /> */}
                      <AvatarFallback className="font-medium text-xs ">{task?.assignee?.username.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{task?.assignee?.username}</p>
                  </TooltipContent>
                </Tooltip>
            </div>}
          </TooltipProvider>
        </CardContent>
      </Card>
      {isDialogOpen && <div className="space-y-0">
        <TaskDialog
          task={task}
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          onAddComment={(comment) => onAddComment(columnId, task.id, comment)}
          projectName={projectName}
          reporterId={reporterId}
          onCreateTask={onCreateTask}
        />
      </div>
      }
    </>
  )
}
