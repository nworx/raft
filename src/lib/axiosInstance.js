"use client"
import useUserStore from "@/zustand/userStore";
import axios from "axios";

// const token = document.cookie.match(/(?:^|;\s*)jwt=([^;]*)/)?.[1];
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_NWORX_BASE_URL,
  withCredentials: true, 
  // headers: {
  //             Authorization: `Bearer ${token}`, 
  //         },
});

api.interceptors.request.use((config) => {
  const { ut } = useUserStore.getState();
  const token = document.cookie.match(/(?:^|;\s*)jwt=([^;]*)/)?.[1];

  // Only attach token for endpoints that are NOT public
  const isPublic = config.headers?.skipAuth === true || config.url.includes("/signIn","/signUp");

  if (!isPublic && token) {
    config.headers.Authorization = `Bearer ${ut}`;
  } else {
    delete config.headers.Authorization;
  }

  return config;
});

export default api;
