import { CalendarIcon, ListTodoIcon, ClockAlert, Search, UserIcon } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useState } from "react"
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
  ACTIVE: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  COMPLETED: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300",
  ON_HOLD: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
}



export function ProjectCard({ project, handleUpdateProject, isFlipped, toggleFlip }) {
  // Format date to readable string
  const formatDate = (date) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date)
  }

  const handleViewUpdateProject=()=>{
    console.log(project,"rakkk")
    
    handleUpdateProject(project);
    // setIsDialogOpen(true);
  }

  const dummyMembers = [
    { name: "Alice Johnson", email: "alice@example.com" },
    { name: "Bob Smith", email: "bob@example.com" },
    { name: "Charlie Lee", email: "charlie@example.com" },
    { name: "Diana Wells", email: "diana@example.com" },
    { name: "Alice Johnson", email: "alice@example.com" },
    { name: "Bob Smith", email: "bob@example.com" },
    { name: "Charlie Lee", email: "charlie@example.com" },
    { name: "Diana Wells", email: "diana@example.com" },
    { name: "Alice Johnson", email: "alice@example.com" },
    { name: "Bob Smith", email: "bob@example.com" },
    { name: "Charlie Lee", email: "charlie@example.com" },
    { name: "Diana Wells", email: "diana@example.com" },
    { name: "Alice Johnson", email: "alice@example.com" },
    { name: "Bob Smith", email: "bob@example.com" },
    { name: "Charlie Lee", email: "charlie@example.com" },
    { name: "Diana Wells", email: "diana@example.com" },
  ];

  const [searchTerm, setSearchTerm] = useState("");

  const filteredMembers = project?.members?.filter((member) =>
    member.user?.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.user?.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow min-h-72 flex flex-col justify-between">
      {isFlipped ? (
        <>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center w-full">
              <CardTitle className="text-xl font-bold">Project Members</CardTitle>
              <div className="relative w-40">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full text-sm pl-8 pr-3 py-1.5 rounded-md border border-muted bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              </div>
            </div>
          </CardHeader>

          <CardContent className="flex-1 overflow-y-auto max-h-40">
            {filteredMembers.length > 0 ? (
              <ul className="space-y-2">
                {filteredMembers.map((member, index) => (
                  <li
                    key={member.user?.id ?? index}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted transition"
                  >
                    <div className="flex-shrink-0 h-9 w-9 rounded-full bg-primary/20 text-primary flex items-center justify-center font-semibold uppercase">
                      {member.user?.username?.[0]?.toUpperCase() ?? "?"}
                    </div>
                    <div className="flex flex-col text-sm">
                      <span className="font-medium text-foreground">
                        {member.user?.username ?? "Unnamed"}
                      </span>
                      <span className="text-muted-foreground text-xs">
                        {member.user?.email ?? "No email"}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="flex flex-col items-center justify-center text-center text-sm text-muted-foreground h-full">
                <UserIcon className="w-8 h-8 mb-2" />
                No members found
              </div>
            )}
          </CardContent>

          <CardFooter className="flex justify-end pt-2 border-t">
            <Button variant="outline" size="sm" onClick={toggleFlip}>
              Back to Project
            </Button>
          </CardFooter>
        </>
      ) : (
        <>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <CardTitle className="text-xl font-bold line-clamp-1">
                {project.name ?? "Untitled Project"}
              </CardTitle>
              <Badge className={priorityColors[project.priority]}>
                {project.priority ?? "No Priority"}
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="pb-2 flex-1 min-h-40 space-x-1">
            <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
              {project.description ?? "No description provided"}
            </p>

            <div className="grid grid-cols-2 gap-3 text-sm space-y-2 ">
              <div className="flex items-end">
                <CalendarIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>Start: {project.startDate ?? "N/A"}</span>
              </div>
              <div className="flex items-center">
                <ClockAlert className="h-4 w-4 mr-2 text-red-600" />
                <span>End: {project.endDate ?? "N/A"}</span>
              </div>
              <div className="flex items-center">
                <ListTodoIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>{project.taskCount ?? 0} Tasks</span>
              </div>
              <div className="flex items-center">
                <button
                  className="px-3 py-1 text-xs rounded-full bg-muted text-foreground hover:bg-accent transition-colors"
                  onClick={toggleFlip}
                >
                  {project?.members?.length} Members
                </button>
              </div>
              <div className="flex items-center">
                <Badge variant="outline" className="font-normal">
                  {project.team ?? "Uncategorized"}
                </Badge>
              </div>
              <div className="flex items-center">
                <Badge className={statusColors[project.status]}>
                  {project.status ?? "No Status"}
                </Badge>
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex justify-between pt-2 border-t">
            <div className="text-sm text-muted-foreground" title={project.createdBy}>
              Created By: {project.createdBy?.username?.split("@")[0] ?? "Unknown"}
            </div>
            <Button variant="ghost" size="sm" onClick={handleViewUpdateProject}>
              View/Update Details
            </Button>
          </CardFooter>
        </>
      )}
    </Card>
  );

}

