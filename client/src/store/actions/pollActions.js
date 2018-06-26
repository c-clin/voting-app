import * as actionTypes from './actionTypes';
import axios from 'axios';

export const fetchAllPolls = data => {
  return {
    type: actionTypes.FETCH_ALL_POLLS,
    allPolls: data
  };
};

export const onFetchAllPolls = () => dispatch => {
  axios
    .get('/api/polls/all')
    .then(res => dispatch(fetchAllPolls(res.data)))
    .catch(e => console.log(e));
};

export const createNewPoll = pollData => dispatch => {
  console.log('actions', pollData);

  axios
    .post('/api/polls/create', pollData)
    .then(res => console.log(res))
    .catch(e => console.log(e));
};
