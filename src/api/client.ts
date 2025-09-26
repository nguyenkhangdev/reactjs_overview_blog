import axios from "axios";
import type { AxiosInstance } from "axios";

// instance Axios
export const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

// Interceptor request: auto attached token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("auth-token");
    if (token && config.headers) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor response: handle error lobal
api.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);
