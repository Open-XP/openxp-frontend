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
} from "../Actions/Types";

const initialState = {
  schedules: [],
  schedule: {},
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case FETCH_ALL_SCHEDULES_SUCCESS:
      return {
        ...state,
        schedules: payload,
      };
    case FETCH_ALL_SCHEDULES_FAIL:
      return {
        ...state,
        error: payload,
      };
    case FETCH_INDIVIDUAL_SCHEDULES_SUCCESS:
      return {
        ...state,
        schedule: payload,
      };
    case FETCH_INDIVIDUAL_SCHEDULES_FAIL:
      return {
        ...state,
        error: payload,
      };
    case CREATE_SCHEDULE_SUCCESS:
      return {
        ...state,
        schedule: payload,
      };
    case CREATE_SCHEDULE_FAIL:
      return {
        ...state,
        error: payload,
      };
    case UPDATE_SCHEDULE_SUCCESS:
      return {
        ...state,
        schedule: payload,
      };
    case UPDATE_SCHEDULE_FAIL:
      return {
        ...state,
        error: payload,
      };
    case DELETE_SCHEDULE_SUCCESS:
      return {
        ...state,
        schedule: payload,
      };
    case DELETE_SCHEDULE_FAIL:
      return {
        ...state,
        error: payload,
      };
    default:
      return state;
  }
}
