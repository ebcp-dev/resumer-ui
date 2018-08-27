import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
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
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getCurrentProfile();
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
        github: nextProps.profile.profile.github
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
      github: this.state.github
    };
    this.props.editProfile(editProfileData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { username, status, website, linkedin, github, errors } = this.state;
    const { profile, loading } = this.props.profile;

    // Select options for status
    const options = [
      { label: 'Actively Looking', value: 'Actively Looking' },
      { label: 'Not Looking', value: 'Not Looking' },
      { label: 'Interviewing', value: 'Interviewing' },
      { label: 'Offered', value: 'Offered' }
    ];
    if (profile === null || loading) {
      return <LoadingComponent />;
    } else {
      if (Object.keys(profile).length > 0) {
        return (
          <div className="edit-profile">
            <div className="uk-container">
              <h1 className="uk-text-lead">Edit Your Profile</h1>
              {errors.profile && (
                <p className="uk-text-danger">{errors.profile}</p>
              )}
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="* Username"
                  name="username"
                  value={username}
                  onChange={this.onChange}
                  error={errors.username}
                />
                <SelectListGroup
                  placeholder="Status"
                  name="status"
                  value={status}
                  onChange={this.onChange}
                  options={options}
                  error={errors.status}
                />
                <TextFieldGroup
                  placeholder="Website"
                  name="website"
                  value={website}
                  onChange={this.onChange}
                  error={errors.website}
                />
                <TextFieldGroup
                  placeholder="LinkedIn"
                  name="linkedin"
                  value={linkedin}
                  onChange={this.onChange}
                  error={errors.linkedin}
                />
                <TextFieldGroup
                  placeholder="Github"
                  name="github"
                  value={github}
                  onChange={this.onChange}
                  error={errors.github}
                />
                <button className="uk-button uk-button-secondary">
                  Submit
                </button>
              </form>
            </div>
          </div>
        );
      } else {
        return (
          <div className="uk-flex uk-flex-center uk-flex-middle edit-profile">
            <div className="uk-card uk-card-default uk-card-body">
              <p>Add details to personalize your account.</p>
              <Link to="/create-profile">
                <button className="uk-button uk-button-secondary">
                  Add Details
                </button>
              </Link>
            </div>
          </div>
        );
      }
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

export default connect(
  mapStateToProps,
  { editProfile, getCurrentProfile }
)(withRouter(EditProfile));
