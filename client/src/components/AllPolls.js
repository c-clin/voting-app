import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListGroup } from 'reactstrap';
import * as actions from '../store/actions';

import PollListItem from '../helpers/PollListItem';

export class AllPolls extends Component {
  componentWillMount = () => {
    this.props.onFetchAllPolls();
  };

  render() {
    let allPollsContent;

    const polls = this.props.polls.allPolls;
    console.log(polls);
    if (polls) {
      allPollsContent = polls.map(poll => {
        return <PollListItem key={poll._id} question={poll.question} />;
      });
    }

    return (
      <div>
        <h1>All Polls</h1>
        <ListGroup flush>{allPollsContent}</ListGroup>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    polls: state.poll
  };
};

export default connect(
  mapStateToProps,
  actions
)(AllPolls);
