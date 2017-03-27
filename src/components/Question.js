import React from 'react';
import { browserHistory } from 'react-router';
import { ProgressBar } from 'react-bootstrap';
import Table from './Table';
import ClassDrag from './iv/ClassDrag';
import ClassView from './iv/ClassView';
import StudentHypothetical from './iv/StudentHypothetical';
import QuestionPrompt from './questions/QuestionPrompt';
import questionData from './questions/questionData';

import api from '../api';

const Question = React.createClass({

  getInitialState() {
    return {
      questions: questionData.questions,
      userID: null,
      questionModel: {},
      type1Table: false,
      type2Table: false,
      type3Table: false,
    }
  },

  nextQuestion(data) {    
    const next = parseInt(this.props.params.question, 10)+1

    data.questionId = parseInt(this.props.params.question, 10);
    data.userId = this.props.params.userID;
    data.answer = data.answer.toString();

    console.log(data.answer);

    api.addResponse(data).then((result) => {
      console.log(result);
    }).catch((err) => {
      if (err.response.status !== 404) {
        window.error(err.response.data.message);
      }
      else {
        throw err;
      }
    });

    if (next > questionData.questions.length) {
      browserHistory.push('/feedback/' + this.props.params.userID + '/');
      return;
    } else {
      browserHistory.push('/test/' + this.props.params.userID + '/' + next);
    }
  },

  render() {
    const question = this.state.questions[this.props.params.question-1];

    let iv;
    switch(question.ivType) {
      case 1:
        iv = <ClassView />
        break;
      case 2:
        iv = <StudentHypothetical />
        break;
      case 3:
        iv = <ClassDrag />
        break;
    }

    const useTable = Math.round(Math.random());
    const ivPrompt = useTable ? <Table /> : iv;
    
    return (
      <div className="App container">
        
        <div className="container" style={{textAlign: 'left'}}>
          <h3>Question {this.props.params.question} of {questionData.questions.length}</h3>
          <ProgressBar bsStyle="success" now={(this.props.params.question-1)/questionData.questions.length*100} />
          <QuestionPrompt next={this.nextQuestion} pageChange={this.pageChange} question={this.props.params.question} />
        </div>
        <div className="container iv-container">
          { ivPrompt }
        </div>
      </div>
    );
  }
});

module.exports = Question;