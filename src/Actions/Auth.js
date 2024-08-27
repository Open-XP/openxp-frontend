import axios from "../Utils/axios";
// import axios from "axios";
import { returnErrors } from "./Messages";
import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGOUT_FAILED,
  PASSWORD_RESET_SUCCESS,
  PASSWORD_RESET_FAILED,
  PASSWORD_RESET_SENT,
  PASSWORD_RESET_NOT_SENT,
  TOKEN_REFRESH_SUCCESS,
  TOKEN_REFRESH_FAILED,
} from "./Types";

// CHECK TOKEN & LOAD USER
export const loadUser = () => (dispatch, getState) => {
  dispatch({ type: USER_LOADING });

  axios
    .get(`/api/auth/user/me/`, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: AUTH_ERROR,
      });
    });
};

// LOGIN USER
export const login = (email, password) => (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ email, password });

  axios
    .post(`/api/auth/user/login/`, body, config)
    .then((res) => {
      localStorage.setItem("access", res.data.access);
      localStorage.setItem("refresh", res.data.refresh);

      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      if (err.response) {
        dispatch(returnErrors(err.response.data, err.response.status));
      } else if (err.request) {
        dispatch(returnErrors("No response received from server", 500));
      } else {
        dispatch(returnErrors("Error in setting up the request", 500));
      }

      dispatch({
        type: LOGIN_FAIL,
      });
    });
};

// REFRESH TOKEN
export const refreshToken = () => (dispatch, getState) => {
  const refresh = localStorage.getItem("refresh");

  if (!refresh) {
    dispatch({ type: TOKEN_REFRESH_FAILED });
    return Promise.reject("No refresh token available");
  }

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ refresh });

  return axios
    .post("/api/auth/user/token/refresh/", body, config)
    .then((res) => {
      localStorage.setItem("access", res.data.access);

      dispatch({
        type: TOKEN_REFRESH_SUCCESS,
        payload: res.data,
      });

      return res.data.access;
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({ type: TOKEN_REFRESH_FAILED });
      dispatch(logout());
      return Promise.reject(err);
    });
};

// REGISTER USER
export const registers =
  (first_name, last_name, username, email, password, confirm_password) =>
  (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({
      first_name,
      last_name,
      username,
      email,
      password,
      confirm_password,
    });

    axios
      .post(`/api/auth/user/register/`, body, config)
      .then((res) => {
        dispatch({
          type: REGISTER_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch(returnErrors(err.response.data, err.response.status));
        dispatch({
          type: REGISTER_FAIL,
        });
      });
  };

// LOGOUT USER
export const logout = () => (dispatch, getState) => {
  const refresh = localStorage.getItem("refresh");
  const body = refresh ? JSON.stringify({ refresh }) : null;

  axios
    .post("/api/auth/user/logout/", body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
    })
    .then(() => {
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      dispatch({ type: LOGOUT_SUCCESS });
    })
    .catch((err) => {
      console.error("Logout error:", err);
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      dispatch({ type: LOGOUT_SUCCESS });
    });
};

// RESET PASSWORD
export const resetpassword = (email) => (dispatch) => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  // Request Body
  const body = JSON.stringify({ email });

  axios
    .post(`/api/auth/user/reset-password/`, body, config)
    .then((res) => {
      dispatch({
        type: PASSWORD_RESET_SENT,
        payload: res.data.message,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: PASSWORD_RESET_NOT_SENT,
      });
    });
};

// CONFIRM PASSWORD RESET
export const confirmPassword =
  (uidb64, token, password, confirm_password) => (dispatch) => {
    // Headers
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    // Request Body
    const body = JSON.stringify({ password, confirm_password });

    axios
      .post(
        `/api/auth/user/password-reset-confirm/${uidb64}/${token}/`,
        body,
        config
      )
      .then((res) => {
        dispatch({
          type: PASSWORD_RESET_SUCCESS,
          payload: res.data.message,
        });
      })
      .catch((err) => {
        dispatch(returnErrors(err.response.data, err.response.status));
        dispatch({
          type: PASSWORD_RESET_FAILED,
        });
      });
  };

// Setup config with token - helper function
export const tokenConfig = (getState) => {
  const token = localStorage.getItem("access");

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  return config;
};
