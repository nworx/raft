import api from "@/lib/axiosInstance";


const getCommentByTask = async ({ taskId }) => {

   

    return new Promise(async (resolve, reject) => {
   
      try {
        const response  = await api.get(`/task/${taskId}/taskComments`);
        const parsedResponse = response?.data;
        resolve(parsedResponse);
      } catch (error) {
        console.log(error, "taskComments error");
        reject(error);
      }
    
   
  });

}

export default getCommentByTask;