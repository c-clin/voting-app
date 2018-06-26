import React from 'react';
import { ListGroupItem } from 'reactstrap';

const PollListItem = props => {
  return (
    <div>
      <ListGroupItem disabled tag="a" href="#">
        {props.question}
      </ListGroupItem>
    </div>
  );
};

export default PollListItem;
