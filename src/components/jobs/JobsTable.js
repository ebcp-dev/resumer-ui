import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid/dist/styles/ag-grid.css';
import 'ag-grid/dist/styles/ag-theme-balham.css';
import '../../css/pages/Jobs.css';
import { editJob, getJobs, deleteJobs } from '../../actions/jobActions';
import LoadingComponent from '../common/LoadingComponent';

class JobsTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedRows: [],
      errors: {},
      onGridReady: params => {
        params.api.sizeColumnsToFit();
      }
    };
    this.onGridReady = this.onGridReady.bind(this);
    this.onRowEditingStopped = this.onRowEditingStopped.bind(this);
    this.onSelectionChanged = this.onSelectionChanged.bind(this);
    this.onDeleteSelected = this.onDeleteSelected.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
  }

  componentDidMount() {
    this.props.getJobs();
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ errors: nextProps.errors });
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = this.columnApi;
    params.api.sizeColumnsToFit();
  }

  onRowEditingStopped(row) {
    this.props.editJob(row.data);
  }

  onSelectionChanged() {
    this.setState({ selectedRows: this.gridApi.getSelectedRows() });
  }

  onDeleteSelected(e) {
    e.preventDefault();
    // Send array of links to delete
    let linksArr = [];
    this.state.selectedRows.map(row => {
      return linksArr.push(row.link);
    });
    this.props.deleteJobs(linksArr);
    // Remove rows from grid
    this.gridApi.updateRowData({ remove: this.state.selectedRows });
  }

  onRefresh(e) {
    e.preventDefault();
    this.props.getJobs();
  }

  render() {
    const { jobsList, loading } = this.props.jobs;
    let tableContent;

    if (jobsList === null || loading) {
      tableContent = <LoadingComponent />;
    } else {
      tableContent = (
        <div className="ag-theme-balham ag-grid-table">
          <p className="subtitle">Jobs ({jobsList.length})</p>
          <div className="field is-grouped">
            <p className="control">
              <a
                onClick={this.onDeleteSelected}
                className="button is-small is-danger"
              >
                Delete selected
              </a>
            </p>
            <p className="control">
              <a
                onClick={this.onRefresh}
                className="button is-small is-success"
              >
                Refresh
              </a>
            </p>
          </div>
          <p className="help">
            Double click on a row to edit • Click on column header to
            sort/filter • Drag column header to rearrange or resize columns
          </p>
          <AgGridReact
            enableFilter={true}
            enableSorting={true}
            enableColResize={true}
            stopEditingWhenGridLosesFocus={true}
            pagination={true}
            paginationPageSize={20}
            editType="fullRow"
            onSelectionChanged={this.onSelectionChanged}
            rowData={jobsList}
            rowSelection="multiple"
            onGridReady={this.onGridReady}
            onRowEditingStopped={this.onRowEditingStopped}
            columnDefs={[
              {
                headerName: 'Position',
                field: 'role',
                minWidth: 250,
                editable: true,
                headerCheckboxSelection: true,
                headerCheckboxSelectionFilteredOnly: true,
                checkboxSelection: true
              },
              {
                headerName: 'Status',
                field: 'status',
                minWidth: 80,
                maxWidth: 120,
                editable: true,
                cellEditor: 'agSelectCellEditor',
                cellEditorParams: {
                  values: [
                    'Saved',
                    'Applied',
                    'Interviewing',
                    'Rejected',
                    'Offered',
                    'Accepted'
                  ]
                },
                cellClassRules: {
                  'label-saved': params => {
                    return params.data.status === 'Saved';
                  },
                  'uk-label-warning': params => {
                    return params.data.status === 'Applied';
                  },
                  'label-interviewing': params => {
                    return params.data.status === 'Interviewing';
                  },
                  'uk-label-danger': params => {
                    return params.data.status === 'Rejected';
                  },
                  'label-offered': params => {
                    return params.data.status === 'Offered';
                  },
                  'uk-label-success': params => {
                    return params.data.status === 'Accepted';
                  }
                },
                cellRenderer: params => {
                  return `<span>${params.data.status}</span>`;
                }
              },
              {
                headerName: 'Company',
                field: 'company',
                minWidth: 100,
                maxWidth: 130,
                editable: true
              },
              {
                headerName: 'Location',
                field: 'location',
                minWidth: 100,
                maxWidth: 200,
                editable: true
              },
              {
                headerName: 'Experience',
                field: 'seniority',
                minWidth: 100,
                maxWidth: 120,
                editable: true,
                cellEditor: 'agSelectCellEditor',
                cellEditorParams: {
                  values: ['Unspecified', 'Junior', 'Mid Level', 'Senior']
                }
              },
              {
                headerName: 'Salary',
                field: 'salaryRange',
                minWidth: 80,
                maxWidth: 120,
                editable: true,
                cellEditor: 'agSelectCellEditor',
                cellEditorParams: {
                  values: [
                    'Unspecified',
                    '0-50k',
                    '50-100k',
                    '100-150k',
                    '150-200k',
                    '250-300k',
                    '300k-above'
                  ]
                }
              },
              {
                headerName: 'Link',
                field: 'link',
                minWidth: 100,
                maxWidth: 350,
                editable: true,
                cellRenderer: params => {
                  return `<a href=${params.data.link}><span>${params.data.link}</span></a>`;
                }
              },
              {
                headerName: 'Added',
                field: 'createdAt',
                sort: 'desc',
                minWidth: 80,
                maxWidth: 100,
                cellRenderer: params => {
                  return `<p>${params.data.createdAt.slice(0, 10)}</p>`;
                }
              },
              {
                headerName: 'Updated',
                field: 'updatedAt',
                minWidth: 120,
                maxWidth: 150,
                cellRenderer: params => {
                  return `<p>${params.data.updatedAt.slice(0, 10)}</p>`;
                }
              }
            ]}
          />
        </div>
      );
    }
    return <div className="jobsTable">{tableContent}</div>;
  }
}

JobsTable.propTypes = {
  getJobs: PropTypes.func.isRequired,
  editJob: PropTypes.func.isRequired,
  deleteJobs: PropTypes.func.isRequired,
  jobs: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  jobs: state.jobs,
  errors: state.errors
});

export default connect(mapStateToProps, { editJob, getJobs, deleteJobs })(
  JobsTable
);
