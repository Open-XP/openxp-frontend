import axios from "axios";
import { getCookie } from "./csrf";
import { refreshToken, logout } from "../Actions/Auth";
import store from "../Store/Store";

const instance = axios.create({
  baseURL: "http://127.0.0.1:8000",
  withCredentials: true,
});

instance.interceptors.request.use(
  (config) => {
    const token = getCookie("csrftoken");
    if (token) {
      config.headers["X-CSRFToken"] = token;
    }
    const accessToken = localStorage.getItem("access");
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

let isRefreshing = false;
let refreshSubscribers = [];

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Handle 401 errors gracefully
    if (error.response && error.response.status === 401) {
      if (
        error.response.data.detail === "Token is invalid or expired" &&
        !originalRequest._retry
      ) {
        // Token is invalid or expired
        console.log("Token is invalid or expired. Logging out.");
        store.dispatch(logout());
        return Promise.reject(error);
      }

      if (!originalRequest._retry && !isRefreshing) {
        originalRequest._retry = true;
        isRefreshing = true;

        try {
          const { newAccessToken } = await store.dispatch(refreshToken());
          isRefreshing = false;
          refreshSubscribers.forEach((callback) => callback(newAccessToken));
          refreshSubscribers = [];

          originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          localStorage.setItem("access", newAccessToken);

          return instance(originalRequest);
        } catch (err) {
          isRefreshing = false;
          console.error("Failed to refresh token:", err);
          if (err.response.data.detail === "Token is invalid or expired") {
            store.dispatch(logout());
          }

          return Promise.reject(err);
        }
      }

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          refreshSubscribers.push((token) => {
            originalRequest.headers["Authorization"] = `Bearer ${token}`;
            resolve(instance(originalRequest));
          });
        });
      }
    }

    // Handle missing refresh token

    console.error("No refresh token available. Logging out.");
    store.dispatch(logout());

    // Log all other errors
    console.error("Axios error:", error);
    return Promise.reject(error);
  }
);

export default instance;
