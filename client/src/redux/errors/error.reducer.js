import errorTypes from "./errors.types";

const INITIAL_STATE = {};

const errorReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case errorTypes.SIGN_UP_FAILURE:
    case errorTypes.SIGN_IN_FAILURE:
    case errorTypes.GET_PROFILES_FAILURE:
    case errorTypes.GET_PROFILE_FAILURE:
    case errorTypes.CREATE_PROFILE_FAILURE:
    case errorTypes.ADD_EXPERIENCE_FAILURE:
    case errorTypes.ADD_EDUCATION_FAILURE:
    case errorTypes.ADD_POST_FAILURE:
    case errorTypes.DELETE_POST_FAILURE:
    case errorTypes.ADD_LIKE_FAILURE:
    case errorTypes.REMOVE_LIKE_FAILURE:
    case errorTypes.ADD_COMMENT_FAILURE:
    case errorTypes.DELETE_COMMENT_FAILURE:
      return action.payload;

    case errorTypes.CLEAR_ERROR_MESSAGE:
      return {};
    default:
      return state;
  }
};

export default errorReducer;
