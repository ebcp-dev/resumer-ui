import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';

import '../../css/pages/Auth.css';
import TextFieldGroup from '../common/TextFieldGroup';

class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      password2: '',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/profile');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const newUser = {
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.registerUser(newUser, this.props.history);
  }

  render() {
    const { errors } = this.state;

    return (
      <section className="section">
        <div className="container">
          <div className="content">
            <h1>Sign Up</h1>
            <form onSubmit={this.onSubmit}>
              <TextFieldGroup
                info="Email"
                placeholder="Email Address"
                name="email"
                required={true}
                type="email"
                icon="fas fa-envelope"
                value={this.state.email}
                onChange={this.onChange}
                error={errors.email}
              />
              <TextFieldGroup
                info="Password"
                placeholder="Password"
                name="password"
                required={true}
                type="password"
                icon="fas fa-lock"
                value={this.state.password}
                onChange={this.onChange}
                error={errors.password}
              />
              <TextFieldGroup
                info="Confirm Password"
                placeholder="Confirm Password"
                name="password2"
                required={true}
                type="password"
                icon="fas fa-lock"
                value={this.state.password2}
                onChange={this.onChange}
                error={errors.password2}
              />
              <div className="control">
                <button className="button is-link">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </section>
    );
  }
}

SignUp.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { registerUser })(withRouter(SignUp));
