"use client";

import React, {useState} from 'react'
import KanbanBoard from '@/components/kanban/KanbanBoard';
import LeftNavbar from '@/components/common/LeftNavbar';
import ListView from '@/components/listview/ListView';
const page = () => {
  const [toggleView, setToggleView] = useState(true);
  return ( 
    <div className='flex'>
    <LeftNavbar>
      <button 
        className="absolute left-[2rem] h-[18px] w-[80px] sm:w-[80px] md:w-[100px] border border-gray-400 rounded-full bg-white text-[10px] sm:text-xs text-gray-700 flex items-center justify-center shadow-sm hover:bg-gray-100"
        onClick={() => setToggleView(!toggleView)}
      >
        {toggleView? "List View" : "Kanban View"}
      </button>
      {toggleView? <KanbanBoard/> : <ListView/>}
    </LeftNavbar>
    </div>
  )
}

export default page

