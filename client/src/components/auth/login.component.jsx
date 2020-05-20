import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { loginUser } from "../../redux/auth/auth.actions";
import InputField from "../common/input-field/input-field.component";

class Login extends Component {
  constructor() {
    super();

    this.state = {
      email: "",
      password: "",
    };
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const userCredentials = {
      email: this.state.email,
      password: this.state.password,
    };

    this.props.loginUser(userCredentials);
  };

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentDidUpdate() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  render() {
    const { errors } = this.props;
    return (
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Log In</h1>
              <p className="lead text-center">
                Login to your AskDevelopers account
              </p>
              <form onSubmit={this.handleSubmit}>
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

Login.protoTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

const mapDispatchToProps = (dispatch) => ({
  loginUser: (userCredentials) => dispatch(loginUser(userCredentials)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));
