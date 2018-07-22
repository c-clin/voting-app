import React from 'react';

const Register = () => {
  return (
    <div className="Register">
      <h3>Register</h3>
      <form action="#" className="Login__form">
        <div>
          <label for="name" className="Login__form--label">
            Name:
          </label>
          <input
            type="text"
            id="name"
            className="Login__form--input"
            placeholder="Name"
          />
        </div>
        <div>
          <label for="email" className="Login__form--label">
            Email:
          </label>
          <input
            type="email"
            id="email"
            className="Login__form--input"
            placeholder="Email"
          />
        </div>
        <div>
          <label for="password" className="Login__form--label">
            Password:
          </label>
          <input
            type="password"
            id="password"
            className="Login__form--input"
            placeholder="Password"
          />
        </div>
        <button className="register-btn btn btn-info">Register Now</button>
      </form>
    </div>
  );
};

export default Register;
