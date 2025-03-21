"use client"

import  React from "react"
import { useState } from "react"
import KanbanCard from "./kanban-card"
import CreateTaskDialog from "./create-task-dialog"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"



export default function KanbanColumn({
  title,
  columnId,
  items,
  onDragStart,
  onDragOver,
  onDrop,
  onAddComment,
  onCreateTask,
}) {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)

  return (
    <>
      <Card className="w-80 flex flex-col" onDragOver={onDragOver} onDrop={onDrop}>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 space-y-2">
          {items.map((item) => (
            <KanbanCard
              key={item.id}
              id={item.id}
              task={item}
              columnId={columnId}
              onDragStart={(e) => onDragStart(e, item.id, columnId)}
              onAddComment={onAddComment}
            />
          ))}
        </CardContent>
        <CardFooter className="pt-2">
          <Button
            variant="ghost"
            className="w-full justify-start text-muted-foreground hover:text-foreground"
            onClick={() => setIsCreateDialogOpen(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add task
          </Button>
        </CardFooter>
      </Card>

      <CreateTaskDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onCreateTask={(task) => onCreateTask(columnId, task)}
      />
    </>
  )
}

