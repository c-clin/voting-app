import * as actionTypes from '../actions/actionTypes';

const initialState = {
  auth: null,
  registered: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case actionTypes.FETCH_USER:
      return {
        ...state,
        auth: action.payload || false,
        registered: false
      };
    case actionTypes.USER_REGISTERED:
      return {
        ...state,
        registered: true
      };
    default:
      return state;
  }
}
