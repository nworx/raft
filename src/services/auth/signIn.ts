import { toast } from "@/components/ui/use-toast";
import { BASE_URL } from "@/constant/allEnv";
import api from "@/lib/axiosInstance";
import axios from "axios";
import React from "react";


const signIn = async({ email, password }) => {
  try {
    const response = await api.post(`${BASE_URL}/api/signIn`, {
      email,
      password,
    });
    return response
   
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
