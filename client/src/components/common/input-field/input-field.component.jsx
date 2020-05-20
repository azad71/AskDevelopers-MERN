import React from "react";
import PropTypes from "prop-types";

const InputField = ({ handleChange, error, info, ...otherProps }) => {
  return (
    <div className="form-group">
      <input
        {...otherProps}
        className={`${error ? "is-invalid" : ""} form-control form-control-lg`}
        onChange={handleChange}
      />
      {info && <small className="form-text text-muted">{info}</small>}
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

InputField.propTypes = {
  // info: PropTypes.string,
  error: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
};

export default InputField;
