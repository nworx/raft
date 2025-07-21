"use client";

<<<<<<< Updated upstream
import React from 'react'
=======
import React, {useState, useEffect, Suspense} from 'react'
>>>>>>> Stashed changes
import KanbanBoard from '@/components/kanban/KanbanBoard';
import LeftNavbar from '@/components/common/LeftNavbar';

const Dashboard = () => {
  return ( 
    <div className='flex'>
    <LeftNavbar>
<<<<<<< Updated upstream
      <KanbanBoard/>
   </LeftNavbar>
=======
      <button 
        className="absolute left-[2rem] h-[18px] w-[80px] sm:w-[80px] md:w-[100px] border border-gray-400 rounded-full bg-white text-[10px] sm:text-xs text-gray-700 flex items-center justify-center shadow-sm hover:bg-gray-100"
        onClick={() => setToggleView(!toggleView)}
      >
        {toggleView? "List View" : "Kanban View"}
      </button>
      {toggleView? 
        <Suspense fallback={<div>Loading...</div>}>
          <KanbanBoard taskData={data} isLoading={isLoading}/> 
        </Suspense>
      : <ListView taskData={data} isLoading={isLoading}/>}
    </LeftNavbar>
>>>>>>> Stashed changes
    </div>
  )
}

export default Dashboard;

