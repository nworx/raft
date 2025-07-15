"use client"

import  React from "react"
import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import TaskDialog from "./task-dialog"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

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
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  return (
    <>
      <Card
        draggable
        onDragStart={onDragStart}
        onClick={() => setIsDialogOpen(true)}
        className="cursor-pointer hover:bg-accent"
      >
        <CardContent className="flex-row p-3">
          <div className="font-medium h-12 max-h-12 line-clamp-2">{task?.title}</div>

          <div className="flex justify-between">
               
                <div className="text-sm text-muted-foreground mt-1">
                  {task.comments.length > 0 ? (
                    <span>
                      {task.comments.length} comment{task.comments.length !== 1 ? "s" : ""}
                    </span>
                  ): (
                    <span>
                      0 comment
                    </span>
                  )}
                </div>

                <div className="flex -space-x-2">
                  <TooltipProvider>
                    {dummyData.map((user, index) => (
                      <Tooltip key={index}>
                        <TooltipTrigger asChild>
                          <Avatar className="h-7 w-7 data-[slot=avatar]:ring-2 data-[slot=avatar]:ring-background data-[slot=avatar]:grayscale">
                            <AvatarImage src={user.src} alt={user.alt} />
                            <AvatarFallback className="font-medium text-sm">{user.fallback}</AvatarFallback>
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
      <div className="space-y-0">
        <TaskDialog
          task={task}
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          onAddComment={(comment) => onAddComment(columnId, task.id, comment)}
        />
      </div>
    </>
  )
}
