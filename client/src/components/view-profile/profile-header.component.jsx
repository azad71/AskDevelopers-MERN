import React from "react";
import PropTypes from "prop-types";

import isEmpty from "../../utils/is-empty";

import ProfileLink from "./profile-link.component";

const ProfileHeader = ({ profile }) => {
  return (
    <div className="row">
      <div className="col-md-8 m-auto">
        <div className="card card-body  mb-3">
          <div className="row">
            <div className="col-4 col-md-3 m-auto">
              <img
                className="rounded-circle"
                src={profile.user.avatar}
                alt="profile avatar"
              />
            </div>
          </div>
          <div className="text-center">
            <h1 className="display-4 text-center">{profile.user.name}</h1>
            <p className="lead text-center">
              {profile.status}{" "}
              {isEmpty(profile.company) ? null : (
                <span>at {profile.company}</span>
              )}{" "}
            </p>

            {isEmpty(profile.location) ? null : <p>{profile.location}</p>}

            <p>
              {isEmpty(profile.website) ? null : (
                <ProfileLink href={profile.website} icon="fa fa-globe fa-2x" />
              )}

              {isEmpty(profile.social && profile.social.twitter) ? null : (
                <ProfileLink
                  href={profile.social.twitter}
                  icon="fa fa-twitter fa-2x"
                />
              )}

              {isEmpty(profile.social && profile.social.facebook) ? null : (
                <ProfileLink
                  href={profile.social.facebook}
                  icon="fa fa-facebook fa-2x"
                />
              )}

              {isEmpty(profile.social && profile.social.linkedin) ? null : (
                <ProfileLink
                  href={profile.social.linkedin}
                  icon="fa fa-linkedin fa-2x"
                />
              )}

              {isEmpty(profile.social && profile.social.instagram) ? null : (
                <ProfileLink
                  href={profile.social.instagram}
                  icon="fa fa-instagram fa-2x"
                />
              )}

              {isEmpty(profile.social && profile.social.youtube) ? null : (
                <ProfileLink
                  href={profile.social.youtube}
                  icon="fa fa-youtube fa-2x"
                />
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

ProfileHeader.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileHeader;
