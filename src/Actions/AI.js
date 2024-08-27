import axios from "../Utils/axios";
import { baseurl } from "./BaseUrls";
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
  FETCH_RECOMMENDED_TOPIC_SUCCESS,
  FETCH_RECOMMENDED_TOPIC_FAIL,
  ASSIGN_CHAT_SESSION_ID,
  TRIGGER_RELOADING_INDIVIDUAL_CHAT_SESSIONS,
  NO_CHAT_TRIGGER,
  CHAT_SESSION_DELETED,
} from "./Types";

export const explainAnswer = (prompt) => (dispatch, getState) => {
  const body = JSON.stringify({ prompt });
  console.log("body", body);
  return axios
    .post(`/api/ai/explain_answers/`, body, tokenConfig(getState))
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
    .post(`/api/ai/sessions/`, body, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: START_CHAT_SESSION_SUCCESS,
        payload: res.data,
      });
      return res.data;
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({ type: START_CHAT_SESSION_FAIL });
      throw err;
    });
};

export const FetchIndividualChatSessions = (id) => (dispatch, getState) => {
  return axios
    .get(`/api/ai/sessions/${id}/`, tokenConfig(getState))
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
    .get(`/api/ai/sessions/`, tokenConfig(getState))
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
    .post(`/api/ai/chat/${session_id}/`, body, tokenConfig(getState))
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

export const FetchRecommendCareerTopics = () => (dispatch, getState) => {
  return axios
    .get(`/api/ai/career-suggestions/`, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: FETCH_RECOMMENDED_TOPIC_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({ type: FETCH_RECOMMENDED_TOPIC_FAIL });
      throw err;
    });
};

export const setChatInstanceID = (id) => ({
  type: ASSIGN_CHAT_SESSION_ID,
  payload: id,
});

export const TriggerIndividualChatSessionsReload = () => ({
  type: TRIGGER_RELOADING_INDIVIDUAL_CHAT_SESSIONS,
});

export const NoChatTrigger = () => ({
  type: NO_CHAT_TRIGGER,
  payload: true,
});

export const DeleteChatSession = (id) => (dispatch, getState) => {
  return axios
    .delete(`/api/ai/sessions/delete/${id}/`, tokenConfig(getState))
    .then(() => {
      dispatch({
        type: CHAT_SESSION_DELETED,
      });
    })
    .catch((err) => {
      if (err.response) {
        dispatch(returnErrors(err.response.data, err.response.status));
      } else {
        dispatch(returnErrors("An unknown error occurred", 500));
      }
      throw err;
    });
};
