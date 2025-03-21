"use client"

import  React from "react"
import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import TaskDialog from "./task-dialog"



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
        <CardContent className="p-3">
          <div className="font-medium">{task.title}</div>
          {task.comments.length > 0 && (
            <div className="text-sm text-muted-foreground mt-1">
              {task.comments.length} comment{task.comments.length !== 1 ? "s" : ""}
            </div>
          )}
        </CardContent>
      </Card>

      <TaskDialog
        task={task}
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onAddComment={(comment) => onAddComment(columnId, task.id, comment)}
      />
    </>
  )
}

