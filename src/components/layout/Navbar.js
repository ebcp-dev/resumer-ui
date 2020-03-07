import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import '../../css/pages/Layout.css';

import { logoutUser } from '../../actions/authActions';
import { clearCurrentProfile } from '../../actions/profileActions';

class Navbar extends Component {
  onLogoutClick(e) {
    e.preventDefault();
    this.props.clearCurrentProfile();
    this.props.logoutUser();
  }

  render() {
    const { isAuthenticated } = this.props.auth;

    const authLinks = [
      <Link key="0" className="navbar-item" to="/jobs">
        Jobs
      </Link>,
      <Link key="1" to="/profile" className="navbar-item">
        Profile
      </Link>,
      <Link
        key="2"
        to=""
        className="navbar-item"
        onClick={this.onLogoutClick.bind(this)}
      >
        Logout
      </Link>
    ];

    const guestLinks = [
      <Link key="0" to="/signup" className="navbar-item">
        Sign Up
      </Link>,
      <Link key="1" to="/login" className="navbar-item">
        Login
      </Link>
    ];

    return (
      <nav className="navbar is-primary" aria-label="main navigation">
        <div className="navbar-brand">
          <Link to="/" className="navbar-item">
            Resumer
          </Link>
          {isAuthenticated ? authLinks : guestLinks}
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logoutUser, clearCurrentProfile })(
  Navbar
);
