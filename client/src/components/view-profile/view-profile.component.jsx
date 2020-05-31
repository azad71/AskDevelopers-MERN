import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

import { getProfileByHandle } from "../../redux/profile/profile.actions";

import ProfileHeader from "./profile-header.component";
import ProfileCredentials from "./profile-credentials.component";
import ProfileAbout from "./profile-about.component";
import ProfileGithub from "./profile-github.component";
import Spinner from "../common/spinner/spinner.component";
import ButtonLink from "../button-link/button-link.component";

const ViewProfile = ({ match, getProfileByHandle, profile, history }) => {
  useEffect(() => {
    const { handle } = match.params;
    if (handle) {
      getProfileByHandle(handle);
    }
  }, [getProfileByHandle, match.params]);

  useEffect(() => {
    if (profile.profile === null && profile.loading) {
      history.push("/not-found");
    }
  }, [profile, history]);

  const userProfile = profile.profile;
  const loading = profile.loading;
  let profileContent;

  if (userProfile === null || loading) {
    profileContent = <Spinner />;
  } else {
    profileContent = (
      <>
        <ButtonLink to="/profiles" className="btn btn-light my-3">
          Back to Profiles
        </ButtonLink>

        <ProfileHeader profile={userProfile} />
        <ProfileAbout profile={userProfile} />
        <ProfileCredentials
          educations={userProfile.education}
          experiences={userProfile.experience}
        />

        {userProfile.githubProfile ? (
          <ProfileGithub username={userProfile.githubProfile} />
        ) : null}
      </>
    );
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">{profileContent}</div>
      </div>
    </div>
  );
};

ViewProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  getProfileByHandle: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

const mapDispatchToProps = (dispatch) => ({
  getProfileByHandle: (handle) => dispatch(getProfileByHandle(handle)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ViewProfile));
