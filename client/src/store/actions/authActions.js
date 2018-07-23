import * as actionTypes from './actionTypes';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
// import { isNull } from 'util';

export const fetchUser = decoded => dispatch => {
  dispatch({
    type: actionTypes.FETCH_USER,
    payload: decoded
  });
};

export const registerUser = (data, history) => dispatch => {
  const userInfo = {
    name: data.name,
    email: data.email,
    password: data.password
  };

  axios
    .post('/api/register', userInfo)
    .then(res => {
      console.log(res);
      history.push('/login');
      dispatch({ type: actionTypes.USER_REGISTERED });
    })
    .catch(e => console.log(e));
};

export const loginUser = (data, history) => dispatch => {
  const userInfo = {
    email: data.email,
    password: data.password
  };

  axios
    .post('/api/login', userInfo)
    .then(res => {
      const { token } = res.data;
      localStorage.setItem('jwtToken', token);
      axios.defaults.headers.common['Authorization'] = token;
      const decoded = jwt_decode(token);
      dispatch({ type: actionTypes.FETCH_USER, payload: decoded });
      history.push('/dashboard');
    })
    .catch(e => console.log(e));
};

export const logoutUser = history => dispatch => {
  localStorage.removeItem('jwtToken');
  delete axios.defaults.headers.common['Authorization'];
  dispatch({ type: actionTypes.FETCH_USER, payload: null });
  history.push('/');
};
