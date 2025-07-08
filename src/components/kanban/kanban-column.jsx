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
      <Card className="flex flex-col min-w-24 flex-1 " onDragOver={onDragOver} onDrop={onDrop}>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 overflow-auto space-y-2">
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
            className="w-full justify-start text-muted-foreground border-2 border-gray-100 hover:text-foreground"
            onClick={() => setIsCreateDialogOpen(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add task
          </Button>
        </CardFooter>
      </Card>

      <CreateTaskDialog
        open={isCreateDialogOpen}
        columnId={columnId}
        onOpenChange={setIsCreateDialogOpen}
        onCreateTask={(task) => onCreateTask(columnId, task)}
      />
    </>
  )
}

