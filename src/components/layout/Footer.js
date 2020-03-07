import React from 'react';
import { Link } from 'react-router-dom';

import '../../css/pages/Layout.css';

export default () => {
  return (
    <footer className="footer">
      <div className="content has-text-centered">
        <p>
          <strong>
            <Link to="/">Resumer</Link>
          </strong>
        </p>
      </div>
    </footer>
  );
};
