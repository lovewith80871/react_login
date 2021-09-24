import { combineReducers } from "redux";
import userInfo from "./userInfo";

const loginApp = combineReducers({
  userInfo,
});

export default loginApp;
