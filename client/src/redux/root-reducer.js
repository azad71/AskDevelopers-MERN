import { combineReducers } from "redux";
import authReducer from "./auth/auth.reducer";
import errorReducer from "./errors/error.reducer";
import profileReducer from "./profile/profile.reducer";
import postReducer from "./post/post.reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  errors: errorReducer,
  profile: profileReducer,
  post: postReducer,
});

export default rootReducer;
