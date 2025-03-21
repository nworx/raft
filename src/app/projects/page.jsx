"use client";

import React from 'react'
import KanbanBoard from "@/components/KanbanBoard/KanbanBoard";
import AllProjectsMain from '@/components/projectList/AllProjectsMain';
import SideNavbarLayout from '@/components/Layouts/SideNavbarLayout';
import LeftNavbar from '@/components/common/LeftNavbar';

const page = () => {
  return ( 
    <div className='flex'>
    {/* <SideNavbarLayout className="border border-blue-600">
    <AllProjectsMain/>
    </SideNavbarLayout> */}
    <LeftNavbar/>
    </div>
  )
}

export default page

