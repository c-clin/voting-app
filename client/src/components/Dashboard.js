import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListGroup } from 'reactstrap';
import * as actionTypes from '../store/actions/actionTypes';
import * as actions from '../store/actions';

import UserPollListItem from '../helpers/UserPollListItem';
import Modal from '../helpers/Modal';
import DonutChart from '../helpers/DonutChart';

export class Dashboard extends Component {
  state = {
    chartId: 0,
    command: null
  };

  componentDidMount = () => {
    this.props.loadPolls();
  };

  listClickHandler = e => {
    console.log(e.target.parentNode.id);
    console.log(e.target.name);
    this.setState({ chartId: e.target.parentNode.id });
    if (e.target.name === 'view') {
      this.setState({ command: 'view' });
    } else {
      this.setState({ command: 'delete' });
    }
  };

  deletePollHandler = () => {
    this.props.deletePoll(this.props.userPolls[this.state.chartId]);
  };

  render() {
    const userPolls = this.props.userPolls;
    let renderContent;
    if (userPolls) {
      renderContent = userPolls.map(poll => {
        return (
          <UserPollListItem
            id={userPolls.indexOf(poll)}
            key={poll._id}
            question={poll.question}
            poll={poll}
          />
        );
      });
    }

    let chart, del;
    if (this.props.modalShow) {
      chart = <DonutChart poll={userPolls[this.state.chartId]} />;
      del = (
        <div className="delete-box">
          Are you sure you want to delete this post?
          <br />
          <button onClick={this.deletePollHandler}>Yes</button>
          <button onClick={() => this.props.modalOff()}>No</button>
        </div>
      );
    }

    return (
      <div className="Dashboard">
        <h1>All Polls</h1>
        <ListGroup flush onClick={this.listClickHandler}>
          {renderContent}
        </ListGroup>
        <Modal show={this.props.modalShow}>
          {this.state.command === 'view' ? chart : del}
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userPolls: state.poll.userPolls,
    modalShow: state.poll.modalShow
  };
};

const mapDispatchToProps = dispatch => {
  return {
    modalOff: () => dispatch({ type: actionTypes.TURN_OFF_MODAL }),
    loadPolls: () => dispatch(actions.onFetchUserPolls()),
    deletePoll: data => dispatch(actions.onDeletePoll(data))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
