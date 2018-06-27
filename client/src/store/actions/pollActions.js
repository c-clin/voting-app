import * as actionTypes from './actionTypes';
import axios from 'axios';

export const fetchAllPolls = data => {
  return {
    type: actionTypes.FETCH_ALL_POLLS,
    allPolls: data
  };
};

// fetch all polls
export const onFetchAllPolls = () => dispatch => {
  axios
    .get('/api/polls/all')
    .then(res => dispatch(fetchAllPolls(res.data)))
    .catch(e => console.log(e));
};

// create new poll
export const createNewPoll = pollData => dispatch => {
  console.log('actions', pollData);

  axios
    .post('/api/polls/create', pollData)
    .then(res => console.log(res))
    .catch(e => console.log(e));
};

// vote on a poll
export const onVotePoll = (data, selection) => dispatch => {
  console.log(data, selection);

  const pollData = {
    index: selection,
    _id: data._id
  };

  axios
    .post('/api/polls/vote', pollData)
    .then(res => dispatch(onFetchAllPolls()))
    .catch(e => console.log(e));
};
