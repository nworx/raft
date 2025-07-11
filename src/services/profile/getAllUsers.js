import axios from "axios";
import { BASE_URL } from "@/constant/allEnv";

const getAllUsers = async () => {

    return new Promise( async (resolve, reject) => {

        try {
            const response = await axios.get(`${BASE_URL}/api/getAllUsers`);
            const parsedResponse = response?.data;
            resolve(parsedResponse);
        } catch (error) {
            console.log("Error on get all users : ", error);
            reject(error);
        }
    })
}

export default getAllUsers;