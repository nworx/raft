import api from "@/lib/axiosInstance";

export const updateUser = async (formData) => {


    return new Promise( async (resolve, reject) => {

        try {
            
            const requestBody = { 
                 username:formData?.name,
             email:formData?.email,
             userTeam:formData?.team,
             bio:formData?.bio
            };

            const response = await api.patch(`/api/updateUser`, requestBody);

            const parsedResponse = response?.status===200? response?.data:null;
            resolve(parsedResponse);

        } catch (error) {
            console.log("Error on upsert Profile : ", error);
            reject(error);
        }
    })
}