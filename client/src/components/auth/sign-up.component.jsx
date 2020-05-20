import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { signUpUser } from "../../redux/auth/auth.actions";
import InputField from "../common/input-field/input-field.component";

class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
    };
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
    };
    this.props.signUpUser(newUser, this.props.history);
  };

  render() {
    const { errors } = this.props;

    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 mx-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">
                Create your AskDevelopers account
              </p>
              <form onSubmit={this.handleSubmit}>
                <InputField
                  type="name"
                  name="name"
                  placeholder="Name"
                  value={this.state.name}
                  handleChange={this.handleChange}
                  error={errors.name}
                />

                <InputField
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={this.state.email}
                  handleChange={this.handleChange}
                  error={errors.email}
                />

                <InputField
                  type="password"
                  name="password"
                  placeholder="Password must be at least 6 characters"
                  value={this.state.password}
                  handleChange={this.handleChange}
                  error={errors.password}
                />

                <InputField
                  type="password"
                  name="password2"
                  placeholder="Confirm password"
                  value={this.state.password2}
                  handleChange={this.handleChange}
                  error={errors.password2}
                />

                <input
                  type="submit"
                  className="btn btn-primary btn-block mt-5"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

SignUp.protoTypes = {
  signUpUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

const mapDispatchToProps = (dispatch) => ({
  signUpUser: (user, history) => dispatch(signUpUser(user, history)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SignUp));
