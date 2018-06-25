import * as actionTypes from '../actions/actionTypes';

const initialState = {
  allPolls: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case actionTypes.FETCH_ALL_POLLS:
      return {
        ...state,
        allPolls: action.allPolls
      };
    default:
      return state;
  }
}
