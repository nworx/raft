"use client";

import React, {useState, useEffect, Suspense} from 'react'
import KanbanBoard from '@/components/kanban/KanbanBoard';
import LeftNavbar from '@/components/common/LeftNavbar';
import ListView from '@/components/listview/ListView';
import fetchTasksByProjectId from '@/services/task/fetchTasksByProjectId';
import { useSearchParams } from 'next/navigation';
import KanbanBoardDifferentView from '@/components/kanban/KanbanBoardDifferentView';

const Page = () => {
 
  return(
    <div>
        <Suspense fallback={<div>Loading...</div>}>
          <KanbanBoardDifferentView/>
        </Suspense>
    </div>
  )
}

export default Page

