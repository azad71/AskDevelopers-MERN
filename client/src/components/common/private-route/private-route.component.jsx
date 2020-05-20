import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";

const PrivateRoute = ({ component: Component, auth, ...otherProps }) => (
  <Route
    render={(props) =>
      auth.isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
    }
    {...otherProps}
  />
);

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoute);
