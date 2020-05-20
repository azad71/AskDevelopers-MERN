import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../common/spinner/spinner.component";

import { getProfiles } from "../../redux/profile/profile.actions";

import ProfileItem from "../profile-item/profile-item.component";

class Profiles extends Component {
  componentDidMount() {
    this.props.getProfiles();
  }
  render() {
    const { profile } = this.props;

    let profileItems;
    const { profiles, loading } = profile;

    if (profiles === null || loading) {
      profileItems = <Spinner />;
    } else {
      if (profiles.length > 0) {
        profileItems = profiles.map((profile) => (
          <ProfileItem key={profile._id} profile={profile} />
        ));
      } else {
        profileItems = <h4>No Profile Found...</h4>;
      }
    }

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center display-4">Developers Profile</h1>
            <p className="lead text-center">
              Browse and connect with developers around the world
            </p>
            {profileItems}
          </div>
        </div>
      </div>
    );
  }
}

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

const mapDispatchToProps = (dispatch) => ({
  getProfiles: () => dispatch(getProfiles()),
});
export default connect(mapStateToProps, mapDispatchToProps)(Profiles);
