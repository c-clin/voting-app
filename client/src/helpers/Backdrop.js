import React from 'react';
import { connect } from 'react-redux';
import * as actionTypes from '../store/actions/actionTypes';

const backdrop = props =>
  props.show ? (
    <div
      className="Backdrop"
      onClick={() => {
        props.modalOff();
      }}
    />
  ) : null;

const mapDispatchToProps = dispatch => {
  return {
    modalOff: () => dispatch({ type: actionTypes.TURN_OFF_MODAL })
  };
};

export default connect(
  null,
  mapDispatchToProps
)(backdrop);
