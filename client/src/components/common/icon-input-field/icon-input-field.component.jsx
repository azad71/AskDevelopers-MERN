import React from "react";
import PropTypes from "prop-types";

const IconInputField = ({ handleChange, error, icon, ...otherProps }) => {
  return (
    <div className="input-group mb-3">
      <div className="input-group-prepend">
        <span className="input-group-text">
          <i className={icon}></i>
        </span>
      </div>
      <input
        {...otherProps}
        className={`${error ? "is-invalid" : ""} form-control form-control-lg`}
        onChange={handleChange}
      />

      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

IconInputField.propTypes = {
  error: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  icon: PropTypes.string,
};

export default IconInputField;
