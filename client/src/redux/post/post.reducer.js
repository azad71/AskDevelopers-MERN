import postTypes from "./post.types";

const INITIAL_STATE = {
  posts: [],
  post: {},
  loading: false,
};

const postReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case postTypes.POST_LOADING:
      return {
        ...state,
        loading: true,
      };

    case postTypes.ADD_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts],
      };

    case postTypes.GET_POSTS:
      return {
        ...state,
        posts: action.payload,
        loading: false,
      };

    case postTypes.GET_POST:
      return {
        ...state,
        post: action.payload,
        loading: false,
      };

    case postTypes.DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload),
      };

    default:
      return state;
  }
};

export default postReducer;
