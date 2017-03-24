import React from 'react';
import { browserHistory } from 'react-router';
import { ProgressBar } from 'react-bootstrap';
import Table from './Table';
import ClassDrag from './iv/ClassDrag';
import ClassView from './iv/ClassView';
import StudentHypothetical from './iv/StudentHypothetical';
import MultipleSelect from './questions/QuestionPrompt';
import questionData from './questions/questionData';


let availableTypes = [1, 2, 3];

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

    if (next > questionData.questions.length) {
      browserHistory.push('/test/' + this.props.params.userID + '/' + next);
      return;
    }

    // api call here to save question data

    browserHistory.push('/test/' + this.props.params.userID + '/' + next);
  },

  getRandomType(num) {
    const randomIndex = Math.floor(Math.random() * availableTypes.length);
    const value = availableTypes[randomIndex];

    availableTypes.splice(randomIndex, 1);

    const m = num % 3;

    if (m === 0) {
      availableTypes = [1, 2, 3];
    }
    return value;
  },

  submitSurvey() {
    console.log('submitting survey!');
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

    iv = <Table />;
   // iv = <ClassDrag />;

    // let iv = (
    //   <div>Something went wrong...</div>
    // );

    // if (this.state.displayType === 1) {
    //   iv = (<Table />);
    // } else if (this.state.displayType === 2) {
    //   iv = (<Table />);
    // } else {
    //   iv = (<StudentHypothetical />);
    //   if (question.ivType === 1) {
    //     iv = (<ClassView />);
    //   } else if (question.ivType === 2) {
    //     iv = (<ClassDrag />);
    //   }
    // }
 //   iv = (<ClassDrag />);
    
    return (
      <div className="App container">
        
        <div className="container" style={{textAlign: 'left'}}>
          <h3>Question {this.props.params.question} of {questionData.questions.length}</h3>
          <ProgressBar bsStyle="success" now={(this.props.params.question-1)/questionData.questions.length*100} />
          <MultipleSelect next={this.nextQuestion} pageChange={this.pageChange} question={this.props.params.question} />
        </div>
        <div className="container iv-container">
          { iv }
        </div>
      </div>
    );
  }
});

module.exports = Question;