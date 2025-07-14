import axios from "axios";
import { BASE_URL } from "@/constant/allEnv";
import api from "@/lib/axiosInstance";

export const uploadImage = async ({image}) => {

console.log("image type:", image, image instanceof File, image instanceof Blob);

    return new Promise( async (resolve, reject) => {

        try {
            
             const formData = new FormData();
             formData.append("file", image); 

            const response = await api.post(`/uploadImage`, formData,
             
    
            );

            const parsedResponse = response?.data;
            resolve(parsedResponse);

        } catch (error) {
            console.log("Error on uploadImage : ", error);
            reject(error);
        }
    })
}