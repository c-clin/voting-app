import * as actionTypes from '../actions/actionTypes';

const initialState = {
  allPolls: null,
  modalShow: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case actionTypes.FETCH_ALL_POLLS:
      return {
        ...state,
        allPolls: action.allPolls
      };
    case actionTypes.TURN_ON_MODAL:
      return {
        ...state,
        modalShow: true
      };
    case actionTypes.TURN_OFF_MODAL:
      return {
        ...state,
        modalShow: false
      };
    default:
      return state;
  }
}
