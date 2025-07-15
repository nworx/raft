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

import { Bug, GitPullRequestCreateArrow, GitCompareArrows, ClockAlert  } from "lucide-react";
import { format } from "date-fns";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

const dummyData = [
  { src: 'https://github.com/shadcn.png', alt: '@shadcn', fallback: 'CN' },
]

export default function KanbanCard({ id, columnId, task, onDragStart, onAddComment }) {
  const [formattedDueDate, setFormattedDueDate] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  console.log(task, "taskkkkkkkk");

  const statusMap = {
    done: { icon: Bug, label: "Bug" },
    OPEN: { icon: GitPullRequestCreateArrow, label: "New Feature" },
    on_hold: { icon: GitCompareArrows, label: "Feature Update" },
  };

  useEffect(() => {
    if (task?.dueDate) {
      setFormattedDueDate(format(new Date(task.dueDate), 'dd-MM'));
    } else {
      setFormattedDueDate(null);
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

          {/* <div className="absolute top-2 right-2">
            {task?.status === "done" && <Bug className="h-4 w-4 text-muted-foreground"/>}
            {task?.status === "OPEN" && <GitPullRequestCreateArrow className="h-4 w-4 text-muted-foreground" />}
            {task?.status === "on_hold" && <GitCompareArrows className="h-4 w-4 text-muted-foreground"/>}
          </div> */}

          <TooltipProvider>
            <div className="absolute top-2 right-4">
              {task?.status && statusMap[task.status] && (() => {
                const { icon: Icon, label } = statusMap[task.status];
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

          <div className="font-medium h-12 max-h-12 line-clamp-2">{task?.title}</div>

          <div className="flex justify-between">
               
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

                <div className="flex items-center w-18">
                  <ClockAlert className="h-4 text-red-600" />
                  <span className="text-sm">{formattedDueDate ?? "N/A"}</span>
                </div>

                <div className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                      task.priority === "high"
                        ? "bg-red-100 text-red-700"
                        : task.priority === "MEDIUM"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-green-100 text-green-700"
                    }`}>
                  {task.priority ? task?.priority :  "N/A"}
                </div>

                <div className="flex -space-x-2">
                  <TooltipProvider>
                    {dummyData.map((user, index) => (
                      <Tooltip key={index}>
                        <TooltipTrigger asChild>
                          <Avatar className="h-6 w-6 data-[slot=avatar]:ring-2 data-[slot=avatar]:ring-background data-[slot=avatar]:grayscale">
                            <AvatarImage src={user.src} alt={user.alt} />
                            <AvatarFallback className="font-medium text-xs ">{user.fallback}</AvatarFallback>
                          </Avatar>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{user.fallback}</p>
                        </TooltipContent>
                      </Tooltip>
                    ))}
                  </TooltipProvider>
                </div>

          </div>
        </CardContent>
      </Card>
      {isDialogOpen && <div className="space-y-0">
        <TaskDialog
          task={task}
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          onAddComment={(comment) => onAddComment(columnId, task.id, comment)}
        />
      </div>
      }
    </>
  )
}
