import axios from "axios";
import { BASE_URL } from "@/constant/allEnv";
import api from "@/lib/axiosInstance";

const updateTaskStatus = async ({taskId, status}) => {
  console.log(taskId,"updateTaskStatus",status)
  return new Promise( async (resolve, reject) => {

    try {
      const response = await api.put(`/taskId/${taskId}/status/${status}/updateTaskStatus`);
      console.log(response,"updateTaskStatus")
      resolve(response);
    } catch (error) {
      console.log("Error while update Task Status :- " , error);
      reject(error);
    }
  })
}

export default updateTaskStatus;