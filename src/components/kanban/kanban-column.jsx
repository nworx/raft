"use client"

import  React from "react"
import { useState } from "react"
import KanbanCard from "./kanban-card"
import CreateTaskDialog from "./create-task-dialog"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { ListFilter } from 'lucide-react';
import { Skeleton } from "@/components/ui/skeleton";

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import useProjectStore from "@/zustand/projectStore"

import {TASK_PRIORITY,TASK_TYPE} from "@/constant/task"

export default function KanbanColumn({
  title,
  columnId,
  items,
  onDragStart,
  onDragOver,
  onDrop,
  onAddComment,
  onTaskUpdate,
  isLoading,
  noOfSkeleton,
  projectName,
  reporterId,
  allUsers
}) {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)

  const currentProject = useProjectStore((state) => state.currentProject)

  const [filters, setFilters] = useState({
    priority: '',
    type: '',
    createdBy: '',
    assignee: ''
  });

  const filteredItems = items?.filter((item) => {
    const matchesPriority = filters.priority === '' || item.priority?.toLowerCase() === filters.priority.toLowerCase();
    const matchesType = filters.type === '' || item.type?.toLowerCase() === filters.type.toLowerCase();
    const matchesCreatedBy = filters.createdBy === '' || item.reporter?.username?.toLowerCase().includes(filters.createdBy.toLowerCase());
    const matchesAssignee = filters.assignee === "__unassigned__" ? item.assignee == null:filters.assignee === '' || item.assignee?.username?.toLowerCase().includes(filters.assignee.toLowerCase());

    return matchesPriority && matchesType && matchesCreatedBy && matchesAssignee;
  });

  

  return (
    <>
      <Card className="flex flex-col min-w-24 max-w-[22vw] flex-1 " onDragOver={onDragOver} onDrop={onDrop}>
        <CardHeader className="flex flex-row items-center gap-2">
          <CardTitle>{title}</CardTitle>
          <Popover>
            <PopoverTrigger asChild>
              <ListFilter className="cursor-pointer"/>
            </PopoverTrigger>
            <PopoverContent side="right" align="start" sideOffset={150} className="w-80">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <h4 className="leading-none font-medium">Filter</h4>
                  <p className="text-muted-foreground text-sm">Filter tasks based on</p>
                </div>
                <div className="grid gap-2">
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="priority">Priority</Label>
                    <select
                      id="priority"
                      value={filters.priority}
                      onChange={(e) => setFilters((prev) => ({ ...prev, priority: e.target.value }))}
                      className="col-span-2 h-8"
                    >
                      <option value="">All Priorities</option>
                      {Object?.keys?.(TASK_PRIORITY)?.map(( key ) => (
                          <option key={key} value={key}>
                            {TASK_PRIORITY[key]}
                          </option>
                      ))}
                    </select>
                  </div>
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="type">Task Type</Label>
                    <select
                      id="type"
                      value={filters.type}
                      onChange={(e) => setFilters((prev) => ({ ...prev, type: e.target.value }))}
                      className="col-span-2 h-8"
                    >
                      <option value="">All Types</option>
                      {Object?.keys?.(TASK_TYPE)?.map(( key ) => (
                          <option key={key} value={key}>
                            {TASK_TYPE[key]}
                          </option>
                      ))}
                    </select>
                  </div>
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="createdBy">Created By</Label>
                    <select
                      id="createdBy"
                      value={filters.createdBy}
                      onChange={(e) => setFilters((prev) => ({ ...prev, createdBy: e.target.value }))}
                      className="col-span-2 h-8"
                    >
                      <option value="">All Creators</option>
                      {currentProject?.members?.map(({ user }) => (
                        <option key={user.id} value={user?.username}>
                          {user?.username}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="assignee">Assigned To</Label>
                    <select
                      id="assignee"
                      value={filters.assignee}
                      onChange={(e) => setFilters((prev) => ({ ...prev, assignee: e.target.value }))}
                      className="col-span-2 h-8"
                    >
                      <option value="">All Assignees</option>
                      <option value="__unassigned__">Unassigned</option>
                      {currentProject?.members?.map(({ user }) => (
                        <option key={user.id} value={user?.username}>
                          {user?.username}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </CardHeader>
        <CardContent className="flex-1 overflow-auto space-y-2">
          {isLoading
            ? Array.from({ length: noOfSkeleton }).map((_, index) => (
                <Skeleton key={index} className="h-16 w-full bg-[#d8d8d8]" />
              ))
            : filteredItems?.map((item) => (
                <KanbanCard
                  key={item?.id}
                  id={item?.id}
                  task={item}
                  columnId={columnId}
                  onDragStart={(e) => onDragStart(e, item.id, columnId)}
                  onAddComment={onAddComment}
                  isLoading={false}
                  noOfSkeleton={0}
                  projectName={projectName}
                  reporterId={reporterId}
                  onTaskUpdate={onTaskUpdate}
                  allUsers={allUsers}
                />
              ))
          }
        </CardContent>
        {projectName? <CardFooter className="pt-2">
          <Button
            variant="ghost"
            className="w-full justify-start text-muted-foreground border-2 border-gray-100 hover:text-foreground"
            onClick={() => setIsCreateDialogOpen(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add task
          </Button>
        </CardFooter> : null}
      </Card>

      <CreateTaskDialog
        open={isCreateDialogOpen}
        columnId={columnId}
        onOpenChange={setIsCreateDialogOpen}
        onTaskUpdate={onTaskUpdate}
        reporterId={reporterId}
        allUsers={allUsers}
      />
    </>
  )
}

