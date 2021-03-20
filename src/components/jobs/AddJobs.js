import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import '../../css/pages/Jobs.css';
import { addJob } from '../../actions/jobActions';
import TextFieldGroup from '../common/TextFieldGroup';
import SelectListGroup from '../common/SelectListGroup';

class AddJobsForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      role: '',
      company: '',
      link: '',
      location: null,
      seniority: null,
      salaryRange: null,
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.clearForm = this.clearForm.bind(this);
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
      location: null,
      seniority: null,
      salaryRange: null,
      errors: {}
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
    // Select options for seniority
    const seniorityOptions = [
      { label: 'Experience', value: 'Unspecified' },
      { label: 'Junior', value: 'Junior' },
      { label: 'Mid Level', value: 'Mid Level' },
      { label: 'Senior', value: 'Senior' }
    ];

    // Select options for salary range
    const salaryOptions = [
      { label: 'Salary', value: 'Unspecified' },
      { label: '0-50k', value: '0-50k' },
      { label: '50-100k', value: '50-100k' },
      { label: '100-150k', value: '100-150k' },
      { label: '150-200k', value: '150-200k' },
      { label: '200-250k', value: '200-250k' },
      { label: '250-300k', value: '250-300k' },
      { label: '300k-above', value: '300k-above' }
    ];
    return (
      <div className="box">
        <h1 className="title has-text-centered">Add jobs</h1>
        <form onSubmit={this.onSubmit}>
          <div className="field is-horizontal">
            <div className="field-label is-normal">
              <label className="label">Details</label>
            </div>
            <div className="field-body">
              <TextFieldGroup
                placeholder="Role *"
                name="role"
                required={true}
                type="text"
                icon="fas fa-user-tag"
                value={this.state.role}
                onChange={this.onChange}
              />
              <TextFieldGroup
                placeholder="Link *"
                name="link"
                required={true}
                type="url"
                icon="fas fa-link"
                value={this.state.link}
                onChange={this.onChange}
              />
              <TextFieldGroup
                placeholder="Company *"
                name="company"
                required={true}
                type="text"
                icon="fas fa-briefcase"
                value={this.state.company}
                onChange={this.onChange}
              />
              <TextFieldGroup
                placeholder="Location"
                name="location"
                type="text"
                icon="fas fa-compass"
                value={this.state.location}
                onChange={this.onChange}
              />
            </div>
          </div>
          <div className="field is-horizontal">
            <div className="field-body">
              <div className="field-label is-normal">
                <label className="label">Salary/Experience</label>
              </div>
              <SelectListGroup
                name="salaryRange"
                value={this.state.salaryRange}
                onChange={this.onChange}
                options={salaryOptions}
              />
              <SelectListGroup
                name="seniority"
                value={this.state.seniority}
                onChange={this.onChange}
                options={seniorityOptions}
              />
              <div className="buttons">
                <button className="button is-link">Submit</button>
                <button onClick={this.clearForm} className="button is-warning">
                  Clear
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

AddJobsForm.propTypes = {
  addJob: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(mapStateToProps, { addJob })(AddJobsForm);
