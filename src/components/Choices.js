import React from 'react';
import { Jumbotron, Panel, Well, Button, ButtonGroup } from 'react-bootstrap';
import '../App.css';

const Choices = React.createClass({
  render() {
    return (
      <div className="container">
        <Well>Which student is most likely to succeed?</Well>
        <ButtonGroup vertical block>
          <Button>Jane Smith</Button>
          <Button>Greg Johnson</Button>
          <Button>Jeff Stevenson</Button>
          <Button>Beth Fry</Button>
        </ButtonGroup>
        <div className="container">
          <Button bsStyle="primary">Continue</Button>
        </div>
      </div>
    );
  }
});

module.exports = Choices;

// Remember to track clicking an answer and then changing it!