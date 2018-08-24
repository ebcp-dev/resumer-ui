import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

import '../../css/components/Layout.css';

class Landing extends Component {
  render() {
    const { user, isAuthenticated } = this.props.auth;
    return (
      <div>
        <div className="uk-section-default">
          <div
            className="landing uk-section uk-dark uk-background-fixed"
            uk-parallax="bgy: -50"
          >
            <div className="uk-container uk-flex uk-flex-center uk-flex-middle uk-child-width-1-2@s">
              <div className="uk-card uk-card-default uk-card-large uk-card-body uk-text-center welcome-card">
                {isAuthenticated === true ? (
                  <div className="uk-light">
                    <h3 className="uk-card-title">Welcome {user.email}</h3>
                    <p>Keep track of your job applications</p>
                    <Link to="/dashboard">
                      <button className="uk-button uk-button-secondary">
                        Get started
                      </button>
                    </Link>
                  </div>
                ) : (
                  <div className="uk-dark">
                    <h3 className="uk-card-title">Welcome to Resumer</h3>
                    <p>Keep track of your job applications</p>
                    <div className="uk-grid uk-grid-item-match" uk-grid="true">
                      <div>
                        <Link to="/register">
                          <button className="uk-button uk-button-secondary">
                            Sign Up
                          </button>
                        </Link>
                      </div>
                      <div>
                        <Link to="/login">
                          <button className="uk-button uk-button-secondary">
                            Login
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
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
