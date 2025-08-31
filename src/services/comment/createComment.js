import axios from "axios";
import { BASE_URL } from "@/constant/allEnv";
import api from "@/lib/axiosInstance";

const createComment = async ({taskId, content}) => {
  return new Promise( async (resolve, reject) => {

    try {
      const requestBody={taskId, content}
      const response = await api.post(`/createComment`, requestBody);
      const parsedResponse = response?.data;
      resolve(parsedResponse);
    } catch (error) {
      console.log("Error while create Comment :- " , error);
      reject(error);
    }
  })
}

export default createComment;