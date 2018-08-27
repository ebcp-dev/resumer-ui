import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import '../../css/pages/Jobs.css';
import { addJob } from '../../actions/jobActions';

import AddJobs from './AddJobs';
import JobsTable from './JobsTable';

class Jobs extends Component {
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
    const { errors } = this.state;

    return (
      <div className="jobs">
        <AddJobs />
        <div className="uk-grid-small" uk-grid="true">
          <p className="uk-text-danger">{errors.role}</p>
          <p className="uk-text-danger">{errors.company}</p>
          <p className="uk-text-danger">{errors.link}</p>
        </div>
        <JobsTable />
      </div>
    );
  }
}

Jobs.propTypes = {
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
  { addJob }
)(Jobs);
