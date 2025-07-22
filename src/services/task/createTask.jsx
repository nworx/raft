import axios from "axios";
import { BASE_URL } from "@/constant/allEnv";
import api from "@/lib/axiosInstance";

const createTask = async ({projectId, title, description, assigneeId, reporterId, type, status, priority, dueDate}) => {

  return new Promise( async (resolve, reject) => {

    try {

      const requestBody = {projectId, title, description, assigneeId, reporterId, type, status, priority, dueDate};

      console.log("Request Body of create task api :-", requestBody);

      const response = await api.post(`/createTask`, requestBody);

      console.log("Response of create task api :-", response);
      

      const parsedResponse = response?.data;

      resolve(parsedResponse);
    } catch (error) {
      console.log("Error on create Task :- " , error);
      reject(error);
    }
  })
}

export default createTask;