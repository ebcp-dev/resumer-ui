import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

import '../../css/pages/Layout.css';

class Landing extends Component {
  render() {
    const { user, isAuthenticated } = this.props.auth;
    return (
      <div>
        <section className="hero is-dark">
          <div className="hero-body">
            <div className="container">
              <h1 className="title">Resumer</h1>
              <h2 className="subtitle">
                Track and manage your job applications.
              </h2>
              {isAuthenticated === true ? (
                <div className="is-hidden-desktop">
                  <div className="buttons">
                    <Link to="/jobs" className="button is-primary">
                      Jobs
                    </Link>
                    <Link to="/profile" className="button is-info">
                      Profile
                    </Link>
                  </div>
                  <h2 className="title is-4">Welcome back {user.email}</h2>
                </div>
              ) : (
                <div className="is-hidden-desktop">
                  <div className="buttons">
                    <Link to="/signup" className="button is-primary">
                      Sign Up
                    </Link>
                    <Link to="/login" className="button is-info">
                      Login
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
        <section className="hero is-warning">
          <div className="hero-body">
            <div className="container">
              <h2 className="subtitle">
                Use an interactive data grid to track your job applications.
              </h2>
            </div>
            <br />
            <div className="columns">
              <div className="column">
                <div className="card">
                  <div className="card-image">
                    <figure className="image is-4by3">
                      <img
                        src="https://cdn.pixabay.com/photo/2018/11/24/02/05/lichterkette-3834926_1280.jpg"
                        alt="Placeholder"
                      />
                    </figure>
                  </div>
                  <div className="card-content">
                    <div className="content">
                      Powered by ag-Grid. <a>ag-grid</a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="column">
                <div className="card">
                  <div className="card-image">
                    <figure className="image is-4by3">
                      <img
                        src="https://cdn.pixabay.com/photo/2018/11/29/19/29/autumn-3846345_1280.jpg"
                        alt="Placeholder"
                      />
                    </figure>
                  </div>
                  <div className="card-content">
                    <div className="content">
                      Lorem ipsum dolor sit amet, adipiscing elit.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

Landing.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Landing);
