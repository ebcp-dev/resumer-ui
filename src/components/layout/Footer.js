import React from 'react';
import { Link } from 'react-router-dom';

import '../../css/components/layout/Footer.css';

export default () => {
  return (
    <nav className="footer uk-navbar-container" uk-navbar="true">
      <div className="uk-navbar-left">
        <ul className="uk-navbar-nav">
          <li className="uk-active">
            <Link to="">Left</Link>
          </li>
          <li>
            <Link to="">Footer</Link>
          </li>
        </ul>
      </div>
      <div className="uk-navbar-right">
        <ul className="uk-navbar-nav">
          <li className="uk-active">
            <Link to="">Right Footer</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};