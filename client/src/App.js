import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from './store/actions';
import './main.css';

import Header from './components/Header';
import NewPoll from './components/NewPoll';

// testing purpose
import axios from 'axios';
window.axios = axios;

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <div className="App">
        <Header />
        <Route exact path="/new-poll" component={NewPoll} />
      </div>
    );
  }
}

export default connect(
  null,
  actions
)(App);
