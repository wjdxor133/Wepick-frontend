import { combineReducers } from "redux";
import { navPick } from "./navPick";
import { loginCheck } from "./loginCheck";
import { modalOnoff } from "./modalOnoff";
import { profileUpdown } from "./profileUpdown"
import { loginKind } from "./loginKind";

const rootReducer = combineReducers({navPick, loginCheck, modalOnoff, profileUpdown, loginKind});
export default rootReducer;