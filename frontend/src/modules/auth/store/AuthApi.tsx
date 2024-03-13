import axios from "axios";

const $api = axios.create({
  withCredentials: true,
  baseURL: import.meta.env.VITE_API,
});

$api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
});

export const authApi = {
  registration(data: any) {
    const { username, password } = data;
    return $api.post<any>("/registration", { username, password });
  },
  login(data: any) {
    const { username, password } = data;
    return $api.post<any>("/login", { username, password });
  },
};
