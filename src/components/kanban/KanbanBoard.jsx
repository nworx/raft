"use client"

import  React from "react"
import { useState } from "react"
import KanbanColumn from "./kanban-column"
import { ScrollArea } from "@/components/ui/scroll-area"





const initialData = {
  on_hold:[
    {
      id: "o1",
      title: "Create a Kanban board",
      content: "Create a Kanban board",
      description: "Implement a Kanban board with drag and drop functionality using React and Tailwind CSS.",
      comments: [
        {
          id: "o1",
          user: { name: "John Doe", avatar: "/placeholder.svg?height=40&width=40" },
          content: "This looks great! Let's add more features.",
          createdAt: "2024-03-01T10:00:00Z",
        },
        {
          id: "o2",
          user: { name: "Jane Smith", avatar: "/placeholder.svg?height=40&width=40" },
          content: "I can help with the styling.",
          createdAt: "2024-03-01T11:30:00Z",
        },
      ],
    },
    {
      id: "o21",
      title: "Add drag and drop functionality",
      content: "Add drag and drop functionality",
      description: "Implement drag and drop functionality for cards between columns.",
      comments: [],
    },
  ],
  todo: [
    {
      id: "t1",
      title: "Create a Kanban board",
      content: "Create a Kanban board",
      description: "Implement a Kanban board with drag and drop functionality using React and Tailwind CSS.",
      comments: [
        {
          id: "c1",
          user: { name: "John Doe", avatar: "/placeholder.svg?height=40&width=40" },
          content: "This looks great! Let's add more features.",
          createdAt: "2024-03-01T10:00:00Z",
        },
        {
          id: "c2",
          user: { name: "Jane Smith", avatar: "/placeholder.svg?height=40&width=40" },
          content: "I can help with the styling.",
          createdAt: "2024-03-01T11:30:00Z",
        },
      ],
    },
    {
      id: "t2",
      title: "Add drag and drop functionality",
      content: "Add drag and drop functionality",
      description: "Implement drag and drop functionality for cards between columns.",
      comments: [],
    },
  ],
  "in-progress": [
    {
      id: "t3",
      title: "Design UI for board",
      content: "Design UI for board",
      description: "Create a clean and modern UI design for the Kanban board.",
      comments: [],
    },
  ],
  done: [
    {
      id: "t4",
      title: "Set up project structure",
      content: "Set up project structure",
      description: "Initialize the project and set up necessary dependencies.",
      comments: [],
    },
  ],
}

// Mock current user
const currentUser = {
  name: "Current User",
  avatar: "/placeholder.svg?height=40&width=40",
}

export default function KanbanBoard() {
  const [columns, setColumns] = useState(initialData)

  const addComment = (columnId, taskId, commentContent) => {
    setColumns((prev) => {
      const newColumns = { ...prev }
      const column = newColumns[columnId]
      const taskIndex = column.findIndex((task) => task.id === taskId)

      if (taskIndex !== -1) {
        const newComment = {
          id: `c${Date.now()}`, // Simple way to generate unique IDs
          user: currentUser,
          content: commentContent,
          createdAt: new Date().toISOString(),
        }

        column[taskIndex] = {
          ...column[taskIndex],
          comments: [...column[taskIndex].comments, newComment],
        }
      }

      return newColumns
    })
  }

  const onDragStart = (e, itemId, sourceColumn) => {
    e.dataTransfer.setData("text/plain", JSON.stringify({ itemId, sourceColumn }))
  }

  const onDragOver = (e) => {
    e.preventDefault()
  }

  const onDrop = (e, targetColumn) => {
    e.preventDefault()
    const { itemId, sourceColumn } = JSON.parse(e.dataTransfer.getData("text"))

    if (sourceColumn === targetColumn) return

    setColumns((prev) => {
      const newColumns = { ...prev }
      const item = newColumns[sourceColumn].find((item) => item.id === itemId)
      newColumns[sourceColumn] = newColumns[sourceColumn].filter((item) => item.id !== itemId)
      newColumns[targetColumn].push(item)
      return newColumns
    })
  }

  const createTask = (columnId, task) => {
    setColumns((prev) => {
      const newColumns = { ...prev }
      const newTask = {
        id: `t${Date.now()}`, // Simple way to generate unique IDs
        title: task.title,
        content: task.title, // For backwards compatibility
        description: task.description,
        comments: [],
      }

      newColumns[columnId] = [...newColumns[columnId], newTask]
      return newColumns
    })
  }

  return (
    <ScrollArea className="h-screen">
      <div className="flex gap-4 p-4 bg-background min-h-screen">
      <KanbanColumn
          title="On Hold"
          columnId="on_hold"
          items={columns["on_hold"]}
          onDragStart={onDragStart}
          onDragOver={onDragOver}
          onDrop={(e) => onDrop(e, "on_hold")}
          onAddComment={addComment}
          onCreateTask={createTask}
        />
        <KanbanColumn
          title="To Do"
          columnId="todo"
          items={columns["todo"]}
          onDragStart={onDragStart}
          onDragOver={onDragOver}
          onDrop={(e) => onDrop(e, "todo")}
          onAddComment={addComment}
          onCreateTask={createTask}
        />
        <KanbanColumn
          title="In Progress"
          columnId="in-progress"
          items={columns["in-progress"]}
          onDragStart={onDragStart}
          onDragOver={onDragOver}
          onDrop={(e) => onDrop(e, "in-progress")}
          onAddComment={addComment}
          onCreateTask={createTask}
        />
        <KanbanColumn
          title="Done"
          columnId="done"
          items={columns["done"]}
          onDragStart={onDragStart}
          onDragOver={onDragOver}
          onDrop={(e) => onDrop(e, "done")}
          onAddComment={addComment}
          onCreateTask={createTask}
        />
      </div>
    </ScrollArea>
  )
}

