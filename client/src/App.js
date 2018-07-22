import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from './store/actions';
import './main.css';

import Header from './components/Header';
import NewPoll from './components/NewPoll';
import AllPolls from './components/AllPolls';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Landing from './components/Landing';
import Register from './components/Register';
import Signin from './components/Signin';

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
        <Route exact path="/all-polls" component={AllPolls} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/" component={Landing} />
        <Route exact path="/signin" component={Signin} />
      </div>
    );
  }
}

export default withRouter(
  connect(
    null,
    actions
  )(App)
);
