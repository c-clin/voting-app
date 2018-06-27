import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const Landing = props => {
  let landingBtn;
  landingBtn = props.auth ? (
    <Link to="/all-polls" className="btn btn-login">
      View All Polls
    </Link>
  ) : (
    <Link to="/login" className="btn btn-login">
      Start creating
    </Link>
  );

  return (
    <div className="Landing">
      <div className="text-box">
        <h1>
          <span className="heading-main">Vote Now</span>
          <span className="heading-sub">
            A fun and easy way to create polls
          </span>
        </h1>

        {landingBtn}
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    auth: state.auth.auth
  };
};

export default connect(mapStateToProps)(Landing);
