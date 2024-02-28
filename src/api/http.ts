import axios, { AxiosRequestConfig } from "axios";
import { getToken, removeToken } from "../store/authStore";

const BASE_URL = "http://localhost:7777";
const DEFAULT_TIMEOUT = 30000;

export const createClient = (config?: AxiosRequestConfig) => {
  const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: DEFAULT_TIMEOUT,
    headers: {
      "content-type": "application/json",
      Authorization: getToken() ? getToken() : "",
      "Access-Control-Allow-Origin": `http://localhost:3000`,
      "Access-Control-Allow-Credentials": "true"
    },
    withCredentials: true,
    ...config
  });

  axiosInstance.interceptors.response.use((response) => {
      return response;
    },
    (error) => {
      // 로그인 만료 처리
      if (error.response.status == 401) {
        removeToken();
        window.location.href = "/login";
        return;
      }
      return Promise.reject(error);
  });

  return axiosInstance;
};

export const httpClient = createClient();