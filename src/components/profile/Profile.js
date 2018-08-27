import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getCurrentProfile } from '../../actions/profileActions';

import '../../css/pages/Profile.css';
import LoadingComponent from '../common/LoadingComponent';

class Profile extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;
    let dateJoined = new Date(user.joined).toDateString();
    let userStatus, profileContent;

    if (profile === null || loading) {
      profileContent = <LoadingComponent />;
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
        profileContent = (
          <div>
            <h3 className="uk-text-lead">{profile.username}</h3>
            <p className="uk-text-meta">
              Joined: {dateJoined.slice(4, dateJoined.length)}
            </p>
            <span className={`uk-label ${userStatus}`}>{profile.status}</span>
            <hr />
            {(profile.website || profile.linkedin || profile.github) && (
              <p>Links:</p>
            )}
            <ul className="uk-list">
              <li>
                {profile.website && (
                  <a href={profile.website} target="_blank">
                    Website
                  </a>
                )}
              </li>
              <li>
                {profile.linkedin && (
                  <a href={profile.linkedin} target="_blank">
                    LinkedIn
                  </a>
                )}
              </li>
              <li>
                {profile.github && (
                  <a href={profile.github} target="_blank">
                    GitHub
                  </a>
                )}
              </li>
            </ul>
            <p>Contact:</p>
            <a className="uk-link-text" href={`mailto:${user.email}`}>
              {user.email}
            </a>
          </div>
        );
      } else {
        // User is logged in but has no profile
        profileContent = (
          <div>
            <h3 className="uk-text-lead">{user.email}</h3>
            <p>
              Go to edit profile to add details to your profile to profile to
              personalize your account.
            </p>
            <p className="uk-text-meta">
              Joined: {dateJoined.slice(4, dateJoined.length)}
            </p>
          </div>
        );
      }
    }
    return (
      <div className="uk-offcanvas-content">
        <div id="profile-details" uk-offcanvas="true">
          <div className="uk-offcanvas-bar">
            <button
              className="uk-offcanvas-close"
              type="button"
              uk-close="true"
            />
            {profileContent}
          </div>
        </div>
        <div className="uk-visible@m">
          <div className="profile">{profileContent}</div>
        </div>
      </div>
    );
  }
}

Profile.propTypes = {
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
)(Profile);
