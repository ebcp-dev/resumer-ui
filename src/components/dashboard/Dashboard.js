import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profileActions';

import '../../css/components/Dashboard.css';

import LoadingComponent from '../common/LoadingComponent';
import EditProfile from '../profile/EditProfile';
import AddJobs from '../jobs/AddJobs';
import Profile from '../profile/Profile';

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;
    let dateJoined = new Date(user.joined).toDateString();
    let userStatus;
    let dashboard;

    if (profile === null || loading) {
      dashboard = <LoadingComponent />;
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
        dashboard = (
          <div className="uk-grid-match" uk-grid="true">
            <div className="uk-width-1-4@s">
              <div className="uk-card uk-card-default" uk-sticky="true">
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
                <div className="uk-card-footer">
                  <ul className="uk-nav uk-nav-default" uk-nav="true">
                    <li className="uk-hidden@m">
                      <Link to="#" uk-toggle="target: #profile-details">
                        Profile
                        <span uk-icon="triangle-right" />
                      </Link>
                    </li>
                    <li>
                      <Link to={`${this.props.match.url}`}>Jobs</Link>
                    </li>
                    <li>
                      <Link to={`${this.props.match.url}/profile`}>
                        Edit Profile
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="uk-width-expand@s">
              <div className="uk-margin-right">
                <Route
                  exact
                  path={`${this.props.match.url}`}
                  component={AddJobs}
                />
                <Route
                  exact
                  path={`${this.props.match.url}/profile`}
                  component={EditProfile}
                />
              </div>
              <br />
            </div>
          </div>
        );
      } else {
        // User is logged in but has no profile
        dashboard = (
          <div className="uk-flex uk-flex-center uk-flex-middle uk-height-large">
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
    return <div className="dashboard">{dashboard}</div>;
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
