import axios from "axios";
import { getCookie } from "./csrf";
import store from "../Store/Store";
import { logout, refreshToken } from "../Actions/Auth";

const instance = axios.create({
  baseURL: "http://127.0.0.1:8000",
  withCredentials: true,
});

instance.interceptors.request.use(
  (config) => {
    const token = store.getState().auth.access;
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    const csrfToken = getCookie("csrftoken");
    if (csrfToken) {
      config.headers["X-CSRFToken"] = csrfToken;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry &&
      originalRequest.url !== "/api/auth/user/token/refresh/"
    ) {
      originalRequest._retry = true;
      try {
        const newAccessToken = await store.dispatch(refreshToken());

        if (newAccessToken) {
          originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

          return instance(originalRequest);
        } else {
          throw new Error("Token refresh failed");
        }
      } catch (err) {
        store.dispatch(logout());
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default instance;
