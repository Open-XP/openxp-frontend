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
} from "../Actions/Types";

const initialState = {
  explanation: [],
  error: {},
  explainatioLoading: true,
  careerBuddyStarted: false,
  loadingIndividualChatSessions: true,
  loadingAllChatSessions: true,
  chatInstanceID: null,
  individualChatSessions: [],
  allChatSessions: [],
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case EXPLAIN_ANSWER_SUCCESS:
      return {
        ...state,
        explanation: action.payload,
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
        chatInstanceID: action.payload.id,
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
        individualChatSessions: action.payload,
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
        allChatSessions: action.payload,
        loadingAllChatSessions: false,
      };
    case FETCH_ALL_CHAT_SESSION_FAIL:
      return {
        ...state,
        error: payload,
      };
    case CHAT_SENT_SUCCESS:
      return {
        ...state,
        chatSentStatus: true,
      };
    case CHAT_SENT_FAIL:
      return {
        ...state,
        error: payload,
      };
    default:
      return state;
  }
}
