"use client";

import React, { useEffect, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
} from "@tanstack/react-table";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import CreateProjectModel from "./CreateProjectModel";
import Link from "next/link";
import { Button } from "../ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger } from "../ui/select";

// Sample data

// Table columns
const columns = [
  { accessorKey: "id", header: "ID", cell: (info) => info.getValue() },
  {
    accessorKey: "name",
    header: "Project Name",
    cell: (info) => <span className="font-semibold">{info.getValue()}</span>,
  },
  {
    accessorKey: "priority",
    header: "Priority",
    cell: (info) => (
      <span className="bg-gray-700 px-2 py-1 rounded text-white">{info.getValue()}</span>
    ),
  },
  { accessorKey: "status", header: "Status", cell: (info) => info.getValue() },
];

export default function AllProjectsMain() {
  const [globalFilter, setGlobalFilter] = useState("");
  const [allProjects, setAllProjects] = useState([
    { id: 1, name: "D Studio", priority: "High", status: "Completed" },
    {
      id: 2,
      name: "Mobile App New Page",
      priority: "Medium",
      status: "In Progress",
    },
    { id: 3, name: "Stretch Goals", priority: "Low", status: "Pending" },
    { id: 4, name: "Interview v1 Spike", priority: "High", status: "Pending" },
    {
      id: 5,
      name: "Task Discovery for New D-Studio",
      priority: "Low",
      status: "Completed",
    },
    { id: 6, name: "D Studio", priority: "High", status: "Completed" },
    {
      id: 7,
      name: "Mobile App New Page",
      priority: "Medium",
      status: "In Progress",
    },
    { id: 8, name: "Stretch Goals", priority: "Low", status: "Pending" },
    { id: 9, name: "Interview v1 Spike", priority: "High", status: "Pending" },
    {
      id: 10,
      name: "Task Discovery for New D-Studio",
      priority: "Low",
      status: "Completed",
    },
    { id: 11, name: "D Studio", priority: "High", status: "Completed" },
    {
      id: 12,
      name: "Mobile App New Page",
      priority: "Medium",
      status: "In Progress",
    },
    { id: 13, name: "Stretch Goals", priority: "Low", status: "Pending" },
    { id: 14, name: "Interview v1 Spike", priority: "High", status: "Pending" },
    {
      id: 15,
      name: "Task Discovery for New D-Studio",
      priority: "Low",
      status: "Completed",
    },
    { id: 16, name: "D Studio", priority: "High", status: "Completed" },
    {
      id: 17,
      name: "Mobile App New Page",
      priority: "Medium",
      status: "In Progress",
    },
    { id: 18, name: "Stretch Goals", priority: "Low", status: "Pending" },
    { id: 19, name: "Interview v1 Spike", priority: "High", status: "Pending" },
    {
      id: 20,
      name: "Task Discovery for New D-Studio",
      priority: "Low",
      status: "Completed",
    },
  ]);
  const [priorityFilter, setPriorityFilter] = useState("");
  const [addProjectPopUp, setAddProjectPopUpOpen] = useState(false);

  useEffect(() => {
    console.log(addProjectPopUp, "addProjectPopUp");
  }, [addProjectPopUp]);

  const table = useReactTable({
    data: allProjects,
    columns,
    state: {
      globalFilter,
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onGlobalFilterChange: setGlobalFilter,
  });

  return (
    <>
      <CreateProjectModel
        isOpen={addProjectPopUp}
        onClose={() => setAddProjectPopUpOpen(false)}
        setAllProjects={setAllProjects}
        allProjects={allProjects}
      />
      <div className=" rounded-md shadow-sm p-4 h-[100vh]">
        {/* Search & Filter Bar */}

        <div className="flex  justify-between"  >
          <div>
            <Button
              onClick={() => setAddProjectPopUpOpen(true)}
              //   disabled={!table.getCanPreviousPage()}
              className=" px-4 py-2 bg-gray-700 rounded-md  cursor-p"
            >
              + Create New Project
            </Button>
          </div>

          <div className="flex items-center justify-evenly mb-4   w-[40vw]">
            <input
              type="text"
              placeholder="Search projects..."
              value={globalFilter}
              onChange={(e) => setGlobalFilter(e.target.value)}
              className="p-2 rounded bg-gray-800 w-[50%] border border-gray-600 gap-5 text-[0.875rem] text-white"
            />
            {/* <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="p-2 rounded bg-gray-800 border border-gray-600"
            >
              <option value="">All Priorities</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select> */}

            <Select value={priorityFilter} onValueChange={setPriorityFilter}
            
            >
              <SelectTrigger className="p-2 rounded bg-gray-800 border border-gray-600 w-[40%] text-white">
                {priorityFilter || "All Priorities"}
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border border-gray-600 text-white">
                <SelectItem value="All Priorities">All Priorities</SelectItem>
                <SelectItem value="High">High</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="Low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Data Table */}
        <Table>
          <TableHeader className={"border-b-[#45474b]"}>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className={
                  " border-b border-[#45474b] hover:bg-transparent hover:text-white focus:outline-none  "
                }
              >
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    <button
                      onClick={header.column.getToggleSortingHandler()}
                      className="hover:text-white"
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </button>
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className={"h-[70vh]"}>
            {table
              .getRowModel()
              .rows.filter((row) =>
                priorityFilter ? row.original.priority === priorityFilter : true
              ) // Apply priority filter
              .map((row) => (
                <TableRow
                  key={row.id}
                  className={
                    "transition-all duration-400  hover:bg-gray-700 hover:cursor-pointer hover:text-white"
                  }
                >
                  {row.getVisibleCells().map((project) => (
                    <TableCell
                      key={project.id}
                      className={"text-[.8125rem] p-[10px]  "}
                    >
                      <Link href={`/schedule-task/${project.id}`}>
                        {flexRender(
                          project.column.columnDef.cell,
                          project.getContext()
                        )}
                      </Link>
                    </TableCell>
                  ))}
                </TableRow>
              ))}
          </TableBody>
        </Table>

        {/* Pagination Controls */}
        <div className="flex justify-between mt-4">
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="px-4 py-2 bg-gray-700 rounded-md disabled:opacity-50 text-white"
          >
            Previous
          </button>
          <span>Page {table.getState().pagination.pageIndex + 1}</span>
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="px-4 py-2 bg-gray-700 rounded-md disabled:opacity-50 text-white"
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}
