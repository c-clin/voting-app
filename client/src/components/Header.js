import React, { Component } from 'react';
import { connect } from 'react-redux';

export class Header extends Component {
  render() {
    const authLinks = (
      <ul>
        <li>
          <a href="">New Poll</a>
        </li>
        <li>
          <a href="/api/logout">Logout</a>
        </li>
      </ul>
    );
    const guestLinks = (
      <ul>
        <li>
          <a href="/">All Polls</a>
        </li>
        <li>
          <a href="/auth/facebook">Login with Facebook</a>
        </li>
        <li>
          <a href="/auth/google">Login with Google</a>
        </li>
      </ul>
    );
    console.log(this.props.auth.auth);

    return (
      <div className="Header">
        {this.props.auth.auth ? authLinks : guestLinks}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default connect(mapStateToProps)(Header);
