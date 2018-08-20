import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { addJob } from '../../actions/jobActions';
import TextFieldGroup from '../common/TextFieldGroup';
import SelectListGroup from '../common/SelectListGroup';

class AddJobs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      role: '',
      company: '',
      link: '',
      location: '',
      seniority: '',
      salaryRange: '',
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

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const newJob = {
      role: this.state.role,
      company: this.state.company,
      link: this.state.link,
      location: this.state.location,
      seniority: this.state.seniority,
      salaryRange: this.state.salaryRange
    };

    this.props.addJob(newJob);
  }

  render() {
    const { errors } = this.state;

    // Select options for seniority
    const seniorityOptions = [
      { label: 'Select Experience Level', value: 0 },
      { label: 'Junior', value: 'Junior' },
      { label: 'Mid Level', value: 'Mid Level' },
      { label: 'Senior', value: 'Senior' }
    ];

    // Select options for salary range
    const salaryOptions = [
      { label: 'Salary Range (USD)', value: 0 },
      { label: '0-50k', value: '0-50k' },
      { label: '50-100k', value: '50-100k' },
      { label: '100-150k', value: '100-150k' },
      { label: '150-200k', value: '150-200k' },
      { label: '200-250k', value: '200-250k' },
      { label: '250-300k', value: '250-300k' },
      { label: '300k-above', value: '300k-above' }
    ];

    return (
      <div className="uk-tile uk-tile-default">
        <p className="uk-text-lead">Add Job</p>
        <form onSubmit={this.onSubmit}>
          <TextFieldGroup
            placeholder="* Role"
            name="role"
            type="text"
            value={this.state.role}
            onChange={this.onChange}
            error={errors.role}
          />
          <TextFieldGroup
            placeholder="* Company"
            name="company"
            type="text"
            value={this.state.company}
            onChange={this.onChange}
            error={errors.company}
          />
          <TextFieldGroup
            placeholder="* Link"
            name="link"
            type="text"
            value={this.state.link}
            onChange={this.onChange}
            error={errors.link}
          />
          <TextFieldGroup
            placeholder="Location"
            name="location"
            type="text"
            value={this.state.location}
            onChange={this.onChange}
            error={errors.location}
          />
          <SelectListGroup
            name="seniority"
            value={this.state.seniority}
            onChange={this.onChange}
            options={seniorityOptions}
            error={errors.seniority}
          />
          <SelectListGroup
            name="salaryRange"
            value={this.state.salaryRange}
            onChange={this.onChange}
            options={salaryOptions}
            error={errors.salaryRange}
          />
          <button className="uk-button uk-button-secondary">Submit</button>
        </form>
      </div>
    );
  }
}

AddJobs.propTypes = {
  addJob: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addJob }
)(AddJobs);
