import { LABEL_TO_TASK_STATUS } from "@/constant/task";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { TrashIcon } from "lucide-react";
import Spinner from "../ui/spinner";
import updateTask from "@/services/task/updateTask";
import { useToast } from "@/components/ui/use-toast";

const TaskDeletePopup = ({
  setIsDeleteTaskPopUp,
  task,
  onTaskUpdate,
  onOpenChange
}) => {
  const [isDeleteButtonLoader, setIsDeleteButtonLoader] = useState(false);
  const { toast } = useToast();


  const handleDelete = async () => {
    setIsDeleteButtonLoader(true);
    try {
      const response = await updateTask({
        taskId: task?.id,
        status: LABEL_TO_TASK_STATUS.DELETED,
      });
      
      if (response.status===200) {
        toast({
          title: "Success",
          description: "Task has been deleted successfully.",
        });
        setIsDeleteButtonLoader(false);
        await onTaskUpdate();
        onOpenChange(false);
      } else {
        toast({
          title: "Error",
          description: "Unable to delete.",
          variant: "destructive",
        });
        setIsDeleteButtonLoader(false);
      }
      setIsDeleteTaskPopUp(false);
    } catch {
      setIsDeleteButtonLoader(false);

      setIsDeleteTaskPopUp(false);
    }
  };

  return (
    <div>
      <Dialog open={true} onOpenChange={setIsDeleteTaskPopUp}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
          </DialogHeader>
          <p>
            This action cannot be undone. This will permanently delete the task.
          </p>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteTaskPopUp(false)}
            >
              Cancel
            </Button>

            {isDeleteButtonLoader ? (
              <Spinner />
            ) : (
              <Button variant="destructive" onClick={handleDelete}>
                Confirm Delete
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TaskDeletePopup;
