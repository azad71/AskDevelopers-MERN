import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";

import InputField from "../common/input-field/input-field.component";
import TextAreaField from "../common/textarea-field/textarea-field.component";

import { addEducation } from "../../redux/profile/profile.actions";

class AddEducation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      school: "",
      degree: "",
      fieldOfStudy: "",
      from: "",
      to: "",
      current: false,
      description: "",
      disabled: false,
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const educationData = {
      school: this.state.school,
      degree: this.state.degree,
      fieldOfStudy: this.state.fieldOfStudy,
      from: this.state.from,
      to: this.state.to,
      current: this.state.current,
      description: this.state.description,
    };
    this.props.addEducation(educationData, this.props.history);
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleCheckboxChange = () => {
    this.setState({
      current: !this.state.current,
      disabled: !this.state.disabled,
      to: "",
    });
  };

  render() {
    const { errors } = this.props;

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <div style={{ margin: "20px 0" }}>
              <Link to="/dashboard" className="btn btn-primary">
                Go back to Dashboard
              </Link>
            </div>

            <h1 className="display-4 text-center">Add Education</h1>
            <p className="lead text-center">
              Add any school or bootcamp you've attended to your profile
            </p>

            <form onSubmit={this.handleSubmit}>
              <InputField
                type="text"
                placeholder="* Instituition name"
                name="school"
                value={this.state.school}
                handleChange={this.handleChange}
                error={errors.school}
              />

              <InputField
                type="text"
                placeholder="* Degree or Certificate"
                name="degree"
                value={this.state.degree}
                handleChange={this.handleChange}
                error={errors.degree}
              />

              <InputField
                type="text"
                placeholder="* Field of Study"
                name="fieldOfStudy"
                value={this.state.fieldOfStudy}
                handleChange={this.handleChange}
                error={errors.fieldOfStudy}
              />

              <h6>* From Date</h6>
              <InputField
                type="date"
                name="from"
                value={this.state.from}
                handleChange={this.handleChange}
                error={errors.from}
              />

              <h6>To Date</h6>
              <InputField
                type="date"
                name="to"
                value={this.state.to}
                handleChange={this.handleChange}
                error={errors.to}
                disabled={this.state.disabled ? "disabled" : ""}
              />

              <div className="form-check mb-4">
                <input
                  name="current"
                  value={this.state.current}
                  onChange={this.handleCheckboxChange}
                  id="current"
                  type="checkbox"
                  className="form-check-input"
                />
                <label htmlFor="current" className="form-check-label">
                  Currently Studying here
                </label>
              </div>

              <TextAreaField
                type="text"
                placeholder="Write something about your instituition and degree"
                name="description"
                value={this.state.description}
                handleChange={this.handleChange}
                error={errors.description}
              />

              <input
                type="submit"
                value="Submit"
                className="btn btn-primary btn-block my-4"
              />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

AddEducation.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  addEducation: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  errors: state.errors,
});

const mapDispatchToProps = (dispatch) => ({
  addEducation: (educationData, history) =>
    dispatch(addEducation(educationData, history)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AddEducation));
