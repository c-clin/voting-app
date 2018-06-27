import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import * as actions from '../store/actions';

export class NewPoll extends React.Component {
  state = {
    answerOptions: 2,
    question: '',
    answer1: '',
    answer2: '',
    answer3: '',
    answer4: '',
    answer5: ''
  };

  answerOptionSelector = e => {
    this.setState({ answerOptions: e.target.value });
  };

  inputChangeHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  submitPoll = () => {
    let answers = [];
    let i = 1;
    while (i <= this.state.answerOptions) {
      answers.push({ answer: this.state[`answer${i}`], votes: 0 });
      i++;
    }

    const pollData = {
      question: this.state.question,
      answers: answers
    };

    this.props.createNewPoll(pollData, this.props.history);
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

    return (
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <Form>
          <FormGroup>
            <Label for="examplePassword">Question</Label>
            <Input
              type="text"
              name="question"
              id="examplePassword"
              placeholder="Question placeholder"
              onChange={this.inputChangeHandler}
            />
          </FormGroup>
          <FormGroup>
            <Label for="exampleSelect">Answer options</Label>
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
          <Button onClick={this.submitPoll}>Submit</Button>
        </Form>
      </div>
    );
  }
}

export default connect(
  null,
  actions
)(withRouter(NewPoll));
