import React from 'react';
import { Link } from 'react-router-dom';

import '../../css/components/layout/Footer.css';

export default () => {
  return (
    <nav className="footer uk-navbar-container" uk-navbar="true">
      <div className="uk-navbar-left">
        <ul className="uk-navbar-nav">
          <li className="uk-active">
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/profiles">Profiles</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};
