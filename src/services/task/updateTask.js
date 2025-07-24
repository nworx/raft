import axios from "axios";
import { BASE_URL } from "@/constant/allEnv";
import api from "@/lib/axiosInstance";

const updateTask = async ({taskId, title, description,status,type,priority,dueDate}) => {

  return new Promise( async (resolve, reject) => {

    try {

      const requestBody = {title, description,status,type,priority,dueDate};


      const response = await api.patch(`/taskId/${taskId}/updateTask`, requestBody);

      console.log("Response of update task api :-", response);
      resolve(response);
    } catch (error) {
      console.log("Error on update Task :- " , error);
      reject(error);
    }
  })
}

export default updateTask;