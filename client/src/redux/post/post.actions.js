import axios from "axios";
import postTypes from "./post.types";
import errorTypes from "../errors/errors.types";

// set post loading
export const setPostLoading = () => {
  return {
    type: postTypes.POST_LOADING,
  };
};

// clear error message
export const clearErrorMessage = () => {
  return {
    type: errorTypes.CLEAR_ERROR_MESSAGE,
  };
};

// add post
export const addPost = (postData) => (dispatch) => {
  dispatch(clearErrorMessage());
  axios
    .post("/api/posts", postData)
    .then((res) =>
      dispatch({
        type: postTypes.ADD_POST,
        payload: res.data,
      })
    )
    .catch((error) =>
      dispatch({
        type: errorTypes.ADD_POST_FAILURE,
        payload: error.response.data,
      })
    );
};

// get posts
export const getPosts = () => (dispatch) => {
  dispatch(setPostLoading());
  axios
    .get("/api/posts")
    .then((res) =>
      dispatch({
        type: postTypes.GET_POSTS,
        payload: res.data,
      })
    )
    .catch((error) =>
      dispatch({
        type: postTypes.GET_POSTS,
        payload: null,
      })
    );
};

// get post
export const getPost = (id) => (dispatch) => {
  dispatch(setPostLoading());
  axios
    .get(`/api/posts/${id}`)
    .then((res) =>
      dispatch({
        type: postTypes.GET_POST,
        payload: res.data,
      })
    )
    .catch((error) =>
      dispatch({
        type: postTypes.GET_POST,
        payload: null,
      })
    );
};

// delete posts
export const deletePost = (id) => (dispatch) => {
  axios
    .delete(`/api/posts/${id}`)
    .then((res) =>
      dispatch({
        type: postTypes.DELETE_POST,
        payload: id,
      })
    )
    .catch((error) =>
      dispatch({
        type: errorTypes.DELETE_POST_FAILURE,
        payload: error.response.data,
      })
    );
};

// add like
export const addLike = (id) => (dispatch) => {
  axios
    .post(`/api/posts/like/${id}`)
    .then((res) => dispatch(getPosts()))
    .catch((error) =>
      dispatch({
        type: errorTypes.ADD_LIKE_FAILURE,
        payload: error.response.data,
      })
    );
};

// remove like
export const removeLike = (id) => (dispatch) => {
  axios
    .post(`/api/posts/unlike/${id}`)
    .then((res) => dispatch(getPosts()))
    .catch((error) =>
      dispatch({
        type: errorTypes.REMOVE_LIKE_FAILURE,
        payload: error.response.data,
      })
    );
};

// add comment
export const addComment = (commentId, commentData) => (dispatch) => {
  dispatch(clearErrorMessage());
  axios
    .post(`/api/posts/comment/${commentId}`, commentData)
    .then((res) =>
      dispatch({
        type: postTypes.GET_POST,
        payload: res.data,
      })
    )
    .catch((error) =>
      dispatch({
        type: errorTypes.ADD_COMMENT_FAILURE,
        payload: error.response.data,
      })
    );
};

// delete comment
export const deleteComment = (commentId, postId) => (dispatch) => {
  axios
    .delete(`/api/posts/${postId}/comment/${commentId}`)
    .then((res) =>
      dispatch({
        type: postTypes.GET_POST,
        payload: res.data,
      })
    )
    .catch((error) =>
      dispatch({
        type: errorTypes.DELETE_COMMENT_FAILURE,
        payload: error.response.data,
      })
    );
};
