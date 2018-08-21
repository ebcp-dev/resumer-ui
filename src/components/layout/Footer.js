import React from 'react';
import { Link } from 'react-router-dom';

import '../../css/components/Layout.css';

export default () => {
  return (
    <nav className="footer uk-navbar-container" uk-navbar="true">
      <div className="uk-navbar-left">
        <ul className="uk-navbar-nav">
          <li className="uk-active">
            <Link to="/">Home</Link>
          </li>
        </ul>
      </div>
      <div className="uk-navbar-right">
        <ul className="uk-navbar-nav">
          <li>
            <Link to="#navbar" uk-scroll="true">
              Scroll Up
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};
