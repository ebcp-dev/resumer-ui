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
      <div className="landing uk-height-medium uk-panel uk-flex uk-flex-center uk-flex-middle uk-child-width-1-2@m">
        <div className="uk-inline">
          <div className="uk-overlay uk-overlay-default uk-position-center">
            <h1 className="uk-text-lead">Resumer</h1>
            <p className="uk-text-small">Keep track of your job applications</p>
            <hr />
            <p uk-margin="true">
              <Link to="/register">
                <button className="uk-button uk-button-secondary">
                  Sign Up
                </button>
              </Link>{' '}
              <Link to="/login">
                <button className="uk-button uk-button-secondary">Login</button>
              </Link>
            </p>
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
