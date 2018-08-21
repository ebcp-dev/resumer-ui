import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid/dist/styles/ag-grid.css';
import 'ag-grid/dist/styles/ag-theme-balham.css';
import '../../css/components/Jobs.css';
import { editJob, getJobs, deleteJobs } from '../../actions/jobActions';
import LoadingComponent from '../common/LoadingComponent';

class AGGrid extends Component {
  constructor(props) {
    super(props);

    this.state = {
      jobsList: null,
      errors: {},
      onGridReady: params => {
        params.api.sizeColumnsToFit();
      }
    };
    this.onGridReady = this.onGridReady.bind(this);
    this.onRowEditingStopped = this.onRowEditingStopped.bind(this);
    this.checkboxSelection = this.checkboxSelection.bind(this);
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
    // console.log(row.data);
    this.props.editJob(row.data);
  }

  checkboxSelection(params) {
    console.log(params);
  }

  render() {
    const { jobsList, loading } = this.props.jobs;
    let tableContent;

    if (jobsList === null || loading) {
      tableContent = <LoadingComponent />;
    } else {
      tableContent = (
        <div className="ag-grid-table ag-theme-balham uk-padding">
          <p className="uk-text-lead">Jobs</p>
          <AgGridReact
            enableFilter={true}
            enableSorting={true}
            enableColResize={true}
            singleClickEdit={true}
            stopEditingWhenGridLosesFocus={true}
            pagination={true}
            paginationPageSize={20}
            editType="fullRow"
            rowSelection="multiple"
            rowData={jobsList}
            onGridReady={this.onGridReady}
            onRowEditingStopped={this.onRowEditingStopped}
            columnDefs={[
              {
                headerName: 'Link',
                field: 'link',
                maxWidth: 100,
                headerCheckboxSelection: true,
                headerCheckboxSelectionFilteredOnly: true,
                checkboxSelection: true,
                editable: true,
                cellRenderer: params => {
                  return `<a href=${params.data.link}><span>Link</span></a>`;
                }
              },
              {
                headerName: 'Status',
                field: 'status',
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
                  return '<span>' + params.data.status + '</span>';
                }
              },
              {
                headerName: 'Role',
                field: 'role',
                editable: true
              },
              {
                headerName: 'Company',
                field: 'company',
                maxWidth: 150,
                editable: true
              },
              {
                headerName: 'City',
                field: 'location',
                maxWidth: 200,
                editable: true
              },
              {
                headerName: 'Experience',
                field: 'seniority',
                maxWidth: 120,
                editable: true,
                cellEditor: 'agSelectCellEditor',
                cellEditorParams: {
                  values: ['Junior', 'Mid Level', 'Senior']
                }
              },
              {
                headerName: 'Salary',
                field: 'salaryRange',
                maxWidth: 120,
                editable: true,
                cellEditor: 'agSelectCellEditor',
                cellEditorParams: {
                  values: [
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
                headerName: 'Added',
                field: 'createdAt',
                maxWidth: 120,
                cellRenderer: params => {
                  let parseDate = new Date(params.data.createdAt)
                    .toDateString()
                    .slice(4, params.data.createdAt.length);
                  return '<p>' + parseDate + '</p';
                }
              },
              {
                headerName: 'Updated',
                field: 'updatedAt',
                sort: 'desc',
                maxWidth: 120,
                cellRenderer: params => {
                  let parseDate = new Date(params.data.updatedAt)
                    .toDateString()
                    .slice(4, params.data.createdAt.length);
                  return '<p>' + parseDate + '</p';
                }
              }
            ]}
          />
        </div>
      );
    }
    return <div>{tableContent}</div>;
  }
}

AGGrid.propTypes = {
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

export default connect(
  mapStateToProps,
  { editJob, getJobs, deleteJobs }
)(AGGrid);
