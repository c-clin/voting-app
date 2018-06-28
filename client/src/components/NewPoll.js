import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import * as actions from '../store/actions';
import * as actionTypes from '../store/actions/actionTypes';
import _ from 'lodash';

export class NewPoll extends React.Component {
  state = {
    answerOptions: 2,
    question: null,
    answer1: null,
    answer2: null,
    answer3: null,
    answer4: null,
    answer5: null
  };

  answerOptionSelector = e => {
    this.setState({ answerOptions: e.target.value });
  };

  inputChangeHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  submitPoll = () => {
    let invalid = true;
    if (_.isEmpty(this.state.question)) {
      this.props.onError('The question cannot be empty.');
      return;
    }

    let answers = [];
    let i = 1;
    while (i <= this.state.answerOptions) {
      answers.push({ answer: this.state[`answer${i}`], votes: 0 });
      i++;
    }

    _.forEach(answers, ({ answer }) => {
      if (!answer) {
        this.props.onError('The answers cannot be empty.');
        invalid = true;
        return false;
      } else {
        invalid = false;
      }
    });

    if (!invalid) {
      const pollData = {
        question: this.state.question,
        answers: answers
      };

      this.props.createNewPoll(pollData, this.props.history);
    }
  };

  render() {
    let counter = 1;
    let answerBoxes = [];
    while (counter <= this.state.answerOptions) {
      answerBoxes.push(
        <FormGroup key={counter}>
          <Label for="exampleText">Answer {counter}</Label>
          <Input
            type="text"
            name={`answer${counter}`}
            id="exampleText"
            onChange={this.inputChangeHandler}
          />
        </FormGroup>
      );
      counter++;
    }

    let errMsg;
    errMsg = this.props.error ? this.props.error : null;

    return (
      <div className="NewPoll">
        <Form>
          <p className="err-msg">{errMsg}</p>
          <FormGroup>
            <Label for="examplePassword">Question</Label>
            <Input
              type="text"
              name="question"
              id="examplePassword"
              placeholder="Ex: What's the cutest animal in the world?"
              onChange={this.inputChangeHandler}
            />
          </FormGroup>
          <FormGroup>
            <Label for="exampleSelect">
              How many answer options would you like?
            </Label>
            <Input
              type="select"
              name="select"
              id="exampleSelect"
              onChange={this.answerOptionSelector}
            >
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </Input>
          </FormGroup>
          {answerBoxes}
          <Button color="success" onClick={this.submitPoll}>
            Create Poll
          </Button>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    error: state.poll.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createNewPoll: (data, history) =>
      dispatch(actions.createNewPoll(data, history)),
    onError: error => dispatch({ type: actionTypes.ON_ERROR, payload: error })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(NewPoll));
