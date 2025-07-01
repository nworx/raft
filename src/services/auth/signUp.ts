import { BASE_URL } from "@/constant/allEnv";
import api from "@/lib/axiosInstance";
import axios from "axios";
import React from "react";

const signUp = async({ email, password }) => {
  try {
    const response = await api.post(`${BASE_URL}/api/signup`, {
      email,
      password,
    });
    console.log(response,"responseresponse")
  } catch (errorMessage) {
    console.log(errorMessage,"signup")
  }
};

export default signUp;
