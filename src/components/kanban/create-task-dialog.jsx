import React, { useState } from "react";
import dynamic from "next/dynamic";
import { useToast } from "@/components/ui/use-toast";

const Tiptap = dynamic(() => import("@/components/common/text-editor/TipTap"), {
  ssr: false,
  loading: () => <div className="shimmer-loader"></div>,
});

export default function CreateTaskDialog({ open, onOpenChange, onCreateTask }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e) => {
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
      onCreateTask({
        title: title.trim(),
        description: description.trim(),
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
        <div className="fixed inset-0 z-50 opacity-50" onClick={() => onOpenChange(false)} />
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

              <div className="space-y-2">
                <label htmlFor="description" className="block font-medium">
                  Description
                </label>
                <Tiptap text={description} setText={setDescription} label="Description" />
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
