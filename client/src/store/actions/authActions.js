import * as actionTypes from './actionTypes';
import axios from 'axios';

export const fetchUser = () => dispatch => {
  axios.get('/api/current_user').then(res => {
    dispatch({
      type: actionTypes.FETCH_USER,
      payload: res.data
    });
  });
};
