import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListGroup } from 'reactstrap';
import * as actions from '../store/actions';

import Modal from '../helpers/Modal';
import PollListItem from '../helpers/PollListItem';

export class AllPolls extends Component {
  componentWillMount = () => {
    this.props.onFetchAllPolls();
  };

  modalClickHandler = () => {
    this.props.modalShow = true;
    console.log('modal clicked');
  };

  render() {
    const polls = this.props.polls.allPolls;
    let allPollsContent;
    if (polls) {
      allPollsContent = polls.map(poll => {
        return (
          <PollListItem
            key={poll._id}
            question={poll.question}
            poll={poll}
            onClick={this.modalClickHandler}
          />
        );
      });
    }

    return (
      <div>
        <h1>All Polls</h1>
        <ListGroup flush>{allPollsContent}</ListGroup>
        <Modal show={this.props.modalShow}>Poll Info</Modal>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    polls: state.poll,
    modalShow: state.poll.modalShow
  };
};

export default connect(
  mapStateToProps,
  actions
)(AllPolls);
