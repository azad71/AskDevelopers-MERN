import isEmpty from "../../utils/is-empty";

import authTypes from "./auth.types";

const INITIAL_STATE = {
  isAuthenticated: false,
  user: {},
};

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case authTypes.SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload,
      };

    default:
      return state;
  }
};

export default authReducer;
