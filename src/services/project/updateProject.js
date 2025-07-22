import api from "@/lib/axiosInstance"; 
import { format } from "date-fns";
import { toast } from "@/components/ui/use-toast";

export const updateProject = async (formData) => {
  const token = document.cookie.match(/(?:^|;\s*)jwt=([^;]*)/)?.[1];

  return new Promise(async (resolve, reject) => {
    try {
      console.log(formData, "formdata1");
      const formattedStartDate = formData?.startDate
        ? format(new Date(formData.startDate), "yyyy-MM-dd")
        : null;
      const formattedEndDate = formData?.endDate
        ? format(new Date(formData.endDate), "yyyy-MM-dd")
        : null;

      const requestBody = {
        id: formData?.id,
        name: formData?.name,
        priority: formData?.priority,
        description: formData?.description,
        startDate: formattedStartDate,
        endDate: formattedEndDate,
        team: formData?.team,
        status: formData?.status,
        members: formData?.members?.map((email) => ({ email })),
      };

      const response = await api.post("/updateProject", requestBody, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const parsedResponse = response?.data;
      resolve(parsedResponse);
    } catch (error) {
      console.error("Failed to create project ", error);
      toast({
        title: "Error",
        description:
          error?.response?.data?.message ||
          error?.message ||
          "Something went wrong",
        variant: "destructive",
      });
      reject(error);
    }
  });
};
