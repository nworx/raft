"use client"
import { BASE_URL } from "@/constant/allEnv";
import api from "@/lib/axiosInstance";
import axios from "axios";

 const fetchTasksById = async ({taskId}) => {


  try {
    const response = await api.get(`/fetchTasksById/${taskId}`, {
      headers: {
        "Content-Type": "application/json"
      }
    });

    console.log("fetchTasksById successfully:", response.data);
  } catch (error) {
    console.error("Error fetchTasksById:", error.response ? error.response.data : error.message);
  }
};

export default  fetchTasksById;
