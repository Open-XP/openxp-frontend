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
  RecommendedCareerTopics: [],
  loadingRecommendCareerTopics: true,
  chatSentStatus: false,
  chatInstanceID: null,
  UpdatedInstanceID: null,
  noChatTrigger: false,
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
        chatInstanceID: payload.id,
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
    case ASSIGN_CHAT_SESSION_ID:
      return {
        ...state,
        UpdatedInstanceID: payload,
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
    case FETCH_RECOMMENDED_TOPIC_SUCCESS:
      return {
        ...state,
        RecommendedCareerTopics: payload,
        loadingRecommendCareerTopics: false,
      };
    case FETCH_RECOMMENDED_TOPIC_FAIL:
      return {
        ...state,
        error: payload,
      };
    case TRIGGER_RELOADING_INDIVIDUAL_CHAT_SESSIONS:
      return {
        ...state,
        loadingIndividualChatSessions: payload,
      };
    case NO_CHAT_TRIGGER:
      return {
        ...state,
        noChatTrigger: payload,
      };
    default:
      return state;
  }
}
