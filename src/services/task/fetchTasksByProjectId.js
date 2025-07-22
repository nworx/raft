import axios from 'axios';
import { BASE_URL } from "@/constant/allEnv";
import api from '@/lib/axiosInstance';

const fetchTasksByProjectId  = async ({ projectId }) => {

    let allTasks = null;

    return new Promise(async (resolve, reject) => {
   
      try {

        const response  = await api.get(`/projectId/${projectId}/getAllProjectTasks `);
       
        const parsedResponse = response?.data;
        allTasks = parsedResponse;
        console.log("get all projects", parsedResponse);
        resolve(allTasks);
      } catch (error) {
        console.log(error, "fetchEventSlots error");
        reject(error);
      }
    
    return { allTasks: allTasks };
  });

}

export default fetchTasksByProjectId ;
