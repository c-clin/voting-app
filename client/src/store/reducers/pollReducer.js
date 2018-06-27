import * as actionTypes from '../actions/actionTypes';

const initialState = {
  allPolls: null,
  userPolls: null,
  modalShow: false,
  voteSubmitted: false,
  error: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case actionTypes.FETCH_ALL_POLLS:
      return {
        ...state,
        allPolls: action.allPolls,
        error: false
      };
    case actionTypes.FETCH_USER_POLLS:
      return {
        ...state,
        userPolls: action.userPolls,
        error: false
      };
    case actionTypes.TURN_ON_MODAL:
      return {
        ...state,
        modalShow: true,
        error: false
      };
    case actionTypes.TURN_OFF_MODAL:
      return {
        ...state,
        modalShow: false,
        voteSubmitted: false,
        error: false
      };
    case actionTypes.SUBMIT_VOTE:
      return {
        ...state,
        voteSubmitted: true,
        error: false
      };
    case actionTypes.ON_ERROR:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
}
