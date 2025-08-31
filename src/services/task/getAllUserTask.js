import api from "@/lib/axiosInstance";


 const getAllUserTask = async () => {


  try {
    const response = await api.get(`/getAllUserTask`, {
      headers: {
        "Content-Type": "application/json"
      }
    });
    console.log(response,"response")
    if(response?.status===200){
      return response;
    }
   
  } catch (error) {
    console.error("Error getAllUserTask:",  error);
  }
};

export default  getAllUserTask;
