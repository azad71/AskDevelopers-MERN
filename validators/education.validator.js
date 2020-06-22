// import dependencies
// load libraries
const validator = require("validator");

// load utility functions
const isEmpty = require("../utils/is-empty");

module.exports = function validateEducationInput(data) {
  let errors = {};

  data.school = !isEmpty(data.school) ? data.school : "";
  data.degree = !isEmpty(data.degree) ? data.degree : "";
  data.fieldOfStudy = !isEmpty(data.fieldOfStudy) ? data.fieldOfStudy : "";
  data.from = !isEmpty(data.from) ? data.from : "";

  if (validator.isEmpty(data.school)) {
    errors.school = "Name of instituition field is required";
  }

  if (validator.isEmpty(data.degree)) {
    errors.degree = "Name of degree field is required";
  }

  if (validator.isEmpty(data.fieldOfStudy)) {
    errors.fieldOfStudy = "Field of study is required";
  }

  if (validator.isEmpty(data.from)) {
    errors.from = "Starting date field is required";
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
};
