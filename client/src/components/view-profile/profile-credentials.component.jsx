import React from "react";

import dateFormat from "../../utils/dateFormat";

const ProfileCredentials = ({ educations, experiences }) => {
  const expItems = experiences.map((exp) => (
    <li key={exp._id} className="list-group-item">
      <h4>{exp.company}</h4>
      <p>
        {dateFormat(exp.from)} - {dateFormat(exp.to)}
      </p>

      <p>
        <strong>Position: </strong>
        {exp.title}
      </p>

      <p>
        {exp.location === "" ? null : (
          <span>
            <strong>Location: </strong>
            {exp.location}
          </span>
        )}
      </p>

      <p>
        {exp.description === "" ? null : (
          <span>
            <strong>Description: </strong>
            {exp.description}
          </span>
        )}
      </p>
    </li>
  ));

  const eduItems = educations.map((ed) => (
    <li key={ed._id} className="list-group-item">
      <h4>{ed.school}</h4>
      <p>
        {dateFormat(ed.from)} - {dateFormat(ed.to)}
      </p>

      <p>
        <strong>Degree: </strong>
        {ed.degree}
      </p>

      <p>
        <strong>Field of Study: </strong>
        {ed.fieldOfStudy}
      </p>

      <p>
        {ed.location === "" ? null : (
          <span>
            <strong>Location: </strong>
            {ed.location}
          </span>
        )}
      </p>

      <p>
        {ed.description === "" ? null : (
          <span>
            <strong>Description: </strong>
            {ed.description}
          </span>
        )}
      </p>
    </li>
  ));

  return (
    <div className="row">
      <div className="col-md-6">
        {experiences.length > 0 ? (
          <>
            <h3 className="text-center text-info">Experiences</h3>
            <ul className="list-group">{expItems}</ul>
          </>
        ) : null}
      </div>
      <div className="col-md-6">
        {educations.length > 0 ? (
          <>
            <h3 className="text-center text-info">Educations</h3>
            <ul className="list-group">{eduItems}</ul>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default ProfileCredentials;
