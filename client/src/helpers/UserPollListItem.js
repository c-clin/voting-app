import React from 'react';
import { connect } from 'react-redux';

const PollListItem = props => {
  return (
    <div className="PollListItem">
      <div href="#" id={props.id} className="list-group-item">
        {props.question}
        <hr />
        <button name="view">
          View &nbsp;<i className="fa fa-line-chart" aria-hidden="true" />
        </button>
        <button name="delete">
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

export default connect(mapStateToProps)(PollListItem);
