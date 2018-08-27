import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

import '../../css/pages/Layout.css';

class Landing extends Component {
  render() {
    const { user, isAuthenticated } = this.props.auth;
    return (
      <div className="landing uk-section-default">
        <div className="uk-container uk-flex uk-flex-center uk-flex-middle  uk-child-width-1-2@s">
          <div className="uk-card uk-card-default uk-card-large uk-card-body uk-text-center welcome-card uk-light">
            <div className="uk-card-media-top">
              <img
                src="./resumer-logo.png"
                height="150px"
                width="150px"
                alt="Resumer logo"
              />
            </div>
            {isAuthenticated === true ? (
              <div>
                <h3>Welcome {user.email}</h3>
                <p>Keep track of your job applications</p>
                <Link to="/dashboard">
                  <button className="uk-button uk-button-secondary">
                    Get started
                  </button>
                </Link>
              </div>
            ) : (
              <div>
                <h3>Welcome to Resumer</h3>
                <p>Manage and keep track of your job applications</p>
                <Link to="/login">
                  <button className="uk-button uk-button-secondary">
                    Login
                  </button>
                </Link>
                <Link to="/login">
                  <button className="uk-button uk-button-secondary">
                    Sign Up
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

Landing.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Landing);
