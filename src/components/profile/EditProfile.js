import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import '../../css/pages/Profile.css';
import LoadingComponent from '../common/LoadingComponent';
import TextFieldGroup from '../common/TextFieldGroup';
import SelectListGroup from '../common/SelectListGroup';
import { editProfile, getCurrentProfile } from '../../actions/profileActions';

class EditProfile extends Component {
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
    if (nextProps.profile.profile) {
      this.setState({
        username: nextProps.profile.profile.username,
        status: nextProps.profile.profile.status,
        website: nextProps.profile.profile.website,
        linkedin: nextProps.profile.profile.linkedin,
        github: nextProps.profile.profile.github,
        stackoverflow: nextProps.profile.profile.stackoverflow,
        dribbble: nextProps.profile.profile.dribbble,
        twitter: nextProps.profile.profile.twitter
      });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const editProfileData = {
      username: this.state.username,
      status: this.state.status,
      website: this.state.website,
      linkedin: this.state.linkedin,
      github: this.state.github,
      stackoverflow: this.state.stackoverflow,
      dribbble: this.state.dribbble,
      twitter: this.state.twitter
    };
    this.props.editProfile(editProfileData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { profile, loading } = this.props.profile;
    const {
      username,
      status,
      website,
      linkedin,
      github,
      stackoverflow,
      dribbble,
      twitter,
      errors
    } = this.state;

    // Select options for status
    const options = [
      { label: 'Actively Looking', value: 'Actively Looking' },
      { label: 'Not Looking', value: 'Not Looking' },
      { label: 'Interviewing', value: 'Interviewing' }
    ];
    if (profile === null || loading) {
      return <LoadingComponent />;
    } else {
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
              value={username}
              onChange={this.onChange}
              error={errors.username}
            />
            <SelectListGroup
              placeholder="Status"
              name="status"
              info="Job search status"
              required={true}
              value={status}
              onChange={this.onChange}
              options={options}
              error={errors.status}
            />
            <TextFieldGroup
              placeholder="Website"
              name="website"
              type="url"
              icon="fas fa-desktop"
              value={website}
              onChange={this.onChange}
              error={errors.website}
            />
            <TextFieldGroup
              placeholder="LinkedIn"
              name="linkedin"
              type="url"
              icon="fab fa-linkedin"
              value={linkedin}
              onChange={this.onChange}
              error={errors.linkedin}
            />
            <TextFieldGroup
              placeholder="Github"
              name="github"
              type="url"
              icon="fab fa-github"
              value={github}
              onChange={this.onChange}
              error={errors.github}
            />
            <TextFieldGroup
              placeholder="Stack Overflow"
              name="stackoverflow"
              type="url"
              icon="fab fa-stack-overflow"
              value={stackoverflow}
              onChange={this.onChange}
              error={errors.stackoverflow}
            />
            <TextFieldGroup
              placeholder="Dribbble"
              name="dribbble"
              type="url"
              icon="fab fa-dribbble"
              value={dribbble}
              onChange={this.onChange}
              error={errors.dribbble}
            />
            <TextFieldGroup
              placeholder="twitter"
              name="twitter"
              type="url"
              icon="fab fa-twitter"
              value={twitter}
              onChange={this.onChange}
              error={errors.twitter}
            />
            <button className="button is-link">Save Changes</button>
            <hr />
          </form>
        </div>
      );
    }
  }
}

EditProfile.propTypes = {
  editProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(mapStateToProps, { editProfile, getCurrentProfile })(
  withRouter(EditProfile)
);
