import React from 'react';
import { browserHistory } from 'react-router';
import { ProgressBar, Navbar, Nav, NavItem } from 'react-bootstrap';

import IVContainer from './iv/IVContainer';
import ResponseItem from './questions/ResponseItem';
import TLX from './questions/TLX';
import SecondaryTask from './SecondaryTask';

import questionData from './questions/questionData';
import api from '../api';

let secondaryStartTime = 0;
let secondaryTaskTimes = [];

const Question = React.createClass({
  componentWillMount() {
    console.log(this.props.params)
    window.addEventListener('keydown', this.handleKeyDown);
    secondaryStartTime = new Date().getTime();

    setTimeout(() => this.fireTimeout(this.name), Math.random()*20000 + 10); 
  },

  fireTimeout() {
    console.log('timeout!');
    this.setState({ secondaryActive: true });
  },

  getInitialState() {
    console.log('question initial state')
    return {
      testModel: this.getRandomizedTestModel(),
      secondaryActive: false,
      showFeedback: false,
    }
  },

  getRandomizedTestModel() {

    let model = [];
    for (let i=0; i<questionData.testModel.length; i++) {
      if (i > 0 && questionData.testModel[i-1].type == questionData.testModel[i].type) {
        questionData.testModel[i].useTable = !questionData.testModel[i-1].useTable 
      } else {
        questionData.testModel[i].useTable = Math.round(Math.random()) === 1;
      }
      model.push(questionData.testModel[i]);
    }


    console.log(model);
    return model;
  },

  goToNext() {
    const next = parseInt(this.props.params.question, 10)+1
    browserHistory.push('/test/' + this.props.params.userID + '/' + next);
  },

  submitFeedback(data) {
    this.setState({
      showFeedback: false,
    });

    const next = parseInt(this.props.params.question, 10)+1
    browserHistory.push('/test/' + this.props.params.userID + '/' + next);
  },

  handleKeyDown(e) {
    if (e.code === 'Space') {

      const secondaryTime = new Date().getTime() - secondaryStartTime;
      secondaryTaskTimes.push(secondaryTime);

      secondaryStartTime = new Date().getTime();
      this.setState({ secondaryActive: false });

  //    setTimeout(() => this.fireTimeout(this.name), Math.random()*20000 + 10); 
      e.preventDefault();
    }
  },

  // nextQuestion(data) {    
  //   console.log(secondaryTaskTimes);

  //   const next = parseInt(this.props.params.question, 10)+1

  //   data.questionId = parseInt(this.props.params.question, 10);
  //   data.userId = this.props.params.userID;

  //   api.addResponse(data).then((result) => {
  //     console.log(result);
  //   }).catch((err) => {
  //     if (err.response.status !== 404) {
  //       window.error(err.response.data.message);
  //     }
  //     else {
  //       throw err;
  //     }
  //   });

  //   if (next > questionData.questions.length) {
  //     browserHistory.push('/feedback/' + this.props.params.userID + '/');
  //     return;
  //   } else {
  //     this.setState({
  //       showFeedback: true,
  //     });
  //    // browserHistory.push('/test/' + this.props.params.userID + '/' + next);
  //   //  this.setState({ ivPrompt: this.getIvPrompt() });
  //   }
  // },

  render() {
    const col = this.state.secondaryActive ? '#AAD219' : '#e6e6e6';

    return (
      <div className="App container question">
        <div className="container iv-container">
          <ResponseItem
            question={parseInt(this.props.params.question, 10)}
            goToNext={this.goToNext}
          />
          <IVContainer 
            blockId={this.state.testModel[this.props.params.question-1].blockId}
            useTable={this.state.testModel[this.props.params.question-1].useTable}
          />
        </div>
        <Navbar fixedTop={true}>
          <Nav pullLeft>
            <div style={{lineHeight: '20px', paddingTop: '5px'}}>
              Question {this.props.params.question} of {this.state.testModel.length}
              <ProgressBar 
                className='progress' 
                now={(this.props.params.question-1)/this.state.testModel.length*100} 
                style={{marginTop: '5px', marginBottom: '5px'}} />
            </div>
          </Nav>
          <Nav pullRight>
            <div className="small-circle" style={{backgroundColor: col, marginTop: '8px' }} />
          </Nav>
          <Nav pullRight>
            <div style={{lineHeight: '50px', paddingRight: '10px'}}>(press spacebar when green)</div>          
          </Nav>
        </Navbar>
        <TLX show={this.state.showFeedback} submit={this.submitFeedback} />
      </div>
    );
  }
});

module.exports = Question;