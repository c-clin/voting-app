import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../store/actions';

export class AllPolls extends Component {
  componentDidMount = () => {
    this.props.onFetchAllPolls();
  };

  render() {
    return <div>all polls component</div>;
  }
}

export default connect(
  null,
  actions
)(AllPolls);
