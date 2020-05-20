import React, { Component } from "react";
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

class ViewProfile extends Component {
  componentDidMount() {
    const { handle } = this.props.match.params;
    if (handle) {
      this.props.getProfileByHandle(handle);
    }
  }
  render() {
    const { profile, loading } = this.props.profile;
    let profileContent;

    if (profile === null || loading) {
      profileContent = <Spinner />;
    } else {
      profileContent = (
        <>
          <ButtonLink to="/profiles" className="btn btn-light my-3">
            Back to Profiles
          </ButtonLink>

          <ProfileHeader profile={profile} />
          <ProfileAbout profile={profile} />
          <ProfileCredentials
            educations={profile.education}
            experiences={profile.experience}
          />

          <ProfileGithub />
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
  }
}

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
