import React from 'react';
import { Route, Link } from 'react-router-dom';

import '../../css/pages/Dashboard.css';

import EditProfile from '../profile/EditProfile';
import Jobs from '../jobs/Jobs';
import Profile from '../profile/Profile';

export default props => {
  return (
    <div className="uk-grid-collapse dashboard" uk-grid="true">
      <div className="uk-width-1-4@s uk-dark sidebar">
        <div className="uk-padding">
          <ul className="uk-nav uk-nav-default" uk-nav="true">
            <li className="uk-nav-header uk-visible@m">Navigation</li>
            <li className="uk-hidden@m">
              <Link to="#" uk-toggle="target: #profile-details">
                Profile
              </Link>
            </li>
            <li>
              <Link to={`${props.match.url}`}>Jobs</Link>
            </li>
            <li>
              <Link to={`${props.match.url}/profile`}>Edit Profile</Link>
            </li>
          </ul>
          <hr className="uk-visible@m" />
          <Profile />
          <hr />
        </div>
      </div>
      <div className="uk-width-expand@s">
        <div className="uk-margin-right uk-padding">
          <Route exact path={`${props.match.url}`} component={Jobs} />
          <Route
            exact
            path={`${props.match.url}/profile`}
            component={EditProfile}
          />
        </div>
        <br />
      </div>
    </div>
  );
};
