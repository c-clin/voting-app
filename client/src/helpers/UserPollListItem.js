import React from 'react';
import { connect } from 'react-redux';

import * as actionTypes from '../store/actions/actionTypes';

const PollListItem = props => {
  return (
    <div className="PollListItem">
      <div href="#" id={props.id} className="list-group-item">
        {props.question}
        <button name="Delete" onClick={props.modalOn}>
          Delete
        </button>
        <button name="view" onClick={props.modalOn}>
          View
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    modalShow: state.poll.modalShow
  };
};

const mapDispatchToProps = dispatch => {
  return {
    modalOn: () => dispatch({ type: actionTypes.TURN_ON_MODAL })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PollListItem);
