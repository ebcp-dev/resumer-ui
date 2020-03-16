import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getCurrentProfile } from '../../actions/profileActions';

import '../../css/pages/Profile.css';

import CreateProfile from './CreateProfile';
import EditProfile from './EditProfile';
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
          userStatus = 'is-info';
        }
        if (profile.status === 'Actively Looking') {
          userStatus = 'is-success';
        }
        if (profile.status === 'Interviewing') {
          userStatus = 'is-primary';
        }
        profileContent = (
          // Display user's profile details
          <div className="box">
            <h1 className="title">{profile.username}</h1>
            <h2 className="subtitle">
              Joined: {dateJoined.slice(4, dateJoined.length)}
            </h2>
            <span className={`tag ${userStatus}`}>{profile.status}</span>
            <hr />
            <EditProfile />
          </div>
        );
      } else {
        // User is logged in but has no profile
        profileContent = (
          <div className="box">
            <h1 className="title">{user.email}</h1>
            <p className="subtitle">Add details to your account.</p>
            <p className="help">
              Joined: {dateJoined.slice(4, dateJoined.length)}
            </p>
            <CreateProfile />
          </div>
        );
      }
    }
    return (
      <section className="section">
        <div className="container">{profileContent}</div>
      </section>
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

export default connect(mapStateToProps, { getCurrentProfile })(Profile);
