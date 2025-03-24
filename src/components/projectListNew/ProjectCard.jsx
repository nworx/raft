import { CalendarIcon, ListTodoIcon } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

// Project type definition



// Priority color mapping
const priorityColors = {
  Low: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  Medium: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
  High: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
  Critical: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
}

// Status color mapping
const statusColors= {
  Active: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  Completed: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300",
  "On Hold": "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
}



export function ProjectCard({ project }) {
  // Format date to readable string
  const formatDate = (date) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date)
  }

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl font-bold line-clamp-1">{project.name}</CardTitle>
          <Badge className={priorityColors[project.priority]}>{project.priority}</Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <p className="text-muted-foreground text-sm line-clamp-2 mb-4">{project.description}</p>

        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="flex items-center">
            <ListTodoIcon className="h-4 w-4 mr-2 text-muted-foreground" />
            <span>{project.tasks} Tasks</span>
          </div>

          <div className="flex items-center">
            <CalendarIcon className="h-4 w-4 mr-2 text-muted-foreground" />
            <span>{formatDate(project.addedDate)}</span>
          </div>

          <div className="flex items-center">
            <Badge variant="outline" className="font-normal">
              {project.team}
            </Badge>
          </div>

          <div className="flex items-center">
            <Badge className={statusColors[project.status]}>{project.status}</Badge>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between pt-2 border-t">
        <div className="text-sm text-muted-foreground">Owner: {project.owner}</div>
        <Button variant="ghost" size="sm">
          View Details
        </Button>
      </CardFooter>
    </Card>
  )
}

