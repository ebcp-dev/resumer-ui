import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profileActions';

import '../../css/components/dashboard/Dashboard.css';
import LoadingComponent from '../common/LoadingComponent';

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;
    let dashboardContent;

    if (profile === null || loading) {
      dashboardContent = <LoadingComponent />;
    } else {
      // Check if logged in user has profile data
      if (Object.keys(profile).length > 0) {
        dashboardContent = (
          <div>
            <p className="uk-text-lead">{profile.username}</p>
          </div>
        );
      } else {
        // User is logged in but has no profile
        dashboardContent = (
          <div>
            <p className="uk-text-small uk-text-meta">Welcome {user.email}</p>
            <p>Set up your profile to personalize your account.</p>
            <Link to="/create-profile">
              <button className="uk-button uk-button-secondary">
                Create Profile
              </button>
            </Link>
          </div>
        );
      }
    }

    return (
      <div className="dashboard uk-flex uk-flex-center uk-flex-middle">
        <div className="uk-container">
          <p className="uk-text-uppercase uk-text-lead">Dashboard</p>
          {dashboardContent}
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getCurrentProfile }
)(Dashboard);
