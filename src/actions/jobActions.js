import axios from 'axios';

import {
  GET_JOBS,
  CLEAR_CURRENT_JOBS,
  JOBS_LOADING,
  GET_ERRORS
} from './types';

// Get jobs
export const getJobs = () => dispatch => {
  dispatch(setJobsLoading());
  axios
    .get('/api/job/all')
    .then(res => {
      dispatch({
        type: GET_JOBS,
        payload: res.data || []
      });
    })
    .catch(err =>
      dispatch({
        type: GET_JOBS,
        payload: []
      })
    );
};

// Add jobs
export const addJob = jobData => dispatch => {
  axios
    .post('/api/job', jobData)
    .then(res => {
      dispatch(getJobs());
      dispatch({
        type: GET_ERRORS,
        payload: {}
      });
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Edit jobs
export const editJob = jobData => dispatch => {
  axios.put('/api/job', jobData).catch(err =>
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
  );
};

// Delete jobs
export const deleteJobs = jobsToDelete => dispatch => {
  axios.delete('/api/job', { data: { links: jobsToDelete } }).catch(err => {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  });
};

// Jobs loading
export const setJobsLoading = () => {
  return {
    type: JOBS_LOADING
  };
};

// Clear jobs list
export const clearCurrentJobs = () => {
  return {
    type: CLEAR_CURRENT_JOBS
  };
};
