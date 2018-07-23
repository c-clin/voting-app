import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../store/actions';

// import facebookBtn from '../assets/facebook-btn.png';
// import googleBtn from '../assets/google-btn.png';

export class Login extends Component {
  state = {
    email: '',
    password: ''
  };

  componentDidMount() {
    this.props.restartError();
  }

  loginUser = e => {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.loginUser(userData, this.props.history);
  };

  inputChangeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const registeredMsg = this.props.registered ? (
      <p className="registeredMsg">You are registered! Please log in.</p>
    ) : null;

    const errMsg = this.props.error ? (
      <p className="errMsg">{this.props.error}</p>
    ) : null;

    return (
      <div className="Login">
        <h3>Login</h3>
        {registeredMsg}
        {errMsg}
        <form action="#" className="Login__form" onSubmit={this.loginUser}>
          <div>
            <input
              type="email"
              className="Login__form--input"
              placeholder="Email"
              name="email"
              value={this.state.email}
              onChange={this.inputChangeHandler}
            />
          </div>
          <div>
            <input
              type="password"
              className="Login__form--input"
              placeholder="Password"
              name="password"
              value={this.state.password}
              onChange={this.inputChangeHandler}
            />
          </div>
          <button className="register-btn btn btn-info">Login</button>
        </form>
        <p className="goto-register">
          Don't have an account? Register for one{' '}
          <Link to="/register">here</Link>!
        </p>
        {/* <p className="Login__or">or</p>
        <div className="login-item">
          <a href="/auth/facebook">
            <img src={facebookBtn} width="200" alt="login with facebook" />
          </a>
        </div>
        <div className="login-item">
          <a href="/auth/google">
            <img src={googleBtn} width="200" alt="login with google" />
          </a>
        </div> */}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    registered: state.auth.registered,
    error: state.auth.error
  };
};

export default connect(
  mapStateToProps,
  actions
)(withRouter(Login));
