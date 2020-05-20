import axios from "axios";
import errorTypes from "../errors/errors.types";
import setAuthToken from "../../utils/setAuthToken";

import jwt_decode from "jwt-decode";
import authTypes from "./auth.types";

export const signUpUser = (userData, history) => (dispatch) => {
  axios
    .post("/api/auth/signup", userData)
    .then((res) => history.push("/login"))
    .catch((error) => {
      dispatch({
        type: errorTypes.SIGN_UP_FAILURE,
        payload: error.response.data,
      });
    });
};

export const loginUser = (userData) => (dispatch) => {
  axios
    .post("/api/auth/login", userData)
    .then((res) => {
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      setAuthToken(token);
      const decodedUserData = jwt_decode(token);
      dispatch(setCurrentUser(decodedUserData));
    })
    .catch((error) => {
      console.log(error);
      dispatch({
        type: errorTypes.SIGN_IN_FAILURE,
        payload: error.response.data,
      });
    });
};

export const setCurrentUser = (userData) => {
  return {
    type: authTypes.SET_CURRENT_USER,
    payload: userData,
  };
};

export const logOutUser = () => (dispatch) => {
  localStorage.removeItem("jwtToken");
  setAuthToken(false);
  dispatch(setCurrentUser({}));
};
