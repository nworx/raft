"use client"

import { useState, useEffect } from "react"
import { PlusIcon, SearchIcon, FilterIcon, ArrowUpDown, Calendar, Flag } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { ProjectCard } from "./ProjectCard"
import { CreateProjectDialog } from "./CreateProjectDialog"





// Priority color mapping
const priorityColors = {
  Low: "bg-blue-100 text-blue-800",
  Medium: "bg-yellow-100 text-yellow-800",
  High: "bg-orange-100 text-orange-800",
  Critical: "bg-red-100 text-red-800",
}

export default function ProjectsMain() {
  // State for projects
  const [projects, setProjects] = useState([])
  const [filteredProjects, setFilteredProjects] = useState([])

  // State for filters and sorting
  const [searchQuery, setSearchQuery] = useState("")
  const [priorityFilter, setPriorityFilter] = useState("All")
  const [sortBy, setSortBy] = useState("addedDate")
  const [sortDirection, setSortDirection] = useState("desc")

  // State for create project dialog
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  // Mock data for initial projects
  useEffect(() => {
    const mockProjects = [
      {
        id: "1",
        name: "Website Redesign",
        description: "Redesign the company website with new branding",
        priority: "High",
        tasks: 24,
        addedDate: new Date(2023, 2, 15),
        owner: "John Doe",
        team: "Design",
        status: "Active",
        dueDate: new Date(2023, 5, 30),
      },
      {
        id: "2",
        name: "Mobile App Development",
        description: "Develop a new mobile app for customers",
        priority: "Critical",
        tasks: 36,
        addedDate: new Date(2023, 1, 10),
        owner: "Jane Smith",
        team: "Engineering",
        status: "Active",
        dueDate: new Date(2023, 7, 15),
      },
      {
        id: "3",
        name: "Marketing Campaign",
        description: "Q2 marketing campaign for new product launch",
        priority: "Medium",
        tasks: 18,
        addedDate: new Date(2023, 3, 5),
        owner: "Mike Johnson",
        team: "Marketing",
        status: "On Hold",
        dueDate: new Date(2023, 6, 1),
      },
      {
        id: "4",
        name: "Database Migration",
        description: "Migrate from MySQL to PostgreSQL",
        priority: "Low",
        tasks: 12,
        addedDate: new Date(2023, 0, 20),
        owner: "Sarah Williams",
        team: "Engineering",
        status: "Completed",
        dueDate: new Date(2023, 4, 10),
      },
    ]

    setProjects(mockProjects)
    setFilteredProjects(mockProjects)
  }, [])

  // Filter and sort projects when dependencies change
  useEffect(() => {
    let result = [...projects]

    // Apply search filter
    if (searchQuery) {
      result = result.filter((project) => project.name.toLowerCase().includes(searchQuery.toLowerCase()))
    }

    // Apply priority filter
    if (priorityFilter !== "All") {
      result = result.filter((project) => project.priority === priorityFilter)
    }

    // Apply sorting
    result.sort((a, b) => {
      if (sortBy === "name") {
        return sortDirection === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
      } else if (sortBy === "priority") {
        const priorityOrder = { Low: 0, Medium: 1, High: 2, Critical: 3 }
        return sortDirection === "asc"
          ? priorityOrder[a.priority] - priorityOrder[b.priority]
          : priorityOrder[b.priority] - priorityOrder[a.priority]
      } else if (sortBy === "addedDate") {
        return sortDirection === "asc"
          ? a.addedDate.getTime() - b.addedDate.getTime()
          : b.addedDate.getTime() - a.addedDate.getTime()
      }
      return 0
    })

    setFilteredProjects(result)
  }, [projects, searchQuery, priorityFilter, sortBy, sortDirection])

  // Handle creating a new project
  const handleCreateProject = (newProject) => {
    const project = {
      ...newProject,
      id: Date.now().toString(),
      addedDate: new Date(),
    }

    setProjects((prev) => [project, ...prev])
    setIsDialogOpen(false)
  }

  return (
    <div className="container py-8">
      <div className="flex flex-col space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Projects</h1>
          <Button onClick={() => setIsDialogOpen(true)}>
            <PlusIcon className="mr-2 h-4 w-4" />
            New Project
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search projects..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <Select value={priorityFilter} onValueChange={setPriorityFilter}>
            <SelectTrigger>
              <div className="flex items-center">
                <FilterIcon className="mr-2 h-4 w-4" />
                <span>Priority: {priorityFilter}</span>
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Priorities</SelectItem>
              <SelectItem value="Low">Low</SelectItem>
              <SelectItem value="Medium">Medium</SelectItem>
              <SelectItem value="High">High</SelectItem>
              <SelectItem value="Critical">Critical</SelectItem>
            </SelectContent>
          </Select>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full justify-between">
                <div className="flex items-center">
                  <ArrowUpDown className="mr-2 h-4 w-4" />
                  <span>
                    Sort by: {sortBy === "addedDate" ? "Date Added" : sortBy === "name" ? "Name" : "Priority"}
                  </span>
                </div>
                <Badge variant="secondary">{sortDirection === "asc" ? "Ascending" : "Descending"}</Badge>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
              <DropdownMenuItem
                onClick={() => {
                  setSortBy("name")
                  setSortDirection(sortDirection === "asc" ? "desc" : "asc")
                }}
              >
                Name
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setSortBy("addedDate")
                  setSortDirection(sortDirection === "asc" ? "desc" : "asc")
                }}
              >
                <Calendar className="mr-2 h-4 w-4" />
                Date Added
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setSortBy("priority")
                  setSortDirection(sortDirection === "asc" ? "desc" : "asc")
                }}
              >
                <Flag className="mr-2 h-4 w-4" />
                Priority
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project) => <ProjectCard key={project.id} project={project} />)
          ) : (
            <Card className="col-span-full">
              <CardContent className="flex flex-col items-center justify-center p-6">
                <p className="text-muted-foreground mb-4">No projects found matching your criteria</p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery("")
                    setPriorityFilter("All")
                  }}
                >
                  Clear filters
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <CreateProjectDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} onCreateProject={handleCreateProject} />
    </div>
  )
}

