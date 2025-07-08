import axios from 'axios';
import { BASE_URL } from "@/constant/allEnv";

const fetchAllProjects = async ({ email }) => {

    let allProjects = null;

    return new Promise(async (resolve, reject) => {
   
      try {

        const response  = await axios.get(`${BASE_URL}/email/${email}/getAllProjects`);
       
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