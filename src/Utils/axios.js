import axios from "axios";
import { getCookie } from "./csrf"; // Make sure this function correctly fetches the CSRF token

const instance = axios.create({
  baseURL: "http://127.0.0.1:8000", // replace with your API base URL
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
