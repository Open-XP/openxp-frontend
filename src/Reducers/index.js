import { combineReducers } from "redux";
import errors from "./Errors";
import messages from "./Messages";
import auth from "./Auth";
import user from "./User";
import quiz from "./Quiz";
import scheduleexam from "./ScheduleExam";
import ai from "./AI";

export default combineReducers({
  errors,
  messages,
  auth,
  user,
  scheduleexam,
  quiz,
  ai,
});
