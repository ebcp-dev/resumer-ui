import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profileActions';

import '../../css/components/dashboard/Dashboard.css';
import LoadingComponent from '../common/LoadingComponent';
import Jobs from '../jobs/Jobs';
import AddJobs from '../jobs/AddJobs';
import Profile from './Profile';

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;
    let dateJoined = new Date(user.joined).toDateString();
    let userStatus;
    let dashboardContent;

    if (profile === null || loading) {
      dashboardContent = <LoadingComponent />;
    } else {
      // Check if logged in user has profile data
      if (Object.keys(profile).length > 0) {
        // Set profile status label
        if (profile.status === 'Not Looking') {
          userStatus = '';
        }
        if (profile.status === 'Actively Looking') {
          userStatus = 'uk-label-warning';
        }
        if (profile.status === 'Interviewing') {
          userStatus = 'uk-label-danger';
        }
        if (profile.status === 'Offered') {
          userStatus = 'uk-label-success';
        }

        dashboardContent = (
          <div
            className="uk-grid-collapse uk-child-width-1-3@m uk-flex-center"
            uk-grid="true"
          >
            <Profile
              username={profile.username}
              dateJoined={dateJoined}
              userStatus={userStatus}
              status={profile.status}
              email={user.email}
              website={profile.website}
              linkedin={profile.linkedin}
              github={profile.github}
            />
            <AddJobs />
            <Jobs />
          </div>
        );
      } else {
        // User is logged in but has no profile
        dashboardContent = (
          <div className="uk-flex uk-flex-center uk-flex-middle">
            <div className="uk-card uk-card-default uk-card-body">
              <p className="uk-text-small uk-text-meta">Welcome {user.email}</p>
              <p>Add details to personalize your account.</p>
              <Link to="/create-profile">
                <button className="uk-button uk-button-secondary">
                  Add Details
                </button>
              </Link>
            </div>
          </div>
        );
      }
    }

    return (
      <div className="dashboard uk-container">
        <br />
        {dashboardContent}
        <br />
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
