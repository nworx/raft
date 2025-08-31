import axios from "axios";
import { BASE_URL } from "@/constant/allEnv";
import api from "@/lib/axiosInstance";

export const upsertProfile = async (formData) => {

    const token = document.cookie.match(/(?:^|;\s*)jwt=([^;]*)/)?.[1];


    return new Promise( async (resolve, reject) => {

        try {
            
            const requestBody = formData;

            const response = await api.post(`/upsertProfile`, requestBody, {
                headers : {
                    Authorization: `Bearer ${token}`, 
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            });

            const parsedResponse = response?.data;
            resolve(parsedResponse);

        } catch (error) {
            console.log("Error on upsert Profile : ", error);
            reject(error);
        }
    })
}