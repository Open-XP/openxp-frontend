// Auth types
export const GET_ERRORS = "GET_ERRORS";
export const CREATE_MESSAGE = "CREATE_MESSAGE";
export const USER_LOADING = "USER_LOADING";
export const USER_LOADED = "USER_LOADED";
export const AUTH_ERROR = "AUTH_ERROR";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_FAILED = "LOGOUT_FAILED";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAIL = "REGISTER_FAIL";
export const PASSWORD_RESET_SENT = "PASSWORD_RESET_SENT";
export const PASSWORD_RESET_NOT_SENT = "PASSWORD_RESET_NOT_SENT";
export const PASSWORD_RESET_SUCCESS = "PASSWORD_RESET_SUCCESS";
export const PASSWORD_RESET_FAILED = "PASSWORD_RESET_FAIL";
export const TOKEN_REFRESH_SUCCESS = "TOKEN_REFRESH_SUCCESS";
export const TOKEN_REFRESH_FAILED = "TOKEN_REFRESH_FAILED";

export const GET_USER = "GET_USER";

// Quiz types
export const START_TEST_SUCCESS = "START_TEST_SUCCESS";
export const START_TEST_FAIL = "START_TEST_FAIL";
export const SUBMIT_ANSWER_SUCCESS = "SUBMIT_ANSWER_SUCCESS";
export const SUBMIT_ANSWER_FAIL = "SUBMIT_ANSWER_FAIL";
export const COMPLETE_TEST_SUCCESS = "COMPLETE_TEST_SUCCESS";
export const COMPLETE_TEST_FAIL = "COMPLETE_TEST_FAIL";
export const FETCH_COMPLETED_TESTS_SUCCESS = "FETCH_COMPLETED_TESTS_SUCCESS";
export const FETCH_COMPLETED_TESTS_FAIL = "FETCH_COMPLETED_TESTS_FAIL";
export const FETCH_ALL_TEST_INSTANCES_SUCCESS =
  "FETCH_ALL_TEST_INSTANCES_SUCCESS";
export const FETCH_ALL_TEST_INSTANCES_FAIL = "FETCH_ALL_TEST_INSTANCES_FAIL";
export const RETRIEVE_INDIVIDUAL_QUESTION_SUCCESS =
  "RETRIEVE_INDIVIDUAL_QUESTION_SUCCESS";
export const RETRIEVE_INDIVIDUAL_QUESTION_FAIL =
  "RETRIEVE_INDIVIDUAL_QUESTION_FAIL";
export const FETCH_USER_SCORE_SUCCESS = "FETCH_USER_SCORE_SUCCESS";
export const FETCH_USER_SCORE_FAIL = "FETCH_USER_SCORE_FAIL";
export const FETCH_TEST_RESULTS_SUCCESS = "FETCH_TEST_RESULTS_SUCCESS";
export const FETCH_TEST_RESULTS_FAIL = "FETCH_TEST_RESULTS_FAIL";
export const FETCH_TOTAL_STUDY_TIME_SUCCESS = "FETCH_TOTAL_STUDY_TIME_SUCCESS";
export const FETCH_TOTAL_STUDY_TIME_FAIL = "FETCH_TOTAL_STUDY_TIME_FAIL";
export const FETCH_TEST_INSTANCE_SUCCESS = "FETCH_TEST_INSTANCE_SUCCESS";
export const FETCH_TEST_INSTANCE_FAIL = "FETCH_TEST_INSTANCE_FAIL";
export const FETCH_ALL_SUBJECTS_SUCCESS = "FETCH_ALL_SUBJECTS_SUCCESS";
export const FETCH_ALL_SUBJECTS_FAIL = "FETCH_ALL_SUBJECTS_FAIL";
export const FETCH_SUBJECT_QUESTIONS_SUCCESS =
  "FETCH_SUBJECT_QUESTIONS_SUCCESS";
export const FETCH_SUBJECT_QUESTIONS_FAIL = "FETCH_SUBJECT_QUESTIONS_FAIL";
export const FETCH_SUBJECTS_SUCCESS = "FETCH_SUBJECTS_SUCCESS";
export const FETCH_SUBJECTS_FAIL = "FETCH_SUBJECTS_FAIL";
export const FETCH_INDIVIDUAL_SUBJECT_QUESTION_SUCCESS =
  "FETCH_INDIVIDUAL_SUBJECT_QUESTION_SUCCESS";
export const FETCH_INDIVIDUAL_SUBJECT_QUESTION_FAIL =
  "FETCH_INDIVIDUAL_SUBJECT_QUESTION_FAIL";
export const FETCH_GRAPH_DATA_SUCCESS = "FETCH_GRAPH_DATA_SUCCESS";
export const FETCH_GRAPH_DATA_FAIL = "FETCH_GRAPH_DATA_FAIL";

// Schedule types
export const FETCH_ALL_SCHEDULES_SUCCESS = "FETCH_ALL_SCHEDULES_SUCCESS";
export const FETCH_ALL_SCHEDULES_FAIL = "FETCH_ALL_SCHEDULES_FAIL";
export const FETCH_INDIVIDUAL_SCHEDULES_SUCCESS =
  "FETCH_INDIVIDUAL_SCHEDULES_SUCCESS";
export const FETCH_INDIVIDUAL_SCHEDULES_FAIL =
  "FETCH_INDIVIDUAL_SCHEDULES_FAIL";
export const CREATE_SCHEDULE_SUCCESS = "CREATE_SCHEDULE_SUCCESS";
export const CREATE_SCHEDULE_FAIL = "CREATE_SCHEDULE_FAIL";
export const UPDATE_SCHEDULE_SUCCESS = "UPDATE_SCHEDULE_SUCCESS";
export const UPDATE_SCHEDULE_FAIL = "UPDATE_SCHEDULE_FAIL";
export const DELETE_SCHEDULE_SUCCESS = "DELETE_SCHEDULE_SUCCESS";
export const DELETE_SCHEDULE_FAIL = "DELETE_SCHEDULE_FAIL";

// AI types
export const EXPLAIN_ANSWER_SUCCESS = "EXPLAIN_ANSWER_SUCCESS";
export const EXPLAIN_ANSWER_FAIL = "EXPLAIN_ANSWER_FAIL";
export const START_CHAT_SESSION_SUCCESS = "START_CHAT_SESSION_SUCCESS";
export const START_CHAT_SESSION_FAIL = "START_CHAT_SESSION_FAIL";
export const FETCH_INDIVIDUAL_CHAT_SESSIONS_SUCCESS =
  "FETCH_CHAT_SESSIONS_SUCCESS";
export const FETCH_INDIVIDUAL_CHAT_SESSIONS_FAIL = "FETCH_CHAT_SESSIONS_FAIL";
export const FETCH_ALL_CHAT_SESSION_SUCCESS = "FETCH_ALL_CHAT_SESSION_SUCCESS";
export const FETCH_ALL_CHAT_SESSION_FAIL = "FETCH_ALL_CHAT_SESSION_FAIL";
export const CHAT_SENT_SUCCESS = "CHAT_SENT_SUCCESS";
export const CHAT_SENT_FAIL = "CHAT_SENT_FAIL";
export const FETCH_RECOMMENDED_TOPIC_SUCCESS =
  "FETCH_RECOMMENDED_TOPIC_SUCCESS";
export const FETCH_RECOMMENDED_TOPIC_FAIL = "FETCH_RECOMMENDED_TOPIC_FAIL";
export const ASSIGN_CHAT_SESSION_ID = "ASSIGN_CHAT_SESSION_ID";
export const TRIGGER_RELOADING_INDIVIDUAL_CHAT_SESSIONS =
  "TRIGGER_RELOADING_INDIVIDUAL_CHAT_SESSIONS";
export const NO_CHAT_TRIGGER = "NO_CHAT_TRIGGER";
export const CHAT_SESSION_DELETED = "CHAT_SESSION_DELETED";
export const SUBJECT_FETCH_SUCCESS = "SUBJECT_FETCH_SUCCESS";
export const SUBJECT_FETCH_FAIL = "SUBJECT_FETCH_FAIL";
export const START_PERSONALIZED_STUDY_SUCCESS =
  "START_PERSONALIZED_STUDY_SUCCESS";
export const START_PERSONALIZED_STUDY_FAIL = "START_PERSONALIZED_STUDY_FAIL";
export const GENERATED_PERSONAL_NOTE_SUCCESS =
  "GENERATED_PERSONAL_NOTE_SUCCESS";
export const GENERATED_PERSONAL_NOTE_FAILED = "GENERATED_PERSONAL_NOTE_FAILED";
export const FETCH_GENERATED_PERSONAL_NOTES_SUCCESS =
  "FETCH_GENERATED_PERSONAL_NOTES_SUCCESS";
export const FETCH_GENERATED_PERSONAL_NOTES_FAIL =
  "FETCH_GENERATED_PERSONAL_NOTES_FAIL";
export const FLUSH_ALL_AI = "FLUSH_ALL_AI";
export const GENERATED_DATAILED_PERSONALIZE_NOTE_SUCCESS =
  "GENERATED_DATAILED_PERSONALIZE_NOTE_SUCCESS";
export const GENERATED_DETAILED_PERSONALIZE_NOTE_FAIL =
  "GENERATED_DETAILED_PERSONALIZE_NOTE_FAIL";
export const FLUSH_ALL_AI_SUCCESS = "FLUSH_ALL_AI_SUCCESS";
export const FLUSH_ALL_AI_FAIL = "FLUSH_ALL_AI_FAIL";
export const PERSONALIZED_TEST_GENERATED_SUCCESSS =
  "PERSONALIZED_TEST_GENERATED_SUCCESSS";
export const PERSONALIZED_TEST_GENERATED_FAIL =
  "PERSONALIZED_TEST_GENERATED_FAIL";
export const FETCH_GENERATED_PERSONALIZED_TEST_SUCCESS =
  "FETCH_GENERATED_PERSONALIZED_TEST_SUCCESS";
export const FETCH_GENERATED_PERSONALIZED_TEST_FAIL =
  "FETCH_GENERATED_PERSONALIZED_TEST_FAIL";
export const SUBMIT_PERSONALIZED_TEST_ANSWER_SUCCESS =
  "SUBMIT_PERSONALIZED_TEST_ANSWER_SUCCESS";
export const SUBMIT_PERSONALIZED_TEST_ANSWER_FAIL =
  "SUBMIT_PERSONALIZED_TEST_ANSWER_FAIL";
export const SELECTED_ANSWER_SUCCESS = "SELECTED_ANSWER_SUCCESS";
export const SELECTED_ANSWER_FAIL = "SELECTED_ANSWER_FAIL";
export const SIMULATED_TEST_COMPLETED_SUCCESS =
  "SIMULATED_TEST_COMPLETED_SUCCESS";
export const SIMULATED_TEST_COMPLETED_FAIL = "SIMULATED_TEST_COMPLETED_FAIL";
export const FETCH_SIMULATED_USER_TEST_SCORE_SUCCESS =
  "FETCH_SIMULATED_USER_TEST_SCORE_SUCCESS";
export const FETCH_SIMULATED_USER_TEST_SCORE_FAIL =
  "FETCH_SIMULATED_USER_TEST_SCORE_FAIL";

// Persist types
export const PERSIST_STATE_ON_PAGE = "PERSIST_STATE_ON_PAGE";
export const RESET_SPECIFIC_STATE = "RESET_SPECIFIC_STATE";
export const RESET_QUESTIONS_ON_LEAVE_PAGE = "RESET_QUESTIONS_ON_LEAVE_PAGE";
