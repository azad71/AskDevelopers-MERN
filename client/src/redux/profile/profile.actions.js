import axios from "axios";

import profileTypes from "./profile.types";
import errorTypes from "../errors/errors.types";
import authTypes from "../auth/auth.types";

export const setProfileLoading = () => {
  return {
    type: profileTypes.PROFILE_LOADING,
  };
};

export const getCurrentProfile = () => (dispatch) => {
  dispatch(setProfileLoading());

  axios
    .get("/api/profile")
    .then((res) => {
      dispatch({
        type: profileTypes.GET_PROFILE,
        payload: res.data,
      });
    })
    .catch((error) =>
      dispatch({
        type: profileTypes.GET_PROFILE,
        payload: {},
      })
    );
};

export const clearCurrentProfile = () => {
  return {
    type: profileTypes.CLEAR_CURRENT_PROFILE,
  };
};

export const createProfile = (profileData, history) => (dispatch) => {
  axios
    .post("/api/profile", profileData)
    .then((res) => history.push("/dashboard"))
    .catch((error) =>
      dispatch({
        type: errorTypes.CREATE_PROFILE_FAILURE,
        payload: error.response.data,
      })
    );
};

export const deleteAccount = () => (dispatch) => {
  if (
    window.confirm("Once you click ok, this can't be undone. Are you sure?")
  ) {
    axios
      .delete("/api/profile")
      .then((res) =>
        dispatch({
          type: authTypes.SET_CURRENT_USER,
          payload: {},
        })
      )
      .catch((error) =>
        dispatch({
          type: errorTypes.DELETE_PROFILE_FAILURE,
          payload: error.response.data,
        })
      );
  }
};

export const addExperience = (expData, history) => (dispatch) => {
  axios
    .post("/api/profile/experience", expData)
    .then((res) => history.push("/dashboard"))
    .catch((error) =>
      dispatch({
        type: errorTypes.ADD_EXPERIENCE_FAILURE,
        payload: error.response.data,
      })
    );
};

export const addEducation = (educationData, history) => (dispatch) => {
  axios
    .post("/api/profile/education", educationData)
    .then((res) => history.push("/dashboard"))
    .catch((error) =>
      dispatch({
        type: errorTypes.ADD_EDUCATION_FAILURE,
        payload: error.response.data,
      })
    );
};

export const deleteEducation = (id) => (dispatch) => {
  axios
    .delete(`/api/profile/education/${id}`)
    .then((res) =>
      dispatch({
        type: profileTypes.GET_PROFILE,
        payload: res.data,
      })
    )
    .catch((error) =>
      dispatch({
        type: errorTypes.DELETE_EDUCATION_FAILURE,
        payload: error.response.data,
      })
    );
};

export const deleteExperience = (id) => (dispatch) => {
  axios
    .delete(`/api/profile/experience/${id}`)
    .then((res) =>
      dispatch({
        type: profileTypes.GET_PROFILE,
        payload: res.data,
      })
    )
    .catch((error) =>
      dispatch({
        type: errorTypes.DELETE_EXPERIENCE_FAILURE,
        payload: error.response.data,
      })
    );
};

export const getProfiles = () => (dispatch) => {
  dispatch(setProfileLoading());
  axios
    .get("/api/profile/all")
    .then((res) =>
      dispatch({
        type: profileTypes.GET_PROFILES,
        payload: res.data,
      })
    )
    .catch((error) =>
      dispatch({
        type: profileTypes.GET_PROFILES,
        payload: null,
      })
    );
};

export const getProfileByHandle = (handle) => (dispatch) => {
  dispatch(setProfileLoading());
  axios
    .get(`/api/profile/handle/${handle}`)
    .then((res) =>
      dispatch({
        type: profileTypes.GET_PROFILE,
        payload: res.data,
      })
    )
    .catch((error) =>
      dispatch({
        type: profileTypes.GET_PROFILE,
        payload: null,
      })
    );
};
