import axios from "axios";
import postTypes from "./post.types";
import errorTypes from "../errors/errors.types";

export const addPost = (postData) => (dispatch) => {
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
