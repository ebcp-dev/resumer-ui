import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactTable from 'react-table';

import 'react-table/react-table.css';
import '../../css/components/jobs/Jobs.css';
import LoadingComponent from '../common/LoadingComponent';

class Jobs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      jobsList: null,
      loading: false
    };
    this.stringifyDate = this.stringifyDate.bind(this);
    this.renderEditable = this.renderEditable.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      jobsList: nextProps.jobsList,
      loading: nextProps.loading
    });
  }

  stringifyDate(date) {
    // convert date to string
    return new Date(date).toDateString().slice(4, date.length);
  }
  // Edit row data
  renderEditable(cellInfo) {
    return (
      <div
        style={{ backgroundColor: '#fafafa' }}
        contentEditable
        suppressContentEditableWarning
        onBlur={e => {
          const jobsList = [...this.state.jobsList];
          jobsList[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
          this.setState({ jobsList });
        }}
        dangerouslySetInnerHTML={{
          __html: this.state.jobsList[cellInfo.index][cellInfo.column.id]
        }}
      />
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
                Cell: this.renderEditable
              },
              {
                Header: 'Status',
                accessor: 'status',
                Cell: this.renderEditable
              },
              {
                Header: 'Salary',
                accessor: 'salaryRange',
                Cell: this.renderEditable
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
            defaultPageSize={10}
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
  jobsList: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired
};

export default Jobs;
