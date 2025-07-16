import React, { useState,useEffect } from "react";
import dynamic from "next/dynamic";
import { useToast } from "@/components/ui/use-toast";
import createTask from "@/services/task/createTask";
import useProjectStore from "@/zustand/projectStore";

import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const Tiptap = dynamic(() => import("@/components/common/text-editor/TipTap"), {
  ssr: false,
  loading: () => <div className="shimmer-loader"></div>,
});

export default function CreateTaskDialog({ open, columnId, onOpenChange, onCreateTask }) {

  const currentProject = useProjectStore((state) => state.currentProject)
  useEffect(() => {

      console.log("currentProject,", currentProject);
  }, [currentProject])



  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [taskType, setTaskType] = useState("");
  const [assignedToId, setAssignedToId] = useState("");
  
  useEffect(()=>{
    console.log(description,"description")
  },[description])
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      toast({
        title: "Error",
        description: "Title is required",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {

        const response = await createTask(
        {
          projectId: currentProject?.id,
          title: title,
          description: description,
          assigneeId: 52,
          reporterId: 4,
          type: taskType,
          status: columnId,
          priority: priority,
          dueDate: new Date(dueDate),
        }
      )

      console.log("Response of Create Task :", response);


      onCreateTask({
        title: title.trim(),
        description: description,
      });
     

      // Reset form
      setTitle("");
      setDescription("");
      onOpenChange(false);

      toast({
        title: "Success",
        description: "Task created successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create task",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };


 
  return (
    <>
      {open && (
        <div className="fixed inset-0 z-50 bg-black opacity-50" onClick={() => onOpenChange(false)} />
      )}

      {open && (
        <div className="fixed inset-0 z-50 flex justify-center items-center">
          <div className="bg-white rounded-lg shadow-lg w-[55vw] p-6">
            <div className="mb-4">
              <h2 className="text-xl font-semibold">Create New Task</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="title" className="block font-medium">
                  Title
                </label>
                <input
                  id="title"
                  placeholder="Enter task title..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full border border-gray-300 p-2 rounded"
                  autoFocus
                />
              </div>

              <div className="flex justify-around gap-4">
                  <div className="w-40 grid gap-2">
                    <Label htmlFor="priority" className="flex items-center">
                      Priority *
                    </Label>
                    <Select
                      id="priority"
                      value={priority}
                      onValueChange={(value) => {
                        setPriority(value);
                      }}
                    >
                      <SelectTrigger id="priority">
                        <SelectValue placeholder="Select Priority"/>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Low">Low</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                        <SelectItem value="High">High</SelectItem>
                        <SelectItem value="Critical">Critical</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="w-40 grid gap-2">
                    <Label htmlFor="dueDate" className="flex items-center">
                      Date *
                    </Label>
                    <input
                      id="dueDate"
                      name="dueDate"
                      type="date"
                      value={dueDate}
                      onChange={(e) => setDueDate( e.target.value)}
                      className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
                    />
                  </div>

                  <div className="w-40 grid gap-2">
                    <Label htmlFor="type" className="flex items-center">
                      Type *
                    </Label>
                    <Select id="type" value={taskType} onValueChange={(value) => {setTaskType(value)}}>
                      <SelectTrigger id="type">
                        <SelectValue placeholder="Select Task Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="BUG">Bug</SelectItem>
                        <SelectItem value="NEW_FEATURE">New Feature</SelectItem>
                        <SelectItem value="FEATURE_UPDATE">Feature Update</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="w-60 grid gap-2">
                    <Label htmlFor="assignee" className="flex items-center">
                      Assign To *
                    </Label>
                    <Select
                      id="assignee"
                      value={assignedToId}
                      onValueChange={(value) => setAssignedToId(value)}
                    >
                      <SelectTrigger id="assignee" className="overflow-hidden text-ellipsis whitespace-nowrap">
                        <SelectValue placeholder="Select Email" className="overflow-hidden text-ellipsis whitespace-nowrap"/>
                      </SelectTrigger>
                      <SelectContent>
                        {currentProject?.members?.map(({ user }) => (
                          <SelectItem key={user.id} value={String(user.id)}>
                            {user?.username}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

              </div>



              <div className="space-y-2">
                <label htmlFor="description" className="block font-medium">
                  Description
                </label>
                <Tiptap text={description} setText={setDescription} height='300px'/>
              </div>

              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100"
                  onClick={() => onOpenChange(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || !title.trim()}
                  className={`px-4 py-2 rounded ${
                    isSubmitting || !title.trim() ? "bg-gray-400" : "bg-blue-500"
                  } text-white`}
                >
                  Create Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
