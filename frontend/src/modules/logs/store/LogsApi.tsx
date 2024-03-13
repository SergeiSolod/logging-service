import axios from "axios";

const $api = axios.create({
  withCredentials: true,
  baseURL: import.meta.env.VITE_API,
});

$api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
});

export const logsApi = {
  logs() {
    return $api.get<any>("/logs");
  },
  log(data: any) {
    const { project, name, message, stack, system, browser, user, date } = data;
    return $api.post<any>("/log", {
      project,
      name,
      message,
      stack,
      system,
      browser,
      user,
      date,
    });
  },
};
