"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useToast } from "@/hooks/use-toast";

const CreateProjectModel = ({
  isOpen,
  onClose,
  setAllProjects,
  allProjects,
}) => {
  if (!isOpen) return null;
  const { toast } = useToast();

  const [newProject, setNewProject] = useState({
    id: allProjects?.length,
    name: "",
    description: "",
    priority: "",
    status: "pending",
  });

  const handleCreateProject = () => {
    setAllProjects([newProject, ...allProjects]);
    console.log(newProject,"newProject");
    onClose();
    toast({
      title: "Success!",
      description: "Project added successfully.",
    });
  };
  const handleFormOnChange = (e) => {
    console.log(e,"name,value")
    const {name, value} = e?.target;
    console.log(name,value,"name,value")
    setNewProject((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  return (
    <div
      style={{ zIndex: "2" }}
      className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-50"
    >
      <div
        style={{ minHeight: "70vh", minWidth: "50vw" }}
        className="bg-white rounded-lg w-96 shadow-lg "
      >
        <div className="bg-white text-black p-6 rounded-md shadow-lg w-full h-[70vh]">
          {/* Close Button */}

          <div className="flex justify-between">
            <div className="flex items-center gap-2 text-lg font-semibold">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                stroke-linejoin="round"
                class="lucide lucide-box"
              >
                <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
                <path d="m3.3 7 8.7 5 8.7-5" />
                <path d="M12 22V12" />
              </svg>
              New Project
            </div>
            <button
              onClick={onClose}
              className=" top-4 right-4 text-black-500 hover:text-black-300 "
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.8536 2.85355C13.0488 2.65829 13.0488 2.34171 12.8536 2.14645C12.6583 1.95118 12.3417 1.95118 12.1464 2.14645L7.5 6.79289L2.85355 2.14645C2.65829 1.95118 2.34171 1.95118 2.14645 2.14645C1.95118 2.34171 1.95118 2.65829 2.14645 2.85355L6.79289 7.5L2.14645 12.1464C1.95118 12.3417 1.95118 12.6583 2.14645 12.8536C2.34171 13.0488 2.65829 13.0488 2.85355 12.8536L7.5 8.20711L12.1464 12.8536C12.3417 13.0488 12.6583 13.0488 12.8536 12.8536C13.0488 12.6583 13.0488 12.3417 12.8536 12.1464L8.20711 7.5L12.8536 2.85355Z"
                  fill="currentColor"
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
          </div>

          {/* Project Form */}
          <div className="mt-4">
            <input
              className="w-full bg-white text-black border border-5 border-black p-2 rounded-md"
              placeholder="Project name"
              value={newProject?.name}
              name={"name"}
              onChange={handleFormOnChange}
            />
            <textarea
              style={{ height: "27vh" }}
              name={"description"}
              className="mt-3 w-full bg-white text-black border  border-5  border-black p-2 rounded-md"
              placeholder="Write a description, a project brief, or collect ideas..."
              onChange={handleFormOnChange}
            />
          </div>

          {/* Tags / Options */}
          {/* <div className="flex flex-wrap gap-2 mt-4">
          {["Backlog", "No priority", "Lead", "Members", "Dependencies", "Start date", "Target date", "Milestones"].map((tag, index) => (
            <span key={index} className="bg-gray-800 text-gray-300 px-3 py-1 text-sm rounded-md border border-gray-700">
              {tag}
            </span>
          ))}
        </div> */}
          <Select
            className={"border border-black"}
            onChange={handleFormOnChange}
            name="priority"
          >
            <SelectTrigger className="w-[180px] border border-black">
              <SelectValue placeholder="Select Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="apple">Low</SelectItem>
                <SelectItem value="banana">Medium</SelectItem>
                <SelectItem value="blueberry">High</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          {/* Actions */}
          <div className="mt-[3%]  flex justify-end space-x-2">
            <button
              variant="ghost"
              onClick={onClose}
              className="text-black mr-[15px] border px-4"
            >
              Cancel
            </button>
            <button
              className="bg-black text-white px-4 py-2 rounded-md hover:bg-black-500"
              onClick={handleCreateProject}
            >
              Create project
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProjectModel;
