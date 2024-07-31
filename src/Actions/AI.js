import axios from "../Utils/axios";
import { baseurl } from "../Actions/Auth";
import { tokenConfig } from "./Auth";
import { returnErrors } from "./Messages";
import { EXPLAIN_ANSWER_SUCCESS, EXPLAIN_ANSWER_FAIL } from "./Types";

export const explainAnswer = (prompt) => (dispatch, getState) => {
  const body = JSON.stringify({ prompt });
  console.log("body", body);
  return axios
    .post(`${baseurl}/api/ai/explain_answers/`, body, tokenConfig(getState))
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
