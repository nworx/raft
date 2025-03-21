"use client";

import React from 'react'
import KanbanBoard from "@/components/KanbanBoard/KanbanBoard";
import TaskTicket from '@/components/KanbanBoard/TaskTicket';
import SideNavbarLayout from '@/components/Layouts/SideNavbarLayout';


const page = () => {
  return (
    <SideNavbarLayout>
      <TaskTicket/>
   </SideNavbarLayout>
  )
}

export default page

