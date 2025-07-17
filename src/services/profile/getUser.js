import axios from "axios";
import { BASE_URL } from "@/constant/allEnv";
import api from "@/lib/axiosInstance";

const getUser = async () => {

    return new Promise( async (resolve, reject) => {

        try {
            const response = await api.get(`/api/user`);
            const parsedResponse = response?.data;
            resolve(parsedResponse);
        } catch (error) {
            console.log("Error while get user : ", error);
            reject(error);
        }
    })
}

export default getUser;