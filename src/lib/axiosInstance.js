import axios from "axios";

const token = document.cookie.match(/(?:^|;\s*)jwt=([^;]*)/)?.[1];
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_NWORX_BASE_URL,
  withCredentials: true, 
  headers: {
              Authorization: `Bearer ${token}`, 
              "Content-Type": "application/json",
          },
});

export default api;
