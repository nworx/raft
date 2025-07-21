"use client"
import { BASE_URL } from "@/constant/allEnv";
import axios from "axios";

 const fetchTasksById = async ({taskId}) => {


  try {
    const response = await axios.get(`${BASE_URL}/fetchTasksById/${taskId}`, {
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
