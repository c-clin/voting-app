import * as actionTypes from '../actions/actionTypes';

const initialState = {
  auth: null,
  registered: false,
  error: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case actionTypes.FETCH_USER:
      return {
        ...state,
        auth: action.payload || false,
        registered: false,
        error: false
      };
    case actionTypes.USER_REGISTERED:
      return {
        ...state,
        registered: true,
        error: false
      };
    case actionTypes.AUTH_ERROR:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
}
