import React from 'react';
import { Link } from 'react-router-dom';

import '../../css/pages/Layout.css';

export default () => {
  return (
    <nav className="uk-navbar-container uk-light footer" uk-navbar="true">
      <div className="uk-navbar-left">
        <ul className="uk-navbar-nav">
          <li>
            <Link to="/">Home</Link>
          </li>
        </ul>
      </div>
      <div className="uk-navbar-right">
        <ul className="uk-navbar-nav">
          <li className="uk-active">
            <Link to="#navbar" uk-scroll="true">
              Scroll Up
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};
