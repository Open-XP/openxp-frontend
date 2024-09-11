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
  SUBJECT_FETCH_SUCCESS,
  SUBJECT_FETCH_FAIL,
  START_PERSONALIZED_STUDY_SUCCESS,
  START_PERSONALIZED_STUDY_FAIL,
  GENERATED_PERSONAL_NOTE_SUCCESS,
  GENERATED_PERSONAL_NOTE_FAILED,
  FETCH_GENERATED_PERSONAL_NOTES_SUCCESS,
  FETCH_GENERATED_PERSONAL_NOTES_FAIL,
  FLUSH_ALL_AI_SUCCESS,
  FLUSH_ALL_AI_FAIL,
  GENERATED_DATAILED_PERSONALIZE_NOTE_SUCCESS,
  GENERATED_DETAILED_PERSONALIZE_NOTE_FAIL,
  PERSONALIZED_TEST_GENERATED_SUCCESSS,
  PERSONALIZED_TEST_GENERATED_FAIL,
  FETCH_GENERATED_PERSONALIZED_TEST_SUCCESS,
  FETCH_GENERATED_PERSONALIZED_TEST_FAIL,
  SELECTED_ANSWER_SUCCESS,
  SELECTED_ANSWER_FAIL,
  SIMULATED_TEST_COMPLETED_SUCCESS,
  SIMULATED_TEST_COMPLETED_FAIL,
  FETCH_SIMULATED_USER_TEST_SCORE_SUCCESS,
  FETCH_SIMULATED_USER_TEST_SCORE_FAIL,
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

export const FetchSelectionSubjectAndTopic = () => (dispatch, getState) => {
  console.log("This endpoint is being hit");

  return axios
    .get(`/api/ai/subjects/`, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: SUBJECT_FETCH_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: SUBJECT_FETCH_FAIL,
        payload: { msg: err.response.data, status: err.response.status },
      });
    });
};

export const startPersonalizedStudy =
  (subject, topic, grade, difficulty) => async (dispatch, getState) => {
    const body = JSON.stringify({
      subject,
      topic,
      grade,
      difficulty,
    });

    try {
      const res = await axios.post(
        `/api/ai/generate-learning-content/`,
        body,
        tokenConfig(getState)
      );
      dispatch({
        type: START_PERSONALIZED_STUDY_SUCCESS,
        payload: res.data,
      });
      return res.data;
    } catch (err) {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({ type: START_PERSONALIZED_STUDY_FAIL });
      throw err;
    }
  };

export const generatePersonalizedNotes =
  (id, section_type) => (dispatch, getState) => {
    const body = JSON.stringify({
      id,
      section_type,
    });
    return axios
      .post(`/api/ai/generate-specific-content/`, body, tokenConfig(getState))
      .then((res) =>
        dispatch({
          type: GENERATED_PERSONAL_NOTE_SUCCESS,
          payload: res.data,
        })
      )

      .catch((err) => {
        dispatch(returnErrors(err.response.data, err.response.status));
        dispatch({ type: GENERATED_PERSONAL_NOTE_FAILED });
      });
  };

export const fetchGeneratedPersonalizedNotes = (id) => (dispatch, getState) => {
  return axios
    .get(`/api/ai/generate-learning-content/${id}/`, tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: FETCH_GENERATED_PERSONAL_NOTES_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({ type: FETCH_GENERATED_PERSONAL_NOTES_FAIL });
      throw err;
    });
};

export const flushAllAIStates = () => (dispatch) => {
  try {
    dispatch({ type: FLUSH_ALL_AI_SUCCESS });
  } catch (error) {
    dispatch({
      type: FLUSH_ALL_AI_FAIL,
    });
  }
};

export const GenerateDetailedPersonalizedNotes =
  (id, learning_objective_key) => (dispatch, getState) => {
    const body = JSON.stringify({ id, learning_objective_key });
    return axios
      .post(`/api/ai/generate-detailed-note/`, body, tokenConfig(getState))
      .then((res) => {
        dispatch({
          type: GENERATED_DATAILED_PERSONALIZE_NOTE_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch(returnErrors(err.response.data, err.response.status));
        dispatch({ type: GENERATED_DETAILED_PERSONALIZE_NOTE_FAIL });
      });
  };

export const generatePersonalizedTestQuestion =
  (subject, topic, num_questions, difficulty) => async (dispatch, getState) => {
    const body = JSON.stringify({
      subject,
      topic,
      num_questions,
      difficulty,
    });
    try {
      const res = await axios.post(
        `/api/ai/generate-questions-create-test/`,
        body,
        tokenConfig(getState)
      );
      dispatch({
        type: PERSONALIZED_TEST_GENERATED_SUCCESSS,
        payload: res.data,
      });
      return res.data;
    } catch (err) {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({ type: PERSONALIZED_TEST_GENERATED_FAIL });
      throw err;
    }
  };

export const fetchGeneratedPersonalizedTestQuestions =
  (id) => (dispatch, getState) => {
    return axios
      .get(`/api/ai/generated-test-instance/${id}/`, tokenConfig(getState))
      .then((res) =>
        dispatch({
          type: FETCH_GENERATED_PERSONALIZED_TEST_SUCCESS,
          payload: res.data,
        })
      )
      .catch((err) => {
        dispatch(returnErrors(err.response.data, err.response.status));
        dispatch({ type: FETCH_GENERATED_PERSONALIZED_TEST_FAIL });
        throw err;
      });
  };

export const submitPersonalizedTestAnswers =
  (test_instance_id, question_id, selected_option) => (dispatch, getState) => {
    const body = JSON.stringify({
      test_instance: test_instance_id,
      question: question_id,
      selected_option: selected_option,
    });
    axios
      .post(`/api/ai/submit-answer/`, body, tokenConfig(getState))
      .then((res) =>
        dispatch({
          type: SELECTED_ANSWER_SUCCESS,
          payload: res.data,
        })
      )
      .catch((err) => {
        dispatch(returnErrors(err.response.data, err.response.status));
        dispatch({ type: SELECTED_ANSWER_FAIL });
      });
  };

export const completeSimulatedTest =
  (test_instance_id) => (dispatch, getState) => {
    const requestBody = JSON.stringify({
      test_instance_id,
    });

    axios
      .post(
        `/api/ai/complete-simulated-test/`,
        requestBody,
        tokenConfig(getState)
      )
      .then((res) => {
        dispatch({
          type: SIMULATED_TEST_COMPLETED_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch(returnErrors(err.response.data, err.response.status));
        dispatch({
          type: SIMULATED_TEST_COMPLETED_FAIL,
        });
      });
  };

export const fetchSimulatedTestUserScore = (id) => (dispatch, getState) => {
  axios
    .get(`/api/ai/fetch-test-results/${id}/`, tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: FETCH_SIMULATED_USER_TEST_SCORE_SUCCESS,
        payload: res.data, // Assuming you'll want to use the data returned from the response
      })
    )
    .catch((err) => {
      // Check if err.response exists before trying to access err.response.data
      if (err.response) {
        dispatch(returnErrors(err.response.data, err.response.status));
      } else {
        dispatch(
          returnErrors({ message: "An unexpected error occurred" }, 500)
        );
      }
      dispatch({ type: FETCH_SIMULATED_USER_TEST_SCORE_FAIL });
      throw err; // If you need to propagate the error
    });
};
