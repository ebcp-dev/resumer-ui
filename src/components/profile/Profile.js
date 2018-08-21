import React from 'react';

import '../../css/components/Profile.css';

export default props => {
  let {
    username,
    dateJoined,
    userStatus,
    status,
    email,
    website,
    linkedin,
    github
  } = props;
  let profileContent = (
    <div>
      <div className="uk-card-header">
        <h3 className="uk-card-title">{username}</h3>
        <p className="uk-text-meta">
          Joined: {dateJoined.slice(4, dateJoined.length)}
        </p>
        <span className={`uk-label ${userStatus}`}>{status}</span>
      </div>
      <div className="uk-card-body">
        {(website || linkedin || github) && <p>Links:</p>}
        {website && (
          <p>
            <a href={website} target="_blank">
              <button className="uk-button uk-button-default uk-button-small">
                Personal Website
              </button>
            </a>
          </p>
        )}
        {linkedin && (
          <p>
            <a href={linkedin} target="_blank">
              <button className="uk-button uk-button-default uk-button-small">
                <span uk-icon="linkedin" />
              </button>
            </a>
          </p>
        )}
        {github && (
          <p>
            <a href={github} target="_blank">
              <button className="uk-button uk-button-default uk-button-small">
                <span uk-icon="github" />
              </button>
            </a>
          </p>
        )}
        <p>Contact:</p>
        <a className="uk-link-text" href={`mailto:${email}`}>
          {email}
        </a>
      </div>
    </div>
  );

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
};
