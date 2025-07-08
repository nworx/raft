"use client";

import React from 'react'
import KanbanBoard from '@/components/kanban/KanbanBoard';
import LeftNavbar from '@/components/common/LeftNavbar';

const page = () => {
  return ( 
    <div className='flex'>
    <LeftNavbar>
      <KanbanBoard/>
   </LeftNavbar>
    </div>
  )
}

export default page

