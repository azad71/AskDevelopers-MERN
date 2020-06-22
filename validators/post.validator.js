// import dependencies
// load libraries
const validator = require("validator");

// load utility functions
const isEmpty = require("../utils/is-empty");

module.exports = function validatePostInput(data) {
  let errors = {};

  data.text = !isEmpty(data.text) ? data.text : "";

  if (!validator.isLength(data.text, { min: 1 })) {
    errors.text = "Post must be at least 1 characters";
  }

  if (validator.isEmpty(data.text)) {
    errors.text = "Text field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
