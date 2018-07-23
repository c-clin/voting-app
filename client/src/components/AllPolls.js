import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListGroup } from 'reactstrap';
import * as actions from '../store/actions';
import * as actionTypes from '../store/actions/actionTypes';

import Modal from '../helpers/Modal';
import DonutChart from '../helpers/DonutChart';
import PollListItem from '../helpers/PollListItem';
import Vote from '../helpers/Vote';

export class AllPolls extends Component {
  state = {
    chartId: 0,
    command: null
  };

  componentDidMount = () => {
    this.props.onFetchAllPolls();
  };

  listClickHandler = e => {
    this.setState({ chartId: e.target.parentNode.parentNode.id });
    if (e.target.name === 'view') {
      this.setState({ command: 'view' });
      this.props.modalOn();
    } else if (e.target.name === 'vote') {
      this.setState({ command: 'vote' });
      this.props.modalOn();
    } else {
      return;
    }
  };

  render() {
    const polls = this.props.polls;
    let pollsListItem;
    if (polls) {
      pollsListItem = polls.map(poll => {
        return (
          <PollListItem
            id={polls.indexOf(poll)}
            key={poll._id}
            question={poll.question}
            poll={poll}
            createdBy={poll.createdBy}
          />
        );
      });
    }

    let chart, vote;
    if (this.props.modalShow) {
      chart = <DonutChart poll={polls[this.state.chartId]} />;
      vote = <Vote poll={polls[this.state.chartId]} />;
    }

    const authMsg = (
      <p className="auth-msg">
        You must <a href="/login">log in</a> to vote!
      </p>
    );

    let allPollsContent;

    if (this.props.loading) {
      allPollsContent = <div className="loader">Loading...</div>;
    } else {
      allPollsContent = (
        <div className="AllPolls">
          <h1>Community Polls</h1>
          {this.props.auth ? null : authMsg}
          <ListGroup flush onClick={this.listClickHandler}>
            {pollsListItem}
          </ListGroup>
          <Modal show={this.props.modalShow}>
            {this.state.command === 'view' ? chart : vote}
          </Modal>
        </div>
      );
    }

    return allPollsContent;
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth.auth,
    polls: state.poll.allPolls,
    modalShow: state.poll.modalShow,
    loading: state.poll.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    modalOn: () => dispatch({ type: actionTypes.TURN_ON_MODAL }),
    onFetchAllPolls: () => dispatch(actions.onFetchAllPolls())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AllPolls);
