"use client";

import React, {useState, useEffect, Suspense} from 'react'
import KanbanBoard from '@/components/kanban/KanbanBoard';
import LeftNavbar from '@/components/common/LeftNavbar';
import ListView from '@/components/listview/ListView';
import getAllUserTask from '@/services/task/getAllUserTask';
import { useRouter } from 'next/navigation';

const Dashboard = () => {
  const router = useRouter();

  const [toggleView, setToggleView] = useState(true);

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
  const getAllUserTaskFunc = async () => {
      try {
        setIsLoading(true);
        const response = await getAllUserTask();
        console.log(response, "responseresponse");
        if (response) {
          setData(response?.data);
        }
      } catch (error) {
        console.error("Error fetching user tasks:", error);
      } finally {
        setIsLoading(false);
      }
    };

    getAllUserTaskFunc();
  }, [router.isReady]);

  return ( 
    <div className='flex'>
    <LeftNavbar>
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
    </div>
  )
}

export default Dashboard;

