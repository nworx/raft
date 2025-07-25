import React from 'react'
import { useState, useEffect } from "react"
import { PlusIcon, SearchIcon, FilterIcon, ArrowUpDown, Calendar, Flag } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"


const SearchFilter = ({rawData, setProcessedData}) => {
  const [searchQuery, setSearchQuery] = useState("")
  const [priorityFilter, setPriorityFilter] = useState("All")
  const [sortBy, setSortBy] = useState("startDate")
  const [sortDirection, setSortDirection] = useState("desc")

  useEffect(() => {

    console.log("rawData at filter time:", rawData);

    if (!Array.isArray(rawData)) return;

    let result = [...rawData]
    console.log(result,"search result")

    // Apply search filter
    if (searchQuery) {
      result = result.filter((element) => element.title.toLowerCase().includes(searchQuery.toLowerCase()))
    }

    // Apply priority filter
    if (priorityFilter !== "All") {
      result = result.filter((element) => element.priority.toLowerCase() === priorityFilter.toLowerCase())
    }

    // Apply sorting
    // result.sort((a, b) => {
    //   if (sortBy === "name") {
    //     return sortDirection === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
    //   } else if (sortBy === "priority") {
    //     const priorityOrder = { Low: 0, Medium: 1, High: 2, Critical: 3 }
    //     return sortDirection === "asc"
    //       ? priorityOrder[a.priority] - priorityOrder[b.priority]
    //       : priorityOrder[b.priority] - priorityOrder[a.priority]
    //   } else if (sortBy === "startDate") {
    //     return sortDirection === "asc"
    //       ? a.startDate - b.startDate
    //       : b.startDate - a.startDate
    //   }
    //   return 0
    // })

     console.log(result," after search result")
    setProcessedData(result)
  }, [searchQuery, priorityFilter, sortBy, sortDirection])
  return (
    <div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search ..."
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

          {/* <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full justify-between">
                <div className="flex items-center">
                  <ArrowUpDown className="mr-2 h-4 w-4" />
                  <span>
                    Sort by: {sortBy === "startDate" ? "Date Added" : sortBy === "name" ? "Name" : "Priority"}
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
                  setSortBy("startDate")
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
          </DropdownMenu> */}
        </div>
      
    </div>
  )
}

export default SearchFilter
