"use client";

import React, { Suspense } from 'react'
import ShareTaskView from '@/components/kanban/ShareTaskView';

const page = () => {
  return (
    <>
    <Suspense fallback={<div>Loading...</div>}>
    <ShareTaskView/>
    </Suspense>
    </>
  )
}

export default page

