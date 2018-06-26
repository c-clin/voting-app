import React from 'react';
import facebookBtn from '../assets/facebook-btn.png';
import googleBtn from '../assets/google-btn.png';

const Login = () => {
  return (
    <div className="Login">
      <div className="login-item">
        <a href="/auth/facebook">
          <img src={facebookBtn} width="200" alt="login with facebook" />
        </a>
      </div>
      <div className="login-item">
        <a href="/auth/google">
          <img src={googleBtn} width="200" alt="login with google" />
        </a>
      </div>
    </div>
  );
};

export default Login;
