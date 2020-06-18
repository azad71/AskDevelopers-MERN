import postTypes from "./post.types";

const INITIAL_STATE = {
  posts: [],
  post: {},
  loading: false,
};

const postReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default postReducer;
