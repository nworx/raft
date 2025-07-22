import axios from "axios";
import { BASE_URL } from "@/constant/allEnv";
import api from "@/lib/axiosInstance";

const getAllUsers = async () => {

    return new Promise( async (resolve, reject) => {

        try {
            const response = await api.get(`/api/getAllUsers`);
            const parsedResponse = response?.data;
            resolve(parsedResponse);
        } catch (error) {
            console.log("Error on get all users : ", error);
            reject(error);
        }
    })
}

export default getAllUsers;