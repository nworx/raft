"use client"
import React, { useEffect, useState } from 'react'
import TaskDialog from './task-dialog'
import { useSearchParams } from 'next/navigation';
import getTasksById from '@/services/task/getTasksById';
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from 'next/navigation';
const ShareTaskView = () => {
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const taskId = searchParams.get('taskId');
  const [task,setTask]=useState({});
  const router=useRouter();

  const addComment = (columnId, taskId, commentContent) => {
    setColumns((prev) => {
      const newColumns = { ...prev }
      const column = newColumns[columnId]
      const taskIndex = column.findIndex((task) => task.id === taskId)

      if (taskIndex !== -1) {
        const newComment = {
          id: `c${Date.now()}`, 
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

  const getTasksByIdFunc=async()=>{
    try{
    const response= await getTasksById({taskId});
          console.log(response,"responseresponse getTasksById")

    if(response.status === 200){
      setTask(response?.data);
    }
    }
    catch(errorMessage){
    toast({
        title: "Error",
        description: "Unable to get task.",
        variant: "destructive",
      });
    }
  }

  useEffect(()=>{
    if(taskId){
      getTasksByIdFunc();
    }
   
  },[ taskId])

  return (
    <div>
      <TaskDialog task={task} open={true} onOpenChange={()=>{router.back()}} onAddComment={addComment } projectName={task?.project?.name} onTaskUpdate={()=>{}} taskView={"View"}/>
    </div>
  )
}

export default ShareTaskView
