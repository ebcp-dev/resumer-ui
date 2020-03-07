import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import '../../css/pages/Profile.css';
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
      stackoverflow: '',
      dribbble: '',
      twitter: '',
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
      github: this.state.github,
      stackoverflow: this.state.stackoverflow,
      dribbble: this.state.dribbble,
      twitter: this.state.twitter
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
      { label: 'Status *', value: 0 },
      { label: 'Actively Looking', value: 'Actively Looking' },
      { label: 'Not Looking', value: 'Not Looking' },
      { label: 'Interviewing', value: 'Interviewing' }
    ];

    return (
      <div className="container">
        {errors.profile && (
          <p className="help has-text-danger">{errors.profile}</p>
        )}
        <form onSubmit={this.onSubmit}>
          <TextFieldGroup
            placeholder="Username *"
            name="username"
            type="text"
            required={true}
            icon="fas fa-portrait"
            value={this.state.username}
            onChange={this.onChange}
            error={errors.username}
          />
          <SelectListGroup
            placeholder="Status"
            name="status"
            info="Job search status"
            required={true}
            value={this.state.status}
            onChange={this.onChange}
            options={options}
            error={errors.status}
          />
          <TextFieldGroup
            placeholder="Website"
            name="website"
            type="url"
            icon="fas fa-desktop"
            value={this.state.website}
            onChange={this.onChange}
            error={errors.website}
          />
          <TextFieldGroup
            placeholder="LinkedIn"
            name="linkedin"
            type="url"
            icon="fab fa-linkedin"
            value={this.state.linkedin}
            onChange={this.onChange}
            error={errors.linkedin}
          />
          <TextFieldGroup
            placeholder="Github"
            name="github"
            type="url"
            icon="fab fa-github"
            value={this.state.github}
            onChange={this.onChange}
            error={errors.github}
          />
          <TextFieldGroup
            placeholder="Stack Overflow"
            name="stackoverflow"
            type="url"
            icon="fab fa-stack-overflow"
            value={this.state.stackoverflow}
            onChange={this.onChange}
            error={errors.stackoverflow}
          />
          <TextFieldGroup
            placeholder="Dribbble"
            name="dribbble"
            type="url"
            icon="fab fa-dribbble"
            value={this.state.dribbble}
            onChange={this.onChange}
            error={errors.dribbble}
          />
          <TextFieldGroup
            placeholder="Twitter"
            name="twitter"
            type="url"
            icon="fab fa-twitter"
            value={this.state.twitter}
            onChange={this.onChange}
            error={errors.twitter}
          />
          <hr />
          <button className="button is-link">Submit</button>
        </form>
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

export default connect(mapStateToProps, { createProfile })(
  withRouter(CreateProfile)
);
