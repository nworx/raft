"use client"

import React, { useState, useMemo } from "react"
import { format } from 'date-fns';

export default function ListView({taskData}) {
  const [filters, setFilters] = useState({
    id: "",
    priority: "",
    title: "",
    createdBy: "",
    dueDate: "",
    project: "",
  })

  const [dueDateSort, setDueDateSort] = useState("")

  const filteredTasks = useMemo(() => {
    let filtered = taskData?.filter((task) => {
      return (
        task.id.toString().toLowerCase().includes(filters.id.toLowerCase()) &&
        task.priority.toLowerCase().includes(filters.priority.toLowerCase()) &&
        task.title.toLowerCase().includes(filters.title.toLowerCase()) &&
        (task.createdBy?.toLowerCase().includes(filters.createdBy.toLowerCase()) ?? true) &&
        task.project.name.toLowerCase().includes(filters.project.toLowerCase()) &&
        (!filters.dueDate || new Date(task.dueDate) >= new Date(filters.dueDate))
      )
    })

    if (dueDateSort) {
      filtered = filtered.sort((a, b) => {
        const dateA = new Date(a.dueDate)
        const dateB = new Date(b.dueDate)
        return dueDateSort === "asc" ? dateA - dateB : dateB - dateA
      })
    }

    return filtered
  }, [filters, dueDateSort, taskData])

  const toggleDueDateSort = () => {
    setDueDateSort((prev) =>
      prev === "" ? "asc" : prev === "asc" ? "desc" : ""
    )
  }

  return (
    <div className="relative">
      <div className="container mx-auto mt-6 max-h-[95vh] border rounded-md shadow-sm bg-white overflow-auto">
        <div className="sticky top-0 z-20 bg-white border-b">
          <h1 className="text-xl font-semibold px-4 py-3">Task List</h1>

          {/* Filters */}
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 px-4 pb-4 bg-white">
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
              <option value="Critical">Critical</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
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
            <input
              value={filters.project}
              onChange={(e) => setFilters({ ...filters, project: e.target.value })}
              placeholder="Filter by Project"
              className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
            />
          </div>

          {/* Table Header */}
          <div className="grid grid-cols-6 px-4 py-2 text-xs font-semibold text-gray-500 uppercase bg-gray-50 border-t">
            <div>Task ID</div>
            <div>Priority</div>
            <div>Title</div>
            <div className="col-span-1">Description</div>
            <div
              className="text-center cursor-pointer hover:text-black transition"
              onClick={toggleDueDateSort}
            >
              Due Date
              {
                dueDateSort === "asc" ? "\u2191" // ↑
                : dueDateSort === "desc" ? "\u2193" // ↓
                : ""
              }
            </div>
            <div>Project</div>
          </div>
        </div>

        {/* Table Body */}
        <div className="min-w-full divide-y divide-gray-100 text-sm">
          {filteredTasks?.length ? (
            filteredTasks?.map((task) => (
              <div
                key={task.id}
                className="grid grid-cols-6 px-4 py-3 hover:bg-gray-50 transition-colors"
              >
                <div className="truncate">Task-{task.id}</div>
                <div>
                  <span
                    className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
                      task.priority === "high"
                        ? "bg-red-100 text-red-700"
                        : task.priority === "medium"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {task.priority}
                  </span>
                </div>
                <div className="truncate">{task.title}</div>
                <div className="truncate text-gray-600" dangerouslySetInnerHTML={{ __html: task.description }} /> 
                <div className="text-center">{format(new Date(task.dueDate), 'dd MMMM yyyy')}</div>
                <div className="truncate">{task.project?.name || "N/A"}</div>
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


