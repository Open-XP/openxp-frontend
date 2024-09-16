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
  SUBMIT_PERSONALIZED_TEST_ANSWER_SUCCESS,
  SUBMIT_PERSONALIZED_TEST_ANSWER_FAIL,
  FETCH_SIMULATED_USER_TEST_SCORE_SUCCESS,
  SIMULATED_TEST_COMPLETED_SUCCESS,
  SIMULATED_TEST_COMPLETED_FAIL,
  FETCH_SIMULATED_USER_TEST_SCORE_FAIL,
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
  subjects: [],
  personalStudyID: {},

  generatingPersonalizedLearning: true,
  introduction: null,
  learningObjectives: null,
  learningObjectivesOne: null,
  learningObjectivesTwo: null,
  learningObjectivesThree: null,
  learningObjectivesFour: null,
  learningObjectivesFive: null,
  learningObjectivesSix: null,
  learningObjectivesSeven: null,
  learningObjectivesEight: null,
  learningObjectivesNine: null,
  learningObjectivesTen: null,
  loadingGeneratedPersonalNotes: true,
  generatedTestOption: null,
  generatedTestquestionID: null,
  generatedTestQuestionID: null,
  detailedPersonalizedNote: null,
  loadingDetailedPersonalizedNote: true,
  completedSimulatedTestMesssage: null,
  simulatedTestScore: null,
  simulatedTestCorrect: null,
  simulatedTestIncorrect: null,
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
    case CHAT_SESSION_DELETED:
      return {
        ...state,
        loadingIndividualChatSessions: true,
        careerBuddyStarted: false,
      };
    case SUBJECT_FETCH_SUCCESS:
      return {
        ...state,
        subjects: payload,
        loading: false,
      };
    case SUBJECT_FETCH_FAIL:
      return {
        ...state,
        error: payload,
      };
    case START_PERSONALIZED_STUDY_SUCCESS:
      return {
        ...state,
        personalStudyID: payload.id,
        selectSubject: payload.subject,
        selectedTopic: payload.topic,
        loading: false,
      };
    case START_PERSONALIZED_STUDY_FAIL:
      return {
        ...state,
        error: payload,
      };
    case GENERATED_PERSONAL_NOTE_SUCCESS:
      return {
        ...state,
        generatingPersonalizedLearning: false,
        introduction: payload.introduction,
        // introduction: payload.introduction,
        learningObjectives: payload.learning_objectives,
      };
    case GENERATED_PERSONAL_NOTE_FAILED:
      return {
        ...state,
        error: payload,
      };
    case FETCH_GENERATED_PERSONAL_NOTES_SUCCESS:
      return {
        ...state,
        introduction: payload.introduction,
        learningObjectives: payload.learning_objectives,
        loadingGeneratedPersonalNotes: false,
      };
    case FETCH_GENERATED_PERSONAL_NOTES_FAIL:
      return {
        ...state,
        error: payload,
      };
    case FLUSH_ALL_AI_SUCCESS:
      return {
        ...state,
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
        subjects: [],
        personalStudyID: {},
        generatingPersonalizedLearning: true,
        introduction: null,
        learningObjectives: null,
        learningObjectivesOne: null,
        learningObjectivesTwo: null,
        learningObjectivesThree: null,
        learningObjectivesFour: null,
        learningObjectivesFive: null,
        learningObjectivesSix: null,
        learningObjectivesSeven: null,
        learningObjectivesEight: null,
        learningObjectivesNine: null,
        learningObjectivesTen: null,
        loadingGeneratedPersonalNotes: true,
      };
    case FLUSH_ALL_AI_FAIL:
      return {
        ...state,
        error: payload,
      };
    case GENERATED_DATAILED_PERSONALIZE_NOTE_SUCCESS:
      return {
        ...state,
        learningObjectivesOne:
          payload.detailed_learning_body.detailed_learning_objective_1,
        learningObjectivesTwo:
          payload.detailed_learning_body.detailed_learning_objective_2,
        learningObjectivesThree:
          payload.detailed_learning_body.detailed_learning_objective_3,
        learningObjectivesFour:
          payload.detailed_learning_body.detailed_learning_objective_4,
        learningObjectivesFive:
          payload.detailed_learning_body.detailed_learning_objective_5,
        learningObjectivesSix:
          payload.detailed_learning_body.detailed_learning_objective_6,
        learningObjectivesSeven:
          payload.detailed_learning_body.detailed_learning_objective_7,
        learningObjectivesEight:
          payload.detailed_learning_body.detailed_learning_objective_8,
        learningObjectivesNine:
          payload.detailed_learning_body.detailed_learning_objective_9,
        learningObjectivesTen:
          payload.detailed_learning_body.detailed_learning_objective_10,
        loadingDetailedPersonalizedNote: false,
      };
    case GENERATED_DETAILED_PERSONALIZE_NOTE_FAIL:
      return {
        ...state,
        error: payload,
      };
    case PERSONALIZED_TEST_GENERATED_SUCCESSS:
      return {
        ...state,
        generatedTestID: payload.test_instance.id,
        generatedTestScore: payload.test_instance.score,
      };
    case PERSONALIZED_TEST_GENERATED_FAIL:
      return {
        ...state,
        error: payload,
      };
    case FETCH_GENERATED_PERSONALIZED_TEST_SUCCESS:
      return {
        ...state,
        allGeneratedTests: payload,
      };
    case FETCH_GENERATED_PERSONALIZED_TEST_FAIL:
      return {
        ...state,
        error: payload,
      };
    case SUBMIT_PERSONALIZED_TEST_ANSWER_SUCCESS:
      return {
        ...state,
        generatedTestOption: payload.selected_option,
        generatedTestquestionID: payload.test_instance,
        generatedTestQuestionID: payload.question,
      };
    case SUBMIT_PERSONALIZED_TEST_ANSWER_FAIL:
      return {
        ...state,
        error: payload,
      };
    case SIMULATED_TEST_COMPLETED_SUCCESS:
      return {
        ...state,
        completedSimulatedTestMesssage: payload.message,
      };
    case SIMULATED_TEST_COMPLETED_FAIL:
      return {
        ...state,
        error: payload,
      };
    case FETCH_SIMULATED_USER_TEST_SCORE_SUCCESS:
      return {
        ...state,
        simulatedTestScore: payload.score,
        simulatedTestCorrect: payload.correct_questions,
        simulatedTestIncorrect: payload.incorrect_questions,
        loading: false,
      };
    case FETCH_SIMULATED_USER_TEST_SCORE_FAIL:
      return {
        ...state,
        error: payload,
      };
    default:
      return state;
  }
}
