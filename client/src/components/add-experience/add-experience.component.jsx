import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

import InputField from "../common/input-field/input-field.component";
import TextAreaField from "../common/textarea-field/textarea-field.component";
import ButtonLink from "../common/button-link/button-link.component";

import { addExperience } from "../../redux/profile/profile.actions";

class AddExperience extends Component {
  constructor(props) {
    super(props);

    this.state = {
      company: "",
      title: "",
      location: "",
      from: "",
      to: "",
      current: false,
      description: "",
      disabled: false,
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const expData = {
      company: this.state.company,
      title: this.state.title,
      location: this.state.location,
      from: this.state.from,
      to: this.state.to,
      current: this.state.current,
      description: this.state.description,
    };
    this.props.addExperience(expData, this.props.history);
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleCheckboxChange = (event) => {
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
              <ButtonLink to="/dashboard" className="btn btn-primary">
                Go back to Dashboard
              </ButtonLink>
            </div>

            <h1 className="display-4 text-center">Add Experience</h1>
            <p className="lead text-center">
              Add your job or work experience to your profile
            </p>

            <form onSubmit={this.handleSubmit}>
              <InputField
                type="text"
                placeholder="* Company name"
                name="company"
                value={this.state.company}
                handleChange={this.handleChange}
                error={errors.company}
              />

              <InputField
                type="text"
                placeholder="* Job title"
                name="title"
                value={this.state.title}
                handleChange={this.handleChange}
                error={errors.title}
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
                  Currently at this Job
                </label>
              </div>

              <InputField
                type="text"
                placeholder="Location"
                name="location"
                value={this.state.location}
                handleChange={this.handleChange}
                error={errors.location}
              />

              <TextAreaField
                type="text"
                placeholder="Job Description"
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

AddExperience.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  addExperience: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  errors: state.errors,
});

const mapDispatchToProps = (dispatch) => ({
  addExperience: (expData, history) =>
    dispatch(addExperience(expData, history)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AddExperience));
