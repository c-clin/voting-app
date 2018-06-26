import React from 'react';
import { ListGroupItem } from 'reactstrap';
import { connect } from 'react-redux';

import * as actionTypes from '../store/actions/actionTypes';

const PollListItem = props => {
  return (
    <div onClick={props.modalOn}>
      <ListGroupItem disabled tag="a" href="#">
        {props.question}
      </ListGroupItem>
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
