import React from 'react';
import { connect } from 'react-redux';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

export class NewPoll extends React.Component {
  state = {
    answerOptions: 2
  };

  answerOptionSelector = e => {
    this.setState({ answerOptions: e.target.value });
  };

  render() {
    let counter = 1;

    let answerBoxes = [];
    while (counter <= this.state.answerOptions) {
      answerBoxes.push(
        <FormGroup key={counter}>
          <Label for="exampleText">Answer {counter}</Label>
          <Input type="text" name="text" id="exampleText" />
        </FormGroup>
      );
      counter++;
    }

    console.log(answerBoxes);

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
          {/* <FormGroup>
            <Label for="exampleText">Text Area</Label>
            <Input type="textarea" name="text" id="exampleText" />
          </FormGroup> */}

          <Button>Submit</Button>
        </Form>
      </div>
    );
  }
}

export default NewPoll;
