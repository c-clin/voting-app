import React from 'react';
import { connect } from 'react-redux';

const PollListItem = props => {
  const voteBtn = (
    <button name="vote">
      Vote&nbsp; <i className="fa fa-hand-o-left" aria-hidden="true" />
    </button>
  );

  return (
    <div className="PollListItem">
      <div href="#" id={props.id} className="list-group-item">
        {props.question}
        <hr />
        <div style={{ textAlign: 'center' }}>
          <button name="view" onClick={props.modalOn}>
            View &nbsp;<i className="fa fa-line-chart" aria-hidden="true" />
          </button>
          {props.auth ? voteBtn : null}
        </div>
        <p>
          by: <span className="created-by">{props.createdBy}</span>
        </p>
      </div>
    </div>
  );
};

//   return (
//     <div className="PollListItem">
//       <div href="#" id={props.id} className="list-group-item">
//         {props.question}
//         <br />
//         <button name="view">
//           View &nbsp;<i className="fa fa-line-chart" aria-hidden="true" />
//         </button>
//         {props.auth ? voteBtn : null}
//       </div>
//     </div>
//   );
// };

const mapStateToProps = state => {
  return {
    auth: state.auth.auth
  };
};

export default connect(mapStateToProps)(PollListItem);
