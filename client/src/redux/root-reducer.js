import { combineReducers } from "redux";
import authReducer from "./auth/auth.reducer";
import errorReducer from "./errors/error.reducer";
import profileReducer from "./profile/profile.reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  errors: errorReducer,
  profile: profileReducer,
});

export default rootReducer;
