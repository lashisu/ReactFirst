import { combineReducers } from "redux";
import alert from "./alert.reducer";
import session from "./session.reducer";
export default combineReducers({
  alert,
  session
});
