import React from "react";
import PropTypes from "prop-types";

const SelectField = ({ handleChange, error, options, ...otherProps }) => {
  const selectOptions = options.map((option) => (
    <option key={option.label} value={option.value}>
      {option.label}
    </option>
  ));
  return (
    <div className="form-group">
      <select
        {...otherProps}
        className={`${error ? "is-invalid" : ""} form-control form-control-lg`}
        onChange={handleChange}
      >
        {selectOptions}
      </select>
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

SelectField.propTypes = {
  error: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
};

export default SelectField;
