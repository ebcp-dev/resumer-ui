import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getProfile } from '../../actions/profileActions';

import '../../css/pages/ViewProfile.css';
import LoadingComponent from '../common/LoadingComponent';

class ViewProfile extends Component {
  componentDidMount() {
    this.props.getProfile(this.props.match.params.username);
  }

  render() {
    const { profile, loading } = this.props.profile;
    let userStatus, profileContent;

    if (profile === null || loading) {
      profileContent = <LoadingComponent />;
    } else {
      // Check if user has profile data
      if (Object.keys(profile).length > 0) {
        const {
          username,
          status,
          website,
          linkedin,
          github,
          stackoverflow,
          dribbble,
          twitter,
          createdAt
        } = profile.profile;
        let dateJoined = new Date(createdAt).toDateString();
        // Set profile status label
        if (status === 'Not Looking') {
          userStatus = 'is-info';
        }
        if (status === 'Actively Looking') {
          userStatus = 'is-success';
        }
        if (status === 'Interviewing') {
          userStatus = 'is-primary';
        }
        console.log(profile);
        profileContent = (
          // Display user's profile details
          <div className="card">
            <div className="card-content">
              <h1 className="title">{username}</h1>
              <h2 className="subtitle">
                Joined: {dateJoined.slice(4, dateJoined.length)}
              </h2>
              <span className={`tag ${userStatus}`}>{status}</span>
              <hr />
              <ul>
                {website && (
                  <li>
                    <a href={`${website}`}>{website}</a>
                  </li>
                )}
                {website && (
                  <li>
                    <a href={`${linkedin}`}>{linkedin}</a>
                  </li>
                )}
                {website && (
                  <li>
                    <a href={`${github}`}>{github}</a>
                  </li>
                )}
                {website && (
                  <li>
                    <a href={`${stackoverflow}`}>{stackoverflow}</a>
                  </li>
                )}
                {website && (
                  <li>
                    <a href={`${dribbble}`}>{dribbble}</a>
                  </li>
                )}
                {website && (
                  <li>
                    <a href={`${twitter}`}>{twitter}</a>
                  </li>
                )}
              </ul>
            </div>
          </div>
        );
      } else {
        // User has no profile
        profileContent = (
          <div className="box">
            <h1 className="title">Profile does not exist.</h1>
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

ViewProfile.propTypes = {
  getProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(mapStateToProps, { getProfile })(ViewProfile);
