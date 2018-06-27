import React from 'react';
import { connect } from 'react-redux';

import * as actionTypes from '../store/actions/actionTypes';

const PollListItem = props => {
  const voteBtn = (
    <button name="vote" onClick={props.modalOn}>
      Vote
    </button>
  );

  return (
    <div className="PollListItem">
      <div href="#" id={props.id} className="list-group-item">
        {props.question}

        <button name="view" onClick={props.modalOn}>
          View
          <i className="fa fa-line-chart" aria-hidden="true" />
        </button>
        {props.auth ? voteBtn : null}
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    auth: state.auth.auth,
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
