// import * as actionTypes from './actionTypes';
import axios from 'axios';

export const createNewPoll = pollData => dispatch => {
  axios
    .post('/api/polls/create', pollData)
    .then(res => console.log(res))
    .catch(e => console.log(e));
};
