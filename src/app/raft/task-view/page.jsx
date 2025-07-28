"use client";

import React, { Suspense } from 'react'
import KanbanBoard from '@/components/kanban/KanbanBoard';
import LeftNavbar from '@/components/common/LeftNavbar';
import ShareTaskView from '@/components/kanban/ShareTaskView';

const page = () => {
  return (
    <>
    <ShareTaskView/>
    </>
  )
}

export default page

