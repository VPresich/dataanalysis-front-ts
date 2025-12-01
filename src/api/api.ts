import axios from "axios";
import { AxiosRequestConfig } from "axios";
import { axiosInst } from "./axiosInst";

type ApiWrapper = {
  get: <T>(url: string, config?: AxiosRequestConfig) => Promise<T>;

  post: <T = void>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ) => Promise<T>;

  patch: <T = void>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ) => Promise<T>;

  delete: <T = void>(url: string, config?: AxiosRequestConfig) => Promise<T>;
};

export const api: ApiWrapper = {
  get: async (url, config) => {
    const response = await axiosInst.get(url, config);
    return response.data;
  },

  post: async (url, data?, config?) => {
    const response = await axiosInst.post(url, data, config);
    return response.data;
  },

  patch: async (url, data?, config?) => {
    const response = await axiosInst.patch(url, data, config);
    return response.data;
  },

  delete: async (url, config?) => {
    const response = await axiosInst.delete(url, config);
    return response.data;
  },
};
