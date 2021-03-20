import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { connect } from 'react-redux';

import '../../css/pages/Jobs.css';
import { addJob } from '../../actions/jobActions';

import AddJobs from './AddJobs';
import JobsTable from './JobsTable';

class Jobs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      errors: {}
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  render() {
    const { errors } = this.state;

    return (
      <section className="section">
        <div className="tile is-ancestor">
          <div className="tile is-vertical">
            <div className="tile is-parent is-vertical">
              <AddJobs />
            </div>
            <br />
            <div className="container tags">
              <span className={classnames({ tag: errors.role }, 'is-danger')}>
                {errors.role}
              </span>
              <span
                className={classnames({ tag: errors.company }, 'is-danger')}
              >
                {errors.company}
              </span>
              <span className={classnames({ tag: errors.link }, 'is-danger')}>
                {errors.link}
              </span>
            </div>
            <div className="tile is-parent is-vertical">
              <JobsTable />
            </div>
          </div>
        </div>
      </section>
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

export default connect(mapStateToProps, { addJob })(Jobs);
