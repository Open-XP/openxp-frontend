import axios from "../Utils/axios";
import { baseurl } from "./Auth";
import { tokenConfig } from "./Auth";
import { returnErrors } from "./Messages";
import {
  EXPLAIN_ANSWER_SUCCESS,
  EXPLAIN_ANSWER_FAIL,
  START_CHAT_SESSION_SUCCESS,
  START_CHAT_SESSION_FAIL,
  FETCH_INDIVIDUAL_CHAT_SESSIONS_SUCCESS,
  FETCH_INDIVIDUAL_CHAT_SESSIONS_FAIL,
  FETCH_ALL_CHAT_SESSION_SUCCESS,
  FETCH_ALL_CHAT_SESSION_FAIL,
  CHAT_SENT_SUCCESS,
  CHAT_SENT_FAIL,
} from "./Types";

export const explainAnswer = (prompt) => (dispatch, getState) => {
  const body = JSON.stringify({ prompt });
  console.log("body", body);
  return axios
    .post(`${baseurl}/api/ai/explain_answers/`, body, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: EXPLAIN_ANSWER_SUCCESS,
        payload: res.data,
      });
      return res.data; // Return the response data for the promise chain
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({ type: EXPLAIN_ANSWER_FAIL });
      throw err; // Throw the error for the promise chain
    });
};

export const StartCareerBuddySession = () => (dispatch, getState) => {
  const body = {};
  return axios
    .post(`${baseurl}/api/ai/sessions/`, body, tokenConfig(getState)) // Pass the empty body
    .then((res) =>
      dispatch({
        type: START_CHAT_SESSION_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({ type: START_CHAT_SESSION_FAIL });
      throw err;
    });
};

export const FetchIndividualChatSessions = (id) => (dispatch, getState) => {
  return axios
    .get(`${baseurl}/api/ai/sessions/${id}/`, tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: FETCH_INDIVIDUAL_CHAT_SESSIONS_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({ type: FETCH_INDIVIDUAL_CHAT_SESSIONS_FAIL });
      throw err;
    });
};

export const FetchAllChatSessions = () => (dispatch, getState) => {
  return axios
    .get(`${baseurl}/api/ai/sessions/`, tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: FETCH_ALL_CHAT_SESSION_SUCCESS, // Correct the typo here
        payload: res.data,
      })
    )
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({ type: FETCH_ALL_CHAT_SESSION_FAIL });
      throw err;
    });
};

export const ChatInput = (session_id, message) => (dispatch, getState) => {
  const body = JSON.stringify({ message });
  return axios
    .post(`${baseurl}/api/ai/chat/${session_id}/`, body, tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: CHAT_SENT_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({ type: CHAT_SENT_FAIL });
      throw err;
    });
};
