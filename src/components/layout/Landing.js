import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

import '../../css/components/layout/Landing.css';

class Landing extends Component {
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }

  render() {
    return (
      <div>
        <div className="uk-section-default">
          <div
            className="landing uk-section uk-dark uk-background-fixed"
            uk-parallax="bgy: -50"
          >
            <div className="uk-container uk-flex uk-flex-center uk-flex-middle uk-child-width-1-2@s">
              <div className="uk-card uk-card-default uk-card-large uk-card-body uk-text-center">
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
            </div>
          </div>
        </div>
        <div className="uk-section-default">
          <div className="uk-section uk-dark uk-background-muted">
            <div className="uk-container">
              <div className="uk-text-center">
                <p>
                  Keep track of your job applications by adding job links to
                  your collection and mark them by their status.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="uk-section-default">
          <div className="uk-section uk-background-default">
            <div className="uk-container">
              <div className="uk-text-center">
                <p>Get statistical data based on your job applications.</p>
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
