import { createSelector } from "reselect";

const profile = (state) => state.profile;

export const selectProfile = createSelector(
  [profile],
  (profile) => profile.profile
);

export const selectExperiences = createSelector(
  [selectProfile],
  (profileExperiences) => profileExperiences.experience
);

export const selectEducation = createSelector(
  [selectProfile],
  (profileEducation) => profileEducation.education
);
