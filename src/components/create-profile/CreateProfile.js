import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import '../../css/components/CreateProfile.css';
import TextFieldGroup from '../common/TextFieldGroup';
import SelectListGroup from '../common/SelectListGroup';
import { createProfile } from '../../actions/profileActions';

class CreateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      status: '',
      website: '',
      linkedin: '',
      github: '',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const profileData = {
      username: this.state.username,
      status: this.state.status,
      website: this.state.website,
      linkedin: this.state.linkedin,
      github: this.state.github
    };
    this.props.createProfile(profileData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;

    // Select options for status
    const options = [
      { label: 'Current Status', value: 0 },
      { label: 'Actively Looking', value: 'Actively Looking' },
      { label: 'Not Looking', value: 'Not Looking' },
      { label: 'Interviewing', value: 'Interviewing' },
      { label: 'Offered', value: 'Offered' }
    ];

    return (
      <div className="create-profile uk-flex uk-flex-center uk-flex-middle">
        <div className="uk-container">
          <br />
          <h1 className="uk-text-lead">Create Your Profile</h1>
          {errors.profile && <p className="uk-text-danger">{errors.profile}</p>}
          <form onSubmit={this.onSubmit}>
            <TextFieldGroup
              placeholder="* Username"
              name="username"
              value={this.state.username}
              onChange={this.onChange}
              error={errors.username}
            />
            <SelectListGroup
              placeholder="Status"
              name="status"
              value={this.state.status}
              onChange={this.onChange}
              options={options}
              error={errors.status}
            />
            <TextFieldGroup
              placeholder="Website"
              name="website"
              value={this.state.website}
              onChange={this.onChange}
              error={errors.website}
            />
            <TextFieldGroup
              placeholder="LinkedIn"
              name="linkedin"
              value={this.state.linkedin}
              onChange={this.onChange}
              error={errors.linkedin}
            />
            <TextFieldGroup
              placeholder="Github"
              name="github"
              value={this.state.github}
              onChange={this.onChange}
              error={errors.github}
            />
            <button className="uk-button uk-button-secondary">Submit</button>
            <hr />
          </form>
        </div>
      </div>
    );
  }
}

CreateProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createProfile }
)(withRouter(CreateProfile));
