import axios from "axios";
import { BASE_URL } from "@/constant/allEnv";
import api from "@/lib/axiosInstance";

const updateComment = async ({commentId,content}) => {
  return new Promise( async (resolve, reject) => {

    try {
      const response = await api.put(`/commentId/${commentId}/updateComment`, {content});
      const parsedResponse = response?.data;
      resolve(parsedResponse);
    } catch (error) {
      console.log("Error while create Comment :- " , error);
      reject(error);
    }
  })
}

export default updateComment;