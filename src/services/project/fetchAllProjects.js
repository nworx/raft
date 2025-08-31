import axios from 'axios';
import { BASE_URL } from "@/constant/allEnv";
import api from '@/lib/axiosInstance';

const fetchAllProjects = async ({ email }) => {

    let allProjects = null;

    return new Promise(async (resolve, reject) => {
   
      try {

        const response  = await api.get(`/email/${email}/getUserAllProjects`);
       
        const parsedResponse = response?.data;
        allProjects = parsedResponse;
        console.log("get all projects", parsedResponse);
        resolve(allProjects);
      } catch (error) {
        console.log(error, "fetchEventSlots error");
        reject(error);
      }
    
    return { allProjects: allProjects };
  });

}

export default fetchAllProjects;