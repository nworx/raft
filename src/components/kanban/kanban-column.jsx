"use client"

import  React from "react"
import { useState } from "react"
import KanbanCard from "./kanban-card"
import CreateTaskDialog from "./create-task-dialog"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton";


export default function KanbanColumn({
  title,
  columnId,
  items,
  onDragStart,
  onDragOver,
  onDrop,
  onAddComment,
  onCreateTask,
  isLoading,
  noOfSkeleton,
}) {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)

  return (
    <>
      <Card className="flex flex-col min-w-24 flex-1 " onDragOver={onDragOver} onDrop={onDrop}>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 overflow-auto space-y-2">
          {isLoading
            ? Array.from({ length: noOfSkeleton }).map((_, index) => (
                <Skeleton key={index} className="h-16 w-full bg-[#d8d8d8]" />
              ))
            : items?.map((item) => (
                <KanbanCard
                  key={item.id}
                  id={item.id}
                  task={item}
                  columnId={columnId}
                  onDragStart={(e) => onDragStart(e, item.id, columnId)}
                  onAddComment={onAddComment}
                  isLoading={false} // optionally pass this if KanbanCard uses it internally
                  noOfSkeleton={0}
                />
              ))
          }
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

