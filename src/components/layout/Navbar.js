import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import '../../css/components/layout/Navbar.css';

import { logoutUser } from '../../actions/authActions';
import { clearCurrentProfile } from '../../actions/profileActions';

class Navbar extends Component {
  onLogoutClick(e) {
    e.preventDefault();
    this.props.clearCurrentProfile();
    this.props.logoutUser();
  }

  render() {
    // eslint-disable-next-line
    const { isAuthenticated, user } = this.props.auth;

    const authLinks = (
      <ul className="uk-navbar-nav">
        <li className="uk-active">
          <Link
            className="nav-link"
            to=""
            onClick={this.onLogoutClick.bind(this)}
          >
            Logout
          </Link>
        </li>
      </ul>
    );

    const guestLinks = (
      <ul className="uk-navbar-nav">
        <li className="uk-active">
          <Link className="nav-link" to="/register">
            Sign Up
          </Link>
        </li>
        <li>
          <Link className="nav-link" to="/login">
            Login
          </Link>
        </li>
      </ul>
    );

    return (
      <nav className="navbar uk-navbar-container" uk-navbar="true">
        <div className="uk-navbar-left">
          <ul className="uk-navbar-nav">
            <li className="uk-active">
              {isAuthenticated ? (
                <Link className="nav-link" to="/">
                  Dashboard
                </Link>
              ) : (
                <Link className="nav-link" to="/">
                  DevConnector
                </Link>
              )}
            </li>
            <li>
              <Link className="nav-link" to="/profiles">
                Developers
              </Link>
            </li>
          </ul>
        </div>
        <div className="uk-navbar-right">
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

export default connect(
  mapStateToProps,
  { logoutUser, clearCurrentProfile }
)(Navbar);
