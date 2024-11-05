// import useSessionStore from "@/stores/useSessionStore";
import axios, { InternalAxiosRequestConfig } from "axios";

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  useDefaultHeaders?: boolean;
}

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://192.168.1.13:3000/api/v1",
  timeout: 10000
});

apiClient.interceptors.request.use(
  (config: CustomAxiosRequestConfig) => {
    // const { session } = useSessionStore.getState();

    // if (config.useDefaultHeaders !== false) {
    //   if (session?.token && !(config.headers as AxiosHeaders)?.has("Authorization")) {
    //     if (!config.headers) {
    //       config.headers = new AxiosHeaders();
    //     }
    //     (config.headers as AxiosHeaders).set(
    //       "Authorization",
    //     //   `Bearer ${session.token}`
    //     );
    //   }
    // }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.error("API Error:", error.response?.data?.message || error.message);
    return Promise.reject(error);
  }
);
