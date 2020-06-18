import React from "react";
import { Link } from "react-router-dom";

const ButtonLink = ({ children, icon, ...otherProps }) => (
  <Link {...otherProps}>
    <i className={icon}></i> {children}
  </Link>
);

export default ButtonLink;
