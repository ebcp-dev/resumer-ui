import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Pie } from 'react-chartjs-2';

import { getJobs } from '../../actions/jobActions';
import { getCurrentProfile } from '../../actions/profileActions';

import '../../css/pages/Stats.css';

import LoadingComponent from '../common/LoadingComponent';

class Stats extends Component {
  componentDidMount() {
    this.props.getJobs();
    this.props.getCurrentProfile();
  }

  render() {
    const { jobsList, loading } = this.props.jobs;
    let statsContent,
      saved = 0,
      applied = 0,
      interviewing = 0,
      rejected = 0,
      offered = 0,
      accepted = 0;
    if (this.props.jobs === null || loading) {
      statsContent = <LoadingComponent />;
    } else {
      // Check if logged in user has jobs data
      if (jobsList.length > 0) {
        jobsList.forEach(job => {
          switch (job.status) {
            case 'Saved':
              saved++;
              break;
            case 'Applied':
              applied++;
              break;
            case 'Interviewing':
              interviewing++;
              break;
            case 'Rejected':
              rejected++;
              break;
            case 'Offered':
              offered++;
              break;
            case 'Accepted':
              accepted++;
              break;
            default:
              break;
          }
        });
        statsContent = (
          // Display user's job application statistics
          <div className="box">
            <h1 className="title">Job Application Statistics</h1>
            <h2 className="subtitle">{jobsList.length} job application</h2>
            <hr />
            <Pie
              data={{
                labels: [
                  'Saved',
                  'Applied',
                  'Interviewing',
                  'Rejected',
                  'Offered',
                  'Accepted'
                ],
                datasets: [
                  {
                    label: 'Application Status',
                    backgroundColor: [
                      '#0F00FF',
                      '#00F0FF',
                      '#FF9300',
                      '#FF0000',
                      '#6800B4',
                      '#32FF00'
                    ],
                    data: [
                      saved,
                      applied,
                      interviewing,
                      rejected,
                      offered,
                      accepted
                    ]
                  }
                ]
              }}
              options={{
                title: {
                  display: true,
                  text: 'Application Status',
                  fontSize: 20
                },
                legend: {
                  display: true,
                  position: 'right'
                }
              }}
            />
          </div>
        );
      } else {
        // User has no saved jobs
        statsContent = (
          <div className="box">
            <h1 className="title">No jobs</h1>
            <p className="subtitle">Add job applications to track.</p>
          </div>
        );
      }
    }
    return (
      <section className="section">
        <div className="container">{statsContent}</div>
      </section>
    );
  }
}

Stats.propTypes = {
  getJobs: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  jobs: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  jobs: state.jobs,
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps, { getJobs, getCurrentProfile })(Stats);
