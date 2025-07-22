import api from "@/lib/axiosInstance";

const assignTask = async ({ taskId, assigneeId }) => {
    
  return new Promise(async (resolve, reject) => {
    try {
      const response = await api.patch(
        `/taskId/${taskId}/assigneeId/${assigneeId}/assignTask`
      );
      const parsedResponse = response?.data;
      resolve(parsedResponse);
    } catch (error) {
      console.error("Error while assigning task:", error);
      reject(error);
    }
  });
};

export default assignTask;
