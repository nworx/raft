"use client"

import React, { useState, useMemo } from "react"

const tasks = [
  {
    "id": "task-001",
    "priority": "high",
    "title": "Finish landing page",
    "description": "Complete the marketing page for product launch.",
    "dueDate": "2025-07-20",
    "createdBy": "prakhar@example.com"
  },
  {
    "id": "task-002",
    "priority": "medium",
    "title": "Fix login bug",
    "description": "Investigate and resolve login failure on mobile.",
    "dueDate": "2025-07-18",
    "createdBy": "alex@example.com"
  },
  {
    "id": "task-003",
    "priority": "low",
    "title": "Write documentation",
    "description": "Add documentation for the new API endpoints.",
    "dueDate": "2025-07-25",
    "createdBy": "ravi@example.com"
  },
  {
    "id": "task-004",
    "priority": "high",
    "title": "Deploy backend service",
    "description": "Push latest changes to production backend.",
    "dueDate": "2025-07-16",
    "createdBy": "mira@example.com"
  },
  {
    "id": "task-005",
    "priority": "medium",
    "title": "Update user guide",
    "description": "Revise the help section to reflect new features.",
    "dueDate": "2025-07-21",
    "createdBy": "jon@example.com"
  },
  {
    "id": "task-006",
    "priority": "low",
    "title": "Design new logo concepts",
    "description": "Create initial sketches for branding refresh.",
    "dueDate": "2025-07-30",
    "createdBy": "emma@example.com"
  },
  {
    "id": "task-007",
    "priority": "high",
    "title": "Prepare investor deck",
    "description": "Compile latest metrics and milestones for pitch.",
    "dueDate": "2025-07-19",
    "createdBy": "sam@example.com"
  },
  {
    "id": "task-008",
    "priority": "medium",
    "title": "Test payment integration",
    "description": "Verify Stripe payments work in staging.",
    "dueDate": "2025-07-22",
    "createdBy": "lisa@example.com"
  },
  {
    "id": "task-009",
    "priority": "low",
    "title": "Clean up repository",
    "description": "Archive old branches and remove unused files.",
    "dueDate": "2025-08-01",
    "createdBy": "neha@example.com"
  },
  {
    "id": "task-010",
    "priority": "high",
    "title": "Handle customer escalation",
    "description": "Respond to urgent customer complaint regarding billing.",
    "dueDate": "2025-07-15",
    "createdBy": "support@example.com"
  },
  {
    "id": "task-011",
    "priority": "medium",
    "title": "Conduct usability test",
    "description": "Schedule and run user testing for the dashboard redesign.",
    "dueDate": "2025-07-24",
    "createdBy": "jenny@example.com"
  },
  {
    "id": "task-012",
    "priority": "low",
    "title": "Optimize images",
    "description": "Compress website images for faster load times.",
    "dueDate": "2025-07-28",
    "createdBy": "alex@example.com"
  },
  {
    "id": "task-013",
    "priority": "high",
    "title": "Fix broken links",
    "description": "Scan and resolve all broken links on the website.",
    "dueDate": "2025-07-17",
    "createdBy": "ravi@example.com"
  },
  {
    "id": "task-014",
    "priority": "medium",
    "title": "Add unit tests",
    "description": "Improve coverage for the auth module.",
    "dueDate": "2025-07-23",
    "createdBy": "prakhar@example.com"
  },
  {
    "id": "task-015",
    "priority": "low",
    "title": "Organize team folders",
    "description": "Reorganize shared drive content by project.",
    "dueDate": "2025-07-29",
    "createdBy": "emma@example.com"
  },
  {
    "id": "task-016",
    "priority": "high",
    "title": "Resolve API timeout issue",
    "description": "Investigate root cause of frequent API timeouts.",
    "dueDate": "2025-07-16",
    "createdBy": "mira@example.com"
  },
  {
    "id": "task-017",
    "priority": "medium",
    "title": "Run security audit",
    "description": "Perform internal security review of app services.",
    "dueDate": "2025-07-26",
    "createdBy": "jon@example.com"
  },
  {
    "id": "task-018",
    "priority": "low",
    "title": "Review competitor pricing",
    "description": "Gather data on top 5 competitors’ pricing models.",
    "dueDate": "2025-08-05",
    "createdBy": "sam@example.com"
  },
  {
    "id": "task-019",
    "priority": "high",
    "title": "Patch CVE vulnerability",
    "description": "Apply urgent patch for known security issue.",
    "dueDate": "2025-07-15",
    "createdBy": "support@example.com"
  },
  {
    "id": "task-020",
    "priority": "medium",
    "title": "Redesign onboarding flow",
    "description": "Improve clarity and reduce drop-off on signup.",
    "dueDate": "2025-07-27",
    "createdBy": "lisa@example.com"
  },
  {
    "id": "task-021",
    "priority": "low",
    "title": "Prepare blog outline",
    "description": "Draft initial structure for upcoming blog post.",
    "dueDate": "2025-08-02",
    "createdBy": "jenny@example.com"
  },
  {
    "id": "task-022",
    "priority": "high",
    "title": "Migrate database",
    "description": "Move production data to new DB cluster.",
    "dueDate": "2025-07-18",
    "createdBy": "neha@example.com"
  },
  {
    "id": "task-023",
    "priority": "medium",
    "title": "Add analytics tracking",
    "description": "Implement new event tracking for key features.",
    "dueDate": "2025-07-20",
    "createdBy": "alex@example.com"
  },
  {
    "id": "task-024",
    "priority": "low",
    "title": "Refactor stylesheets",
    "description": "Convert CSS to SCSS and clean up unused rules.",
    "dueDate": "2025-07-31",
    "createdBy": "emma@example.com"
  },
  {
    "id": "task-025",
    "priority": "medium",
    "title": "Translate UI strings",
    "description": "Add Spanish and French translations to UI.",
    "dueDate": "2025-07-26",
    "createdBy": "prakhar@example.com"
  }
]

export default function ListView() {
  const [filters, setFilters] = useState({
    id: "",
    priority: "",
    title: "",
    createdBy: "",
    dueDate: "",
  })

  const [dueDateSort, setDueDateSort] = useState("")

  const filteredTasks = useMemo(() => {
    let filtered = tasks.filter((task) => {
      return (
        task.id.toLowerCase().includes(filters.id.toLowerCase()) &&
        task.priority.toLowerCase().includes(filters.priority.toLowerCase()) &&
        task.title.toLowerCase().includes(filters.title.toLowerCase()) &&
        task.createdBy.toLowerCase().includes(filters.createdBy.toLowerCase()) &&
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
  }, [filters, dueDateSort])

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
            <input
              value={filters.createdBy}
              onChange={(e) => setFilters({ ...filters, createdBy: e.target.value })}
              placeholder="Filter by Created By"
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
            <div>Created By</div>
          </div>
        </div>

        {/* Table Body */}
        <div className="min-w-full divide-y divide-gray-100 text-sm">
          {filteredTasks.length ? (
            filteredTasks.map((task) => (
              <div
                key={task.id}
                className="grid grid-cols-6 px-4 py-3 hover:bg-gray-50 transition-colors"
              >
                <div className="truncate">{task.id}</div>
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
                <div className="truncate text-gray-600">{task.description}</div>
                <div className="text-center">{task.dueDate}</div>
                <div className="truncate">{task.createdBy}</div>
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


