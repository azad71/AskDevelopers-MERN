import React from "react";

const ProfileLink = ({ href, icon }) => (
  <a
    href={href}
    target="_blank"
    className="text-dark p-2"
    rel="noopener noreferrer"
  >
    <i className={icon}></i>
  </a>
);

export default ProfileLink;
