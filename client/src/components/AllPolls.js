import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListGroup } from 'reactstrap';
import * as actions from '../store/actions';

import Modal from '../helpers/Modal';
import DonutChart from '../helpers/DonutChart';
import PollListItem from '../helpers/PollListItem';

export class AllPolls extends Component {
  state = {
    chartId: 0
  };

  componentWillMount = () => {
    this.props.onFetchAllPolls();
  };

  listClickHandler = e => {
    this.setState({ chartId: e.target.id });
  };

  render() {
    const polls = this.props.polls.allPolls;
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

    let chart;
    if (polls) {
      chart = <DonutChart poll={polls[this.state.chartId]} />;
    }

    return (
      <div>
        <h1>All Polls</h1>
        <ListGroup flush onClick={this.listClickHandler}>
          {allPollsContent}
        </ListGroup>
        <Modal show={this.props.modalShow}>{chart}</Modal>
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
