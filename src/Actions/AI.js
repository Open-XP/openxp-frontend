import axios from "../Utils/axios";
import { returnErrors } from "./Messages";
import { EXPLAIN_ANSWER_SUCCESS, EXPLAIN_ANSWER_FAIL } from "./Types";

export const explainAnswer = (question) => (dispatch) => {
  const body = JSON.stringify({ question });
  axios
    .post(`${baseurl}/api/ai/explain-answer/`, body, tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: EXPLAIN_ANSWER_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({ type: EXPLAIN_ANSWER_FAIL });
    });
};
