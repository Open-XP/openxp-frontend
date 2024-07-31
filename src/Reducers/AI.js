import { EXPLAIN_ANSWER_SUCCESS, EXPLAIN_ANSWER_FAIL } from "../Actions/Types";

const initialState = {
  explanation: [],
  error: {},
  explainatioLoading: true,
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
    default:
      return state;
  }
}
