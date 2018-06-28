import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListGroup } from 'reactstrap';
import * as actionTypes from '../store/actions/actionTypes';
import * as actions from '../store/actions';
import UserPollListItem from '../helpers/UserPollListItem';
import Modal from '../helpers/Modal';
import DonutChart from '../helpers/DonutChart';
import { Button } from 'reactstrap';

export class Dashboard extends Component {
  state = {
    chartId: 0,
    command: null
  };

  componentDidMount = () => {
    this.props.loadPolls();
  };

  listClickHandler = e => {
    console.log(e.target.name);
    this.setState({ chartId: e.target.parentNode.id });
    if (e.target.name === 'view') {
      this.setState({ command: 'view' });
      this.props.modalOn();
    } else if (e.target.name === 'delete') {
      this.setState({ command: 'delete' });
      this.props.modalOn();
    } else {
      return;
    }
  };

  deletePollHandler = () => {
    this.props.deletePoll(this.props.userPolls[this.state.chartId]);
  };

  render() {
    const userPolls = this.props.userPolls;
    let userPollItem;
    if (userPolls) {
      userPollItem = userPolls.map(poll => {
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
          <Button onClick={this.deletePollHandler} color="danger">
            Yes
          </Button>
        </div>
      );
    }

    let dashboardContent;
    this.props.loading
      ? (dashboardContent = <div className="loader">Loading...</div>)
      : (dashboardContent = (
          <div className="Dashboard">
            <h1>My Polls</h1>
            <ListGroup flush onClick={this.listClickHandler}>
              {userPollItem}
            </ListGroup>
            <Modal show={this.props.modalShow}>
              {this.state.command === 'view' ? chart : del}
            </Modal>
          </div>
        ));

    return dashboardContent;
  }
}

const mapStateToProps = state => {
  return {
    userPolls: state.poll.userPolls,
    modalShow: state.poll.modalShow,
    loading: state.poll.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    modalOn: () => dispatch({ type: actionTypes.TURN_ON_MODAL }),
    loadPolls: () => dispatch(actions.onFetchUserPolls()),
    deletePoll: data => dispatch(actions.onDeletePoll(data))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
