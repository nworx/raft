
import React, {useState, useEffect, Suspense} from 'react'
import KanbanBoard from '@/components/kanban/KanbanBoard';
import LeftNavbar from '@/components/common/LeftNavbar';
import ListView from '@/components/listview/ListView';
import fetchTasksByProjectId from '@/services/task/fetchTasksByProjectId';
import { useSearchParams } from 'next/navigation';

const KanbanBoardDifferentView = () => {
   const searchParams = useSearchParams();
  const id = searchParams.get('id');

  const [toggleView, setToggleView] = useState(true);

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchTaskByProjectIdFunc = async () => {
    if (!id) {
      console.warn("No ID provided in query params.");
      return;
    }

    setIsLoading(true); 

    try {
      const response = await fetchTasksByProjectId({ projectId: id });

      if (response) {
        setData(response);
      } else {
        console.warn("No data returned for taskId:", id);
      }
    } catch (error) {
      console.error("Error in fetchTaskByProjectIdFunc:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGetTask = async (taskData) => {
    
    await fetchTaskByProjectIdFunc(); 
  };

  useEffect(() => {
    fetchTaskByProjectIdFunc();
  }, [id]);

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
      <KanbanBoard taskData={data} isLoading={isLoading} onTaskUpdate={handleGetTask}/> 
      </Suspense>
      : <ListView taskData={data} isLoading={isLoading}/>}
    </LeftNavbar>
    </div>
  )
}

export default KanbanBoardDifferentView
