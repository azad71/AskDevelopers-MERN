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
      return action.payload;

    default:
      return state;
  }
};

export default errorReducer;
