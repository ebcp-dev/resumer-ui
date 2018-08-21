import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactTable from 'react-table';
import { connect } from 'react-redux';
import 'react-table/react-table.css';

import '../../css/components/jobs/Jobs.css';
import { editJob } from '../../actions/jobActions';
import LoadingComponent from '../common/LoadingComponent';
import SelectListGroup from '../common/SelectListGroup';
import TextFieldGroup from '../common/TextFieldGroup';

class Jobs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      jobsList: null,
      loading: false,
      errors: {}
    };
    this.stringifyDate = this.stringifyDate.bind(this);
    this.renderEditable = this.renderEditable.bind(this);
    this.renderSelectable = this.renderSelectable.bind(this);
    this.tableButtons = this.tableButtons.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      jobsList: nextProps.jobsList,
      loading: nextProps.loading,
      errors: nextProps.errors
    });
  }

  stringifyDate(date) {
    // convert date to string
    return new Date(date).toDateString().slice(4, date.length);
  }

  // Edit row data text
  renderEditable(cellInfo) {
    const jobsList = [...this.state.jobsList];
    return (
      <TextFieldGroup
        name={cellInfo.column.id}
        value={jobsList[cellInfo.index][cellInfo.column.id]}
        type="text"
        onChange={e => {
          jobsList[cellInfo.index][cellInfo.column.id] = e.target.value;
          this.setState({ jobsList });
        }}
        errors={this.state.errors}
      />
    );
  }

  // Edit row data with select input
  renderSelectable(cellInfo) {
    const jobsList = [...this.state.jobsList];
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
    // Select options for seniority
    const seniorityOptions = [
      { label: 'Unspecified Experience Level', value: 0 },
      { label: 'Junior', value: 'Junior' },
      { label: 'Mid Level', value: 'Mid Level' },
      { label: 'Senior', value: 'Senior' }
    ];
    // Select options for status
    const statusOptions = [
      { label: 'Saved', value: 'Saved' },
      { label: 'Applied', value: 'Applied' },
      { label: 'Interviewing', value: 'Interviewing' },
      { label: 'Rejected', value: 'Rejected' },
      { label: 'Offered', value: 'Offered' },
      { label: 'Accepted', value: 'Accepted' }
    ];
    let selectOptions;
    switch (cellInfo.column.id) {
      case 'seniority':
        selectOptions = seniorityOptions;
        break;
      case 'status':
        selectOptions = statusOptions;
        break;
      case 'salaryRange':
        selectOptions = salaryOptions;
        break;
      default:
        selectOptions = [{ label: 'No value', value: 0 }];
        break;
    }
    return (
      <SelectListGroup
        name={cellInfo.column.id}
        value={jobsList[cellInfo.index][cellInfo.column.id]}
        options={selectOptions}
        onChange={e => {
          jobsList[cellInfo.index][cellInfo.column.id] = e.target.value;
          this.setState({ jobsList });
        }}
      />
    );
  }

  // Visit job link and edit job action
  tableButtons(cellInfo) {
    const jobsList = [...this.state.jobsList];
    let row = jobsList[cellInfo.index];
    let jobStatus;
    switch (row.status) {
      case 'Saved':
        jobStatus = '';
        break;
      case 'Applied':
        jobStatus = 'uk-label-warning';
        break;
      case 'Interviewing':
        jobStatus = 'label-interviewing';
        break;
      case 'Rejected':
        jobStatus = 'uk-label-danger';
        break;
      case 'Offered':
        jobStatus = 'label-offered';
        break;
      case 'Accepted':
        jobStatus = 'uk-label-success';
        break;

      default:
        break;
    }
    return (
      <div className="uk-grid-small" uk-grid="true">
        <a target="_blank">
          <span className="uk-label uk-label-primary">Visit</span>
        </a>
        <a
          onClick={e => {
            this.props.editJob(row);
          }}
        >
          <span className="uk-label uk-label-success">Save</span>
        </a>
        <a target="_blank">
          <span className={`uk-label ${jobStatus}`}>{row.status}</span>
        </a>
      </div>
    );
  }

  render() {
    const { jobsList, loading } = this.state;
    let jobsContent;

    if (jobsList === null || loading) {
      jobsContent = <LoadingComponent />;
    } else {
      if (jobsList.length > 0) {
        jobsContent = (
          <ReactTable
            data={jobsList}
            defaultSorted={[
              {
                id: 'updated',
                desc: true
              }
            ]}
            filterable
            columns={[
              {
                Header: 'Job',
                accessor: 'link',
                Cell: this.tableButtons,
                filterable: false
              },
              {
                Header: 'Link',
                accessor: 'link',
                Cell: this.renderEditable
              },
              {
                Header: 'Role',
                accessor: 'role',
                Cell: this.renderEditable
              },
              {
                Header: 'Company',
                accessor: 'company',
                Cell: this.renderEditable
              },
              {
                Header: 'City',
                accessor: 'location',
                Cell: this.renderEditable
              },
              {
                Header: 'Experience',
                accessor: 'seniority',
                Cell: this.renderSelectable
              },
              {
                Header: 'Status',
                accessor: 'status',
                Cell: this.renderSelectable
              },
              {
                Header: 'Salary',
                accessor: 'salaryRange',
                Cell: this.renderSelectable
              },
              {
                Header: 'Added',
                accessor: 'createdAt',
                Cell: row => <div>{this.stringifyDate(row.value)}</div>,
                filterable: false
              },
              {
                Header: 'Updated',
                accessor: 'updatedAt',
                Cell: row => <div>{this.stringifyDate(row.value)}</div>,
                filterable: false
              }
            ]}
            style={{
              height: '80vh'
            }}
            defaultPageSize={20}
            className="-striped -highlight"
          />
        );
      }
    }
    return (
      <div>
        <p className="uk-text-lead">Jobs Collection</p>
        {jobsContent}
      </div>
    );
  }
}

Jobs.propTypes = {
  editJob: PropTypes.func.isRequired,
  jobsList: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  jobs: state.jobs,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { editJob }
)(Jobs);
