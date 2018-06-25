import * as actionTypes from '../actions/actionTypes';

const initialState = {
  auth: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case actionTypes.FETCH_USER:
      return {
        ...state,
        auth: action.payload || false
      };
    default:
      return state;
  }
}
