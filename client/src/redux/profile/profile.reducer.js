import profileTypes from "./profile.types";

const INITIAL_STATE = {
  profile: null,
  profiles: null,
  loading: false,
};

const profileReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case profileTypes.PROFILE_LOADING:
      return {
        ...state,
        loading: true,
      };

    case profileTypes.GET_PROFILE:
      return {
        ...state,
        profile: action.payload,
        loading: false,
      };

    case profileTypes.GET_PROFILES:
      return {
        ...state,
        profiles: action.payload,
        loading: false,
      };

    case profileTypes.CLEAR_CURRENT_PROFILE:
      return {
        ...state,
        profile: null,
      };

    default:
      return state;
  }
};

export default profileReducer;
