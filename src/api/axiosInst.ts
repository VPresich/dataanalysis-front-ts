import axios, { AxiosInstance } from "axios";

export const BaseURL = "http://localhost:8000/api/";

export const axiosInst: AxiosInstance = axios.create({
  baseURL: BaseURL,
});

export const setAuthHeader = (token: string) => {
  axiosInst.defaults.headers.common.Authorization = `Bearer ${token}`;
};
export const clearAuthHeader = () => {
  axiosInst.defaults.headers.common.Authorization = "";
  axiosInst.defaults.headers.common["X-App-Name"] = "";
};
