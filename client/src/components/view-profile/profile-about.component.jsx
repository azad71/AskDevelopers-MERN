import React from "react";

import isEmpty from "../../utils/is-empty";

const ProfileAbout = ({ profile }) => {
  const firstName = profile.user.name.split(" ")[0];
  const skills = profile.skills.map((skill, idx) => (
    <div key={idx} className="p-3">
      <i className="fa fa-check" /> {skill}
    </div>
  ));

  return (
    <div className="row">
      <div className="col-md-12">
        <div className="card card-body bg-light mb-3">
          {isEmpty(profile.bio) ? null : (
            <>
              {" "}
              <h3 className="text-center text-info">{firstName}'s Bio</h3>
              <p className="lead">{profile.bio}</p>
              <hr />{" "}
            </>
          )}

          <h3 className="text-center text-info">Skill Set</h3>
          <div className="row">
            <div className="d-flex flex-wrap justify-content-center align-items-center">
              {skills}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileAbout;
