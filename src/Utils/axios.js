// utils/axios.js
import axios from "axios";
import { getCookie } from "./csrf";

const instance = axios.create({
  baseURL: "http://openxp.study", // replace with your API base URL
  withCredentials: true, // include cookies in requests
});

instance.interceptors.request.use(
  (config) => {
    const token = getCookie("csrftoken");
    if (token) {
      config.headers["X-CSRFToken"] = token;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;
