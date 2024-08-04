import {
  EXPLAIN_ANSWER_SUCCESS,
  EXPLAIN_ANSWER_FAIL,
  START_CHAT_SESSION_SUCCESS,
  START_CHAT_SESSION_FAIL,
  FETCH_INDIVIDUAL_CHAT_SESSIONS_SUCCESS,
  FETCH_INDIVIDUAL_CHAT_SESSIONS_FAIL,
  FETCH_ALL_CHAT_SESSION_SUCCESS,
  FETCH_ALL_CHAT_SESSION_FAIL,
} from "../Actions/Types";

const initialState = {
  explanation: [],
  error: {},
  explainatioLoading: true,
  careerBuddyStarted: false,
  loadingIndividualChatSessions: true,
  loadingAllChatSessions: true,
  individualChatSessions: [],
  allChatSessions: [],
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case EXPLAIN_ANSWER_SUCCESS:
      return {
        ...state,
        explanation: payload,
        explainatioLoading: false,
      };
    case EXPLAIN_ANSWER_FAIL:
      return {
        ...state,
        error: payload,
      };
    case START_CHAT_SESSION_SUCCESS:
      return {
        ...state,
        careerBuddyStarted: true,
      };
    case START_CHAT_SESSION_FAIL:
      return {
        ...state,
        error: payload,
      };
    case FETCH_INDIVIDUAL_CHAT_SESSIONS_SUCCESS:
      return {
        ...state,
        individualChatSessions: payload,
        loadingIndividualChatSessions: false,
      };
    case FETCH_INDIVIDUAL_CHAT_SESSIONS_FAIL:
      return {
        ...state,
        error: payload,
      };
    case FETCH_ALL_CHAT_SESSION_SUCCESS:
      return {
        ...state,
        allChatSessions: payload,
        loadingAllChatSessions: false,
      };
    case FETCH_ALL_CHAT_SESSION_FAIL:
      return {
        ...state,
        error: payload,
      };
    default:
      return state;
  }
}
