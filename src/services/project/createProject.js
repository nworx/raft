import axios from "axios";
import { BASE_URL } from "@/constant/allEnv";

import { toast } from "@/components/ui/use-toast";
// String name, String priority,
// String description, int taskCount,
// LocalDate startDate, String category,
// ProjectStatus status
export const createProject = async (formData) =>{
    // console.log(formData, "formdata");
    
    const token = document.cookie.match(/(?:^|;\s*)jwt=([^;]*)/)?.[1];
    // console.log( "token", token);

    return new Promise ( async (resolve, reject)=>{

        try {

            const requestBody = {name: formData?.name, priority: formData?.priority, description: formData?.description, taskCount: formData?.tasks, startDate: formData?.dueDate, category: formData?.category, status: formData?.status};
            // console.log(requestBody, "formdata1");


            const response = await axios.post(`${BASE_URL}/createProject`, requestBody, {
                headers: {
                    Authorization: `Bearer ${token}`, 
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            });

            const parsedResponse = response?.data;
            resolve(parsedResponse);
            
            
            
        } catch (error) {
            console.log("Failed to create project ", error);
            toast({
                title: "Error",
                description: error?.response?.data?.message || error?.message || "Something went wrong",
                variant: "destructive",
            });
            reject(error);
        }
    })
}