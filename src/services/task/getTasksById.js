"use client"
import { BASE_URL } from "@/constant/allEnv";
import api from "@/lib/axiosInstance";
import axios from "axios";

 const getTasksById = async ({taskId}) => {

  return new Promise( async (resolve, reject) => {

  try {
    const response = await api.get(`/taskId/${taskId}/getTask`);
    
    console.log("getTasksById successfully:", response);
    resolve(response);
  } catch (error) {
    console.error("Error getTasksById:", error.response ? error.response.data : error.message);
    reject(error);
  }
});
}

export default  getTasksById;
