import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './store/actions';
import './main.css';

import Header from './components/Header';

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
      </div>
    );
  }
}

export default connect(
  null,
  actions
)(App);
