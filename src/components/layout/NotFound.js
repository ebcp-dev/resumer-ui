import React from 'react';
import { Link } from 'react-router-dom';

import '../../css/pages/Layout.css';

export default () => {
  return (
    <section className="section">
      <div className="container">
        <div className="content">
          <h1 className="title">404 page not found.</h1>
          <h2 className="subtitle">
            <Link to="/">Back to home.</Link>
          </h2>
        </div>
      </div>
    </section>
  );
};
