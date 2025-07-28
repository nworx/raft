"use client"

import React, { useState, useMemo } from "react"
import { format } from 'date-fns';
import { useSearchParams } from "next/navigation";
import useProjectStore from "@/zustand/projectStore";
import {TASK_PRIORITY, TASK_STATUS_LABEL} from "@/constant/task"
const priorityColors = {
  LOW: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  MEDIUM: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
  HIGH: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
  CRITICAL: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
}

const normalizeDate = (date) => {
  const d = new Date(date);
  if (isNaN(d)) return null;
  d.setHours(0, 0, 0, 0); // normalize to start of day
  return d;
};


export default function ListView({taskData}) {

  console.log(taskData, "taskData");
  const currentProject = useProjectStore((state) => state.currentProject)
  const searchParams = useSearchParams();
  const projectName = searchParams.get('project');
  
  const [filters, setFilters] = useState({
    id: "",
    priority: "",
    title: "",
    createdBy: "",
    dueDate: "",
    project: "",
    assignee: ""
  })

  const [dueDateSort, setDueDateSort] = useState("")

  const [isTaskDialogOpen, setIsTaskDialogOpen] = useState(false)

  const filteredTasks = useMemo(() => {
    let filtered = taskData?.filter((task) => {
      const taskDueDate = task.dueDate ? normalizeDate(task.dueDate)?.getTime() : null;
      const filterDueDate = filters.dueDate ? normalizeDate(filters.dueDate)?.getTime() : null;

      return (
        task.id?.toString().toLowerCase().includes(filters.id.toLowerCase()) &&
        task.priority?.toLowerCase().includes(filters.priority.toLowerCase()) &&
        task.title?.toLowerCase().includes(filters.title.toLowerCase()) &&
        (task.reporter?.username.toLowerCase().includes(filters.createdBy.toLowerCase()) ?? true) &&
        (task.project?.name?.toLowerCase().includes(filters.project.toLowerCase()) ?? true) &&
        (!filters.dueDate || (taskDueDate && taskDueDate === filterDueDate)) &&
        (filters.assignee === "__unassigned__" ? task.assignee == null: task?.assignee?.username?.toLowerCase().includes(filters.assignee.toLowerCase()))
      );
    }) ?? [];

    if (dueDateSort) {
      filtered.sort((a, b) => {
        const dateA = new Date(a.dueDate);
        const dateB = new Date(b.dueDate);
        return dueDateSort === "asc" ? dateA - dateB : dateB - dateA;
      });
    }

    console.log("Filtering with:", filters);
    console.log("Filtered tasks:", filtered);


    return filtered;
  }, [filters, dueDateSort, taskData]);


  const toggleDueDateSort = () => {
    setDueDateSort((prev) =>
      prev === "" ? "asc" : prev === "asc" ? "desc" : ""
    )
  }

  return (
    <div className="relative">
      <div className="container mx-auto mt-6 max-h-[95vh] border rounded-md shadow-sm bg-white overflow-y-scroll scroll-pb-20">
        <div className="sticky top-0 z-20 bg-white border-b">
          <h1 className="text-xl font-semibold px-4 py-3">
            {filteredTasks?.length} Task{filteredTasks?.length !== 1 ? "s" : ""}{" "}
            {projectName ? (
              <>for <span className="italic">"{projectName}"</span></>
            ) : (
              "Assigned"
            )}
          </h1>

          {/* Filters */}
          <div className="grid grid-cols-1 sm:grid-cols-6 gap-4 px-4 pb-4 bg-white">
            <input
              value={filters.id}
              onChange={(e) => setFilters({ ...filters, id: e.target.value })}
              placeholder="Filter by ID"
              className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
            />
            <select
              value={filters.priority}
              onChange={(e) => setFilters({ ...filters, priority: e.target.value })}
              className="w-full px-3 py-2 border rounded-md text-sm bg-white focus:outline-none focus:ring-1 focus:ring-gray-400"
            >
              <option value="">All Priorities</option>
              {Object?.keys?.(TASK_PRIORITY)?.map(( key ) => (
                  <option key={key} value={key}>
                    {TASK_PRIORITY[key]}
                  </option>
              ))}
            </select>
            <input
              value={filters.title}
              onChange={(e) => setFilters({ ...filters, title: e.target.value })}
              placeholder="Filter by Title"
              className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
            />
            <input
              type="date"
              value={filters.dueDate}
              onChange={(e) => setFilters({ ...filters, dueDate: e.target.value })}
              className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
            />
            {/* <input
              value={filters.createdBy}
              onChange={(e) => setFilters({ ...filters, createdBy: e.target.value })}
              placeholder="Filter by Created By"
              className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
            /> */}
            <select
              value={filters.createdBy}
              onChange={(e) => setFilters({ ...filters, createdBy: e.target.value })}
              className="w-full px-3 py-2 border rounded-md text-sm bg-white focus:outline-none focus:ring-1 focus:ring-gray-400"
            >
              <option value="">All Creators</option>
               {currentProject?.members?.map(({ user }) => (
                  <option key={user.id} value={user?.username}>
                    {user?.username}
                  </option>
               ))}
            </select>
            {projectName ? <select
                value={filters.assignee}
                onChange={(e) => setFilters({ ...filters, assignee: e.target.value })}
                className="w-full px-3 py-2 border rounded-md text-sm bg-white focus:outline-none focus:ring-1 focus:ring-gray-400"
              >
                <option value="">All Assignees</option>
                <option value="__unassigned__">Unassigned</option>
                {currentProject?.members?.map(({ user }) => (
                  <option key={user.id} value={user?.username}>
                    {user?.username}
                  </option>
                ))}
              </select> :
              <select
                value={filters.project}
                onChange={(e) => setFilters({ ...filters, project: e.target.value })}
                className="w-full px-3 py-2 border rounded-md text-sm bg-white focus:outline-none focus:ring-1 focus:ring-gray-400"
              >
                <option value="">All Projects</option>
                {[
                  ...new Set(
                    taskData
                      .filter((task) => task.project && task.project.name)
                      .map((task) => task.project.name)
                  ),
                ].map((projectName) => (
                  <option key={projectName} value={projectName}>
                    {projectName}
                  </option>
                ))}
              </select>
            //   <input
            //   value={filters.project}
            //   onChange={(e) => setFilters({ ...filters, project: e.target.value })}
            //   placeholder="Filter by Project"
            //   className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
            // />
            }
          </div>

          {/* Table Header */}
          <div className="grid grid-cols-[80px_100px_1fr_120px_150px_150px] px-4 py-2 text-xs font-semibold text-gray-500 uppercase bg-gray-50 border-t">
            <div>Task ID</div>
            <div>Priority</div>
            <div>Status: Title</div>
            {/* <div>Description</div> */}
            <div
              className=" cursor-pointer hover:text-black transition"
              onClick={toggleDueDateSort}
            >
              Due Date
              {
                dueDateSort === "asc" ? "\u2191" // ↑
                : dueDateSort === "desc" ? "\u2193" // ↓
                : ""
              }
            </div>
            <div>Created By</div>
            {projectName ? <div>Assigned To</div> :
            <div>Project</div>}
          </div>
        </div>

        {/* Table Body */}
        <div className="min-w-full divide-y divide-gray-100 text-sm">
          {filteredTasks?.length ? (
            filteredTasks?.map((task) => (
              <div
                key={task.id}
                className="grid grid-cols-[80px_100px_1fr_120px_150px_150px] px-4 py-3 hover:bg-gray-50 transition-colors"
                onClick={() => setIsTaskDialogOpen(true)}
              >
                <div className="truncate">Task-{task.id}</div>
                <div>
                  <span
                    className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${priorityColors[task?.priority]}`}
                  >
                    {task.priority}
                  </span>
                </div>
                <div className="truncate"><span className="font-semibold">{TASK_STATUS_LABEL[task?.status] || task?.status}:</span> {task.title}</div>
                {/* <div className="truncate text-gray-600" dangerouslySetInnerHTML={{ __html: task.description }} />  */}
                <div className="">{task.dueDate ? format(new Date(task.dueDate), 'dd MMMM yyyy') : "N/A"}</div>
                <div className="truncate">{task?.reporter?.username || "N/A"}</div>
                {projectName?<div className="truncate">{task?.assignee?.username || "Not Assigned"}</div> :
                <div className="truncate">{task.project?.name || "N/A"}</div>}
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500 py-6">No tasks found.</div>
          )}
        </div>
      </div>
    </div>
  )
}


