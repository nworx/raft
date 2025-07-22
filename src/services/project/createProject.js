import axios from "axios";
import { BASE_URL } from "@/constant/allEnv";
import { format } from "date-fns";
import { toast } from "@/components/ui/use-toast";

export const createProject = async (formData) =>{
    
    const token = document.cookie.match(/(?:^|;\s*)jwt=([^;]*)/)?.[1];

    return new Promise ( async (resolve, reject)=>{

        try {

            // const requestBody = {name: formData?.name, priority: formData?.priority, description: formData?.description, taskCount: formData?.tasks, startDate: formData?.dueDate, category: formData?.category, status: formData?.status};
            console.log(formData, "formdata1");
            const formattedStartDate = formData?.startDate ? format(new Date(formData.startDate), 'yyyy-MM-dd') : null;
            const formattedEndDate = formData?.endDate ? format(new Date(formData.endDate), 'yyyy-MM-dd') : null;

            const requestBody = {
                name: formData?.name,
                priority: formData?.priority,
                description: formData?.description,
                startDate: formattedStartDate,
                endDate: formattedEndDate,    
                team: formData?.team,
                status: formData?.status,
                members: formData?.members?.map(email => ({ email })),
                // members: formData?.members
            };

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