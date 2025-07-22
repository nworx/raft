import { toast } from "@/components/ui/use-toast";
import { BASE_URL } from "@/constant/allEnv";
import api from "@/lib/axiosInstance";
import axios from "axios";
import React from "react";

import useUserStore from "@/zustand/userStore";


const signIn = async({ email, password }) => {

  const { setUser, setUt, clearUser, user, ut } = useUserStore.getState();


  try {
    const response = await api.post(`${BASE_URL}/api/signIn`, {
      email,
      password,
    });
    if(response.status === 200){


       const token = document.cookie
        .split('; ')
        .find((row) => row.startsWith('jwt='))
        ?.split('=')[1];
        setUt(token);
      if (!token) {
        throw new Error('JWT token not found in cookies');
      }
      

      // const userData = response?.config?.data;
      // console.log(response?.config?.data,"response123", response);
      // setUser(response?.config?.data);

      const rawData = response?.config?.data;
      console.log(response?.config?.data,"response123", response, rawData);

      const parsedData = JSON.parse(rawData);
      setUser({ email: parsedData.email }); 

      return response
    }
    
   
  } catch (errorMessage) {
    console.log(errorMessage,"signIn");
    if(errorMessage?.status === 404){
       console.log(errorMessage,"signInsignIn");
      toast({
        title: "Error",
        description: `It looks like you are not registered. Please sign in to continue.`,
        variant: "destructive",
      });
    }
  }
};

export default signIn;
