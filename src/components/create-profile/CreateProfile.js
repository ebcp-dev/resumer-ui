import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import SelectListGroup from '../common/SelectListGroup';
import { createProfile } from '../../actions/profileActions';

class CreateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      name: '',
      status: '',
      currentCompany: '',
      website: '',
      location: '',
      skills: '',
      bio: '',
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

    let skillsList =
      this.state.skills.length > 0 ? this.state.skills.split(',') : [];
    const profileData = {
      username: this.state.username,
      name: this.state.name,
      status: this.state.status,
      currentCompany: this.state.currentCompany,
      website: this.state.website,
      location: this.state.location,
      skills: skillsList,
      bio: this.state.bio,
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
      { label: '* Current Status', value: 0 },
      { label: 'Actively Looking', value: 'Actively Looking' },
      { label: 'Passively Looking', value: 'Passively Looking' },
      { label: 'Interviewing', value: 'Interviewing' },
      { label: 'Signed Offer', value: 'Signed Offer' }
    ];

    return (
      <div className="create-profile uk-flex uk-flex-center uk-flex-middle">
        <div className="uk-container">
          <br />
          <h1 className="uk-text-lead">Create Your Profile</h1>
          <p className="uk-text-small">* = required fields</p>
          <form onSubmit={this.onSubmit}>
            <TextFieldGroup
              placeholder="* Username"
              name="username"
              value={this.state.username}
              onChange={this.onChange}
              error={errors.username}
            />
            <TextFieldGroup
              placeholder="* Name"
              name="name"
              value={this.state.name}
              onChange={this.onChange}
              error={errors.name}
            />
            <SelectListGroup
              placeholder="Status"
              name="status"
              value={this.state.status}
              onChange={this.onChange}
              options={options}
              error={errors.status}
              info="Give us an idea of where you are in your job search."
            />
            <TextFieldGroup
              placeholder="Company"
              name="currentCompany"
              value={this.state.currentCompany}
              onChange={this.onChange}
              error={errors.currentCompany}
            />
            <TextFieldGroup
              placeholder="Website"
              name="website"
              value={this.state.website}
              onChange={this.onChange}
              error={errors.website}
            />
            <TextFieldGroup
              placeholder="Location"
              name="location"
              value={this.state.location}
              onChange={this.onChange}
              error={errors.location}
              info="City or city & state suggested (eg. Boston, MA)."
            />
            <TextFieldGroup
              placeholder="* Skills"
              name="skills"
              value={this.state.skills}
              onChange={this.onChange}
              error={errors.skills}
              info="Please use comma separated values (eg.
                    HTML,CSS,JavaScript,PHP."
            />
            <TextFieldGroup
              placeholder="Github"
              name="github"
              value={this.state.github}
              onChange={this.onChange}
              error={errors.github}
            />
            <TextAreaFieldGroup
              placeholder="Short Bio"
              name="bio"
              value={this.state.bio}
              onChange={this.onChange}
              error={errors.bio}
              info="Tell us a little about yourself."
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
