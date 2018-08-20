import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import '../../css/components/jobs/AddJobs.css';
import { addJob, getJobs } from '../../actions/jobActions';
import TextFieldGroup from '../common/TextFieldGroup';
import SelectListGroup from '../common/SelectListGroup';
import Jobs from './Jobs';

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
    this.clearForm = this.clearForm.bind(this);
  }

  componentDidMount() {
    this.props.getJobs();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  clearForm(e) {
    e.preventDefault();
    this.setState({
      role: '',
      company: '',
      link: '',
      location: '',
      seniority: '',
      salaryRange: ''
    });
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
    let { jobsList, loading } = this.props.jobs;
    const { errors } = this.state;

    // Select options for seniority
    const seniorityOptions = [
      { label: 'Unspecified Experience Level', value: 0 },
      { label: 'Junior', value: 'Junior' },
      { label: 'Mid Level', value: 'Mid Level' },
      { label: 'Senior', value: 'Senior' }
    ];

    // Select options for salary range
    const salaryOptions = [
      { label: 'Salary Range', value: 0 },
      { label: '0-50k', value: '0-50k' },
      { label: '50-100k', value: '50-100k' },
      { label: '100-150k', value: '100-150k' },
      { label: '150-200k', value: '150-200k' },
      { label: '200-250k', value: '200-250k' },
      { label: '250-300k', value: '250-300k' },
      { label: '300k-above', value: '300k-above' }
    ];

    return (
      <div className="addJobs">
        <p className="uk-text-lead">Add Job</p>
        <form className="uk-grid-small" onSubmit={this.onSubmit} uk-grid="true">
          <div className="uk-width-1-2@s">
            <TextFieldGroup
              placeholder="* Role"
              name="role"
              type="text"
              value={this.state.role}
              onChange={this.onChange}
              error={errors.role}
            />
          </div>
          <div className="uk-width-1-2@s">
            <TextFieldGroup
              placeholder="* Company"
              name="company"
              type="text"
              value={this.state.company}
              onChange={this.onChange}
              error={errors.company}
            />
          </div>
          <div className="uk-width-1-2@s">
            <TextFieldGroup
              placeholder="* Link"
              name="link"
              type="text"
              value={this.state.link}
              onChange={this.onChange}
              error={errors.link}
            />
          </div>
          <div className="uk-width-1-2@s">
            <TextFieldGroup
              placeholder="City"
              name="location"
              type="text"
              value={this.state.location}
              onChange={this.onChange}
              error={errors.location}
            />
          </div>
          <div className="uk-width-1-4@s">
            <SelectListGroup
              name="seniority"
              value={this.state.seniority}
              onChange={this.onChange}
              options={seniorityOptions}
              error={errors.seniority}
            />
          </div>
          <div className="uk-width-1-4@s">
            <SelectListGroup
              name="salaryRange"
              value={this.state.salaryRange}
              onChange={this.onChange}
              options={salaryOptions}
              error={errors.salaryRange}
            />
          </div>
          <button className="uk-button uk-button-secondary uk-width-1-4">
            Add
          </button>
          <button
            onClick={this.clearForm}
            className="uk-button uk-button-secondary uk-width-1-4"
          >
            Clear
          </button>
        </form>
        <hr />
        <Jobs jobsList={jobsList} loading={loading} />
      </div>
    );
  }
}

AddJobs.propTypes = {
  getJobs: PropTypes.func.isRequired,
  addJob: PropTypes.func.isRequired,
  jobs: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  jobs: state.jobs,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addJob, getJobs }
)(AddJobs);