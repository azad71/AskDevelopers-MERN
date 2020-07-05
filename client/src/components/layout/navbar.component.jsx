import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logOutUser } from "../../redux/auth/auth.actions";
import { clearCurrentProfile } from "../../redux/profile/profile.actions";

import { Container, Navbar, Nav, Image } from "react-bootstrap";

class NavBar extends Component {
  handleLogout = (event) => {
    event.preventDefault();
    console.log(this.props);
    this.props.logOutUser();
    this.props.clearCurrentProfile();
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;

    const authLinks = (
      <>
        <Nav.Link href="/feed">Post Feed</Nav.Link>
        <Nav.Link href="/dashboard">Dashboard</Nav.Link>

        <Nav.Link href="/#" onClick={this.handleLogout}>
          <Image
            roundedCircle={true}
            src={user.avatar}
            alt={user.name}
            style={{ width: "25px", marginRight: "5px" }}
          />
          Logout
        </Nav.Link>
      </>
    );

    const guestLinks = (
      <>
        <Nav.Link href="/signup">Sign up</Nav.Link>
        <Nav.Link href="/login">Login</Nav.Link>
      </>
    );

    return (
      <Navbar expand="lg" bg="dark" variant="dark" sticky="top">
        <Container>
          <Navbar.Brand href="/">AskDevelopers</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/profiles">Developers</Nav.Link>
            </Nav>
            <Nav>{isAuthenticated ? authLinks : guestLinks}</Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}

NavBar.propTypes = {
  logOutUser: PropTypes.func.isRequired,
  clearCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = (dispatch) => ({
  logOutUser: () => dispatch(logOutUser()),
  clearCurrentProfile: () => dispatch(clearCurrentProfile()),
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
