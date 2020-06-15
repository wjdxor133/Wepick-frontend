import { combineReducers } from "redux";
import { navPick } from "./navPick";
import { loginCheck } from "./loginCheck";
import { modalOnoff } from "./modalOnoff";
import { profileUpdown } from "./profileUpdown"

const rootReducer = combineReducers({navPick, loginCheck, modalOnoff, profileUpdown});
export default rootReducer;