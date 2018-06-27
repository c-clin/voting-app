import React from 'react';
import { connect } from 'react-redux';

import * as actionTypes from '../store/actions/actionTypes';

const PollListItem = props => {
  return (
    <div className="PollListItem">
      <div href="#" id={props.id} className="list-group-item">
        {props.question}
        <hr />
        <button name="view" onClick={props.modalOn}>
          View &nbsp;<i className="fa fa-line-chart" aria-hidden="true" />
        </button>
        <button name="Delete" onClick={props.modalOn}>
          Delete &nbsp;<i className="fa fa-trash-o" aria-hidden="true" />
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
