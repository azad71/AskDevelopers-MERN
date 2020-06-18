import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import {
  getCurrentProfile,
  deleteAccount,
} from "../../redux/profile/profile.actions";

import Spinner from "../common/spinner/spinner.component";
import ShowExperience from "../show-experience/show-experience.component";
import ShowEducation from "../show-education/show-education.component";
import ButtonLink from "../common/button-link/button-link.component";

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  handleDeleteAccount = () => {
    this.props.deleteAccount();
  };

  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;

    let dashboardContent;

    if (profile === null || loading) {
      dashboardContent = <Spinner />;
    } else {
      if (Object.keys(profile).length > 0) {
        dashboardContent = (
          <div>
            <p className="lead text-muted">
              Welcome <Link to={`/profile/${profile.handle}`}>{user.name}</Link>
            </p>

            <div className="mb-4">
              <ButtonLink
                to="/edit-profile"
                className="btn btn-light mx-2"
                icon="fa fa-user-circle text-info"
              >
                Edit Profile
              </ButtonLink>

              <ButtonLink
                to="/add-education"
                className="btn btn-light mx-2"
                icon={"fa fa-graduation-cap text-info "}
              >
                Add Education
              </ButtonLink>

              <ButtonLink
                to="/add-experience"
                className="btn btn-light mx-2"
                icon={"fa fa-gear text-info"}
              >
                Add Experience
              </ButtonLink>
            </div>

            {profile.experience.length > 0 ? (
              <>
                <ShowExperience experiences={profile.experience} />
                <div style={{ margin: "50px 0" }}>
                  <p style={{ borderBottom: "1px solid black" }}></p>
                </div>
              </>
            ) : (
              ""
            )}

            {profile.education.length > 0 ? (
              <ShowEducation educations={profile.education} />
            ) : (
              ""
            )}

            <div style={{ marginBottom: "60px" }}></div>

            <button
              className="btn btn-danger"
              onClick={this.handleDeleteAccount}
            >
              Delete My Account
            </button>
          </div>
        );
      } else {
        // user is authenticated but has no profile
        dashboardContent = (
          <div>
            <p className="lead text-muted">Welcome {user.name}</p>
            <p>You haven't yet setup a profile, please add some info </p>
            <Link to="/create-profile" className="btn btn-lg btn-primary">
              Create Profile
            </Link>
          </div>
        );
      }
    }

    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12 mx-auto">
              <h1 className="display-4 py-3">Dashboard</h1>
              {dashboardContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

const mapDispatchToProps = (dispatch) => ({
  getCurrentProfile: () => dispatch(getCurrentProfile()),
  deleteAccount: () => dispatch(deleteAccount()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
