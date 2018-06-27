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

// fetch all poll made by current user
export const onFetchUserPolls = () => dispatch => {
  axios
    .get('/api/polls/user')
    .then(res => {
      dispatch({
        type: actionTypes.FETCH_USER_POLLS,
        userPolls: res.data
      });
    })
    .catch(e => console.log(e));
};

// create new poll
export const createNewPoll = (pollData, history) => dispatch => {
  console.log('actions', pollData);

  axios
    .post('/api/polls/create', pollData)
    .then(res => history.push('/all-polls'))
    .catch(e => console.log(e));
};

// vote on a poll
export const onVotePoll = (data, selection) => dispatch => {
  if (!selection) {
    dispatch({
      type: actionTypes.ON_ERROR,
      payload: 'Please choose an option!'
    });
  } else {
    const pollData = {
      index: selection,
      _id: data._id
    };

    axios
      .post('/api/polls/vote', pollData)
      .then(res => {
        dispatch(onFetchAllPolls());
        dispatch({
          type: actionTypes.SUBMIT_VOTE
        });
      })
      .catch(e => {
        dispatch({
          type: actionTypes.ON_ERROR,
          payload: e.response.data.error
        });
      });
  }
};

// delete a poll
export const onDeletePoll = data => dispatch => {
  console.log(data);
  const pollData = {
    _id: data._id
  };

  axios
    .post('/api/polls/delete', pollData)
    .then(res => {
      dispatch(onFetchUserPolls());
      dispatch({
        type: actionTypes.TURN_OFF_MODAL
      });
    })
    .catch(e => console.log(e));
};
