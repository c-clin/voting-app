import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListGroup } from 'reactstrap';
import * as actions from '../store/actions';

import Modal from '../helpers/Modal';
import DonutChart from '../helpers/DonutChart';
import PollListItem from '../helpers/PollListItem';
import Vote from '../helpers/Vote';

export class AllPolls extends Component {
  state = {
    chartId: 0,
    command: null
  };

  componentWillMount = () => {
    this.props.onFetchAllPolls();
  };

  listClickHandler = e => {
    console.log(e.target.parentNode.id);
    console.log(e.target.name);
    this.setState({ chartId: e.target.parentNode.id });
    if (e.target.name === 'view') {
      this.setState({ command: 'view' });
    } else {
      this.setState({ command: 'vote' });
    }
  };

  render() {
    const polls = this.props.polls;
    let allPollsContent;
    if (polls) {
      allPollsContent = polls.map(poll => {
        return (
          <PollListItem
            id={polls.indexOf(poll)}
            key={poll._id}
            question={poll.question}
            poll={poll}
          />
        );
      });
    }

    let chart, vote;
    if (this.props.modalShow) {
      chart = <DonutChart poll={polls[this.state.chartId]} />;
      vote = <Vote poll={polls[this.state.chartId]} />;
    }

    return (
      <div>
        <h1>All Polls</h1>
        <ListGroup flush onClick={this.listClickHandler}>
          {allPollsContent}
        </ListGroup>
        <Modal show={this.props.modalShow}>
          {this.state.command === 'view' ? chart : vote}
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    polls: state.poll.allPolls,
    modalShow: state.poll.modalShow
  };
};

export default connect(
  mapStateToProps,
  actions
)(AllPolls);
