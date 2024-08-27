import { tokenConfig } from "./Auth";
// import axios from "axios";
import axios from "../Utils/axios";
import { returnErrors } from "./Messages";
import {
  FETCH_ALL_SCHEDULES_SUCCESS,
  FETCH_ALL_SCHEDULES_FAIL,
  FETCH_INDIVIDUAL_SCHEDULES_SUCCESS,
  FETCH_INDIVIDUAL_SCHEDULES_FAIL,
  CREATE_SCHEDULE_SUCCESS,
  CREATE_SCHEDULE_FAIL,
  UPDATE_SCHEDULE_SUCCESS,
  UPDATE_SCHEDULE_FAIL,
  DELETE_SCHEDULE_SUCCESS,
  DELETE_SCHEDULE_FAIL,
} from "./Types";

// Action to fetch all schedules
export const fetchAllSchedules = () => (dispatch, getState) => {
  return axios
    .get(`/api/examscheduler/exams/`, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: FETCH_ALL_SCHEDULES_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({ type: FETCH_ALL_SCHEDULES_FAIL });
    });
};

// Action to fetch individual schedule
export const fetchIndividualSchedule = (id) => (dispatch, getState) => {
  axios
    .get(`/api/examscheduler/exams/${id}/`, tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: FETCH_INDIVIDUAL_SCHEDULES_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({ type: FETCH_INDIVIDUAL_SCHEDULES_FAIL });
    });
};

// Action to create a schedule
export const createSchedule =
  (subject, exam_type, date, time, description) => (dispatch, getState) => {
    const body = JSON.stringify({
      subject,
      exam_type,
      date,
      time,
      description,
    });

    console.log("This is the body".body);

    axios
      .post(`/api/examscheduler/exams/`, body, tokenConfig(getState))
      .then((res) => {
        dispatch({
          type: CREATE_SCHEDULE_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch(returnErrors(err.response.data, err.response.status));
        dispatch({ type: CREATE_SCHEDULE_FAIL });
      });
  };

// Action to update a schedule
export const updateSchedule =
  (id, subject, exam_type, date, time, description) => (dispatch, getState) => {
    const body = JSON.stringify({
      subject,
      exam_type,
      date,
      time,
      description,
    });

    axios
      .put(`/api/examscheduler/exams/${id}/`, body, tokenConfig(getState))
      .then((res) => {
        dispatch({
          type: UPDATE_SCHEDULE_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch(returnErrors(err.response.data, err.response.status));
        dispatch({ type: UPDATE_SCHEDULE_FAIL });
      });
  };

// Action to delete a schedule
export const deleteSchedule = (id) => (dispatch, getState) => {
  return axios
    .delete(`/api/examscheduler/exams/${id}/`, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: DELETE_SCHEDULE_SUCCESS,
        payload: id,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({ type: DELETE_SCHEDULE_FAIL });
    });
};
