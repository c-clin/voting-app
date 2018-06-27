import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import * as actions from '../store/actions';

export class Vote extends Component {
  submitVoteHandler = () => {
    var selection = document.querySelector('input[name = "radio2"]:checked')
      .value;
    this.props.onVotePoll(this.props.poll, selection);
  };

  render() {
    console.log(this.props);
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
        <Form>
          <FormGroup tag="fieldset" row>
            <legend className="col-form-labelk">
              {this.props.poll.question}
            </legend>
            <Col sm={10}>{renderOptions}</Col>
          </FormGroup>
          <Col sm={{ size: 10, offset: 2 }}>
            {this.props.voteSubmitted ? (
              <p>Vote Submitted!</p>
            ) : (
              <Button onClick={this.submitVoteHandler}>Submit Vote</Button>
            )}
          </Col>
        </Form>
      </div>
    );
  }
}

const mapPropsToState = state => {
  return {
    voteSubmitted: state.poll.voteSubmitted
  };
};

export default connect(
  mapPropsToState,
  actions
)(Vote);
