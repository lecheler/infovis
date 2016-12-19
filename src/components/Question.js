import React from 'react';
import {browserHistory} from 'react-router';
import { Button, ButtonGroup, ProgressBar, Well } from 'react-bootstrap';
import Choices from './Choices.js';
import Table from './Table.js';
import api from '../api.js';
import '../App.css';

const Question = React.createClass({
  getInitialState() {
    return {
      question: 1,
      userID: null,
    }
  },
  nextQuestion() {
    api.logActivity(1, 2);
    const next = parseInt(this.state.question)+1
    if (next > 18) {
      return;
    }
    this.setState( { question: next });
    browserHistory.push('/test/' + next);
  },
  componentWillMount() {
    this.setState( { question: this.props.params.question });
  },
  render() {
    return (
      <div className="App container">
        <h1>Question {this.state.question} of 18</h1>
        <ProgressBar bsStyle="success" now={this.state.question/18*100} />
        <Well>What is the best way for Elena to get an 95% or above?</Well>
        <Table />
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

module.exports = Question;