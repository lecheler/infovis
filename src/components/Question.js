import React from 'react';
import { browserHistory } from 'react-router';
import { Button, ButtonGroup, ProgressBar, Well } from 'react-bootstrap';
import Table from './Table';
import ClassDrag from './iv/ClassDrag';
import ClassView from './iv/ClassView';
import StudentHypothetical from './iv/StudentHypothetical';
import Chart from './Chart';
import Modal from './Modal';

import data from './data';
import api from '../api.js';
import '../App.css';

let availableTypes = [1, 2, 3];

const Question = React.createClass({
  getInitialState() {
    return {
      questions: data.QUESTIONS,
      userID: null,
      displayType: this.getRandomType(1)
    }
  },
  nextQuestion() {
 //   api.logActivity(this.state.userID, 2);
    const next = parseInt(this.props.params.question, 10)+1

    if (next > data.QUESTIONS.length) {
      alert('done!');
      return;
    }

    this.setState( 
    { 
      displayType: this.getRandomType(next)
    });

    browserHistory.push('/test/' + this.props.params.userID + '/' + next);
  },
  getRandomType(num) {
    const randomIndex = Math.floor(Math.random() * availableTypes.length);
    const value = availableTypes[randomIndex];

    availableTypes.splice(randomIndex, 1);

    const m = num % 3;

    if (m == 0) {
      availableTypes = [1, 2, 3];
    }
    return value;
  },

  render() {
    const question = this.state.questions[this.props.params.question-1];

    let iv = (
      <div>Something went wrong...</div>
    );

    if (this.state.displayType === 1) {
      iv = (<Table student='10' />);
    } else if (this.state.displayType === 2) {
      iv = (<Chart />);
    } else {
      iv = (<StudentHypothetical />);
      if (question.ivType === 1) {
        iv = (<ClassView />);
      } else if (question.ivType === 2) {
        iv = (<ClassDrag />);
      }
    }
    iv = (<Table />);
    
    return (
      <div className="App container">
        <h1>Question {this.props.params.question} of {data.QUESTIONS.length}</h1>
        <ProgressBar bsStyle="success" now={(this.props.params.question-1)/data.QUESTIONS.length*100} />
        <Well>{question.text} ({question.ivType})</Well>
        { iv }
       <div className="container">
         <Button bsStyle="primary" onClick={this.nextQuestion}>Next</Button>
       </div>
      </div>
    );
  }
});

module.exports = Question;