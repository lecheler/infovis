import React from 'react';
import { Jumbotron, Panel, Well, Button, ButtonGroup } from 'react-bootstrap';
import {browserHistory} from 'react-router';
import '../App.css';

const Choices = React.createClass({
  nextQuestion() {
    const next = parseInt(this.props.question) + 1;
    browserHistory.push('/test/' + next);
  },
  render() {
    return (
      <div className="container">
        <ButtonGroup vertical block>
          <Button>Jane Smith</Button>
          <Button>Greg Johnson</Button>
          <Button>Jeff Stevenson</Button>
          <Button>Beth Fry</Button>
        </ButtonGroup>
        <div className="container">
          <Button bsStyle="primary" onClick={this.nextQuestion}>Next</Button>
        </div>
      </div>
    );
  }
});

module.exports = Choices;

// Remember to track clicking an answer and then changing it!