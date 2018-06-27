import * as actionTypes from '../actions/actionTypes';

const initialState = {
  allPolls: null,
  userPolls: null,
  modalShow: false,
  voteSubmitted: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case actionTypes.FETCH_ALL_POLLS:
      return {
        ...state,
        allPolls: action.allPolls
      };
    case actionTypes.FETCH_USER_POLLS:
      return {
        ...state,
        userPolls: action.userPolls
      };
    case actionTypes.TURN_ON_MODAL:
      return {
        ...state,
        modalShow: true
      };
    case actionTypes.TURN_OFF_MODAL:
      return {
        ...state,
        modalShow: false,
        voteSubmitted: false
      };
    case actionTypes.SUBMIT_VOTE:
      return {
        ...state,
        voteSubmitted: true
      };
    default:
      return state;
  }
}
