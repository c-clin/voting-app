import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../store/actions';

export class Register extends Component {
  state = {
    name: '',
    email: '',
    password: ''
  };

  registerUser = e => {
    e.preventDefault();
    const data = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password
    };

    this.props.registerUser(data, this.props.history);
  };

  changeInputHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div className="Register">
        <h3>Register</h3>
        <form action="#" className="Login__form" onSubmit={this.registerUser}>
          <div>
            <label for="name" className="Login__form--label">
              Name:
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className="Login__form--input"
              placeholder="Name"
              value={this.state.name}
              onChange={this.changeInputHandler}
            />
          </div>
          <div>
            <label for="email" className="Login__form--label">
              Email:
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="Login__form--input"
              placeholder="Email"
              value={this.state.email}
              onChange={this.changeInputHandler}
            />
          </div>
          <div>
            <label for="password" className="Login__form--label">
              Password:
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="Login__form--input"
              placeholder="Password"
              value={this.state.password}
              onChange={this.changeInputHandler}
            />
          </div>
          <button className="register-btn btn btn-info">Register Now</button>
        </form>
      </div>
    );
  }
}

export default connect(
  null,
  actions
)(Register);
