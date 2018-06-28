import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import * as actions from '../store/actions';

export class Vote extends Component {
  submitVoteHandler = () => {
    if (!document.querySelector('input[name = "radio2"]:checked')) {
      this.props.onVotePoll(this.props.poll, '');
    } else {
      var selection = document.querySelector('input[name = "radio2"]:checked')
        .value;
      this.props.onVotePoll(this.props.poll, selection);
    }
  };

  render() {
    const renderOptions = this.props.poll.answers.map(obj => {
      return (
        <FormGroup check key={obj._id}>
          <Label check>
            <Input
              type="radio"
              name="radio2"
              value={this.props.poll.answers.indexOf(obj)}
            />
            {obj.answer}
          </Label>
        </FormGroup>
      );
    });

    return (
      <div className="Vote">
        {this.props.error ? (
          <p className="err-msg">{this.props.error}</p>
        ) : null}
        <Form>
          <FormGroup tag="fieldset" row>
            <legend className="col-form-labelk">
              {this.props.poll.question}
              <hr />
            </legend>
            <Col sm={10}>{renderOptions}</Col>
          </FormGroup>
          <Col sm={{ size: 10 }}>
            {this.props.voteSubmitted ? (
              <p style={{ color: '#5c9d40' }}>Thanks for voting!</p>
            ) : (
              <Button onClick={this.submitVoteHandler} color="info">
                Submit Vote
              </Button>
            )}
          </Col>
        </Form>
      </div>
    );
  }
}

const mapPropsToState = state => {
  return {
    auth: state.auth.auth,
    error: state.poll.error,
    voteSubmitted: state.poll.voteSubmitted
  };
};

export default connect(
  mapPropsToState,
  actions
)(Vote);
