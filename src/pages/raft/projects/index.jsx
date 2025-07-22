"use client";

import React from 'react'
// import KanbanBoard from "@/components/KanbanBoard/KanbanBoard";
import AllProjectsMain from '@/components/projectList/AllProjectsMain';
// import SideNavbarLayout from '@/components/Layouts/SideNavbarLayout';
import LeftNavbar from '@/components/common/LeftNavbar';
import ProjectsMain from '@/components/projectListNew/ProjectsMain';

const page = () => {
  return ( 
    <div className='flex'>
 
    <LeftNavbar>
      <ProjectsMain/>
    </LeftNavbar>
    </div>
  )
}

export default page

