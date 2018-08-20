import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getJobs } from '../../actions/jobActions';

import '../../css/components/jobs/Jobs.css';
import LoadingComponent from '../common/LoadingComponent';

class Jobs extends Component {
  componentDidMount() {
    this.props.getJobs();
  }

  render() {
    const { jobs, loading } = this.props;
    let jobsArr = [];
    let jobsContent;

    if (jobs === null || loading) {
      jobsContent = <LoadingComponent />;
    } else {
      if (jobs.jobsList.length > 0) {
        let { jobsList } = jobs;
        let jobStatus;
        for (let i = 0; i < jobsList.length; i++) {
          let {
            role,
            company,
            link,
            location,
            seniority,
            salaryRange,
            status,
            createdAt,
            updatedAt
          } = jobsList[i];
          let dateAdded = new Date(createdAt).toDateString();
          let dateUpdated = new Date(updatedAt).toDateString();
          // Set job status label
          if (status === 'Saved') {
            jobStatus = '';
          }
          if (status === 'Applied') {
            jobStatus = 'uk-label-warning';
          }
          if (status === 'Interviewing') {
            jobStatus = 'uk-label-danger';
          }
          if (status === 'Offered') {
            jobStatus = 'uk-label-offered';
          }
          if (status === 'Signed Offer') {
            jobStatus = 'uk-label-success';
          }
          jobsArr.push(
            <li key={i}>
              <div className="uk-card uk-card-default uk-card-body">
                <span className={`uk-label ${jobStatus}`}>{status}</span>
                <br />
                <a href={link} target="_blank">
                  {seniority} {role} at {company}, {location} {salaryRange}
                </a>
                <br />
                <a className="uk-link-reset">
                  Added: {dateAdded.slice(4, dateAdded.length)}
                </a>
                <br />
                <a className="uk-link-reset">
                  Updated: {dateUpdated.slice(4, dateUpdated.length)}
                </a>
              </div>
            </li>
          );
        }
        jobsContent = <ul className="uk-list">{jobsArr}</ul>;
      }
    }
    return (
      <div className="uk-tile uk-tile-default">
        <p className="uk-text-lead">Jobs Collection</p>
        {jobsContent}
      </div>
    );
  }
}

Jobs.propTypes = {
  getJobs: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  jobs: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  jobs: state.jobs,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { getJobs }
)(Jobs);
