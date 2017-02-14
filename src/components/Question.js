import React from 'react';
import {browserHistory} from 'react-router';
import { Button, ButtonGroup, ProgressBar, Well } from 'react-bootstrap';
// import Choices from './Choices.js';
import Table from './Table.js';
import Chart from './Chart.js';
import ClassDrag from './ClassDrag.js';

import api from '../api.js';
import '../App.css';

const Question = React.createClass({
  getInitialState() {
    const type = Math.round(Math.random());
    return {
      question: 1,
      userID: null,
      type: type,
      type0Count: 0,
      type1Count: 0,
    }
  },
  nextQuestion() {
    api.logActivity(1, 2);
    const next = parseInt(this.state.question, 10)+1
    let type = Math.round(Math.random());
    let type0Count = this.state.type0Count;
    let type1Count = this.state.type1Count;

    if (type === 0) {
      type0Count++;
    } else {
      type1Count++;
    }
    if (next > 12) {
      return;
    }
    if (type0Count > 9) {
      type = 1;
    }
    if (type1Count > 9) {
      type = 0;
    }

    this.setState( 
    { 
      question: next, 
      type: type,
      type0Count: type0Count,
      type1Count: type1Count, 
    });

    browserHistory.push('/test/' + next);
  },
  componentWillMount() {
    this.setState( { question: this.props.params.question });
  },
  render() {
    let iv = (
      <Chart />
    );

    if (this.state.type === 1) {
      iv = (
        <div>
          <ClassDrag />
        </div>
      );
    }
    return (
      <div className="App container">
        <h1>Question {this.state.question} of 12</h1>
        <ProgressBar bsStyle="success" now={(this.state.question-1)/12*100} />
        <Well>What is the best way for Elena to get an 95% or above?</Well>
        { iv }
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