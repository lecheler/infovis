import React from 'react';
import { browserHistory } from 'react-router';
// import cookie from 'react-cookie';
import { ProgressBar, Navbar, Nav, NavItem } from 'react-bootstrap';

import IVContainer from './iv/IVContainer';
import ResponseItem from './questions/ResponseItem';
import TLX from './questions/TLX';
import SecondaryTask from './SecondaryTask';

import questionData from './questions/questionData';
import api from '../api';

const Question = React.createClass({

  componentWillMount() {
    window.addEventListener('keydown', this.handleKeyDown);
    setTimeout(() => this.fireTimeout(this.name), Math.random()*20000 + 10000); 
  },

  fireTimeout(val) {
    if (this.state.showFeedback) { // question answered before task turned green
      this.setState({
        secondaryActive: false,
      });
    } else {
      this.setState({ 
        secondaryActive: true,
        secondaryStartTime: new Date().getTime(),
      });
    }
  },

  getInitialState() {
    console.log('getInitialState');
    return {
      testModel: this.getRandomizedTestModel(),
      secondaryActive: false,
      secondaryTime: -1,
      secondaryStartTime: 0,
      showFeedback: false,
      feedbackStartTime: 0,
      answerStartTime: new Date().getTime(),
    }
  },

  getRandomizedTestModel() {

    let model = [];
    for (let i=0; i<questionData.testModel.length; i++) {
      if (i > 0 && questionData.testModel[i-1].type == questionData.testModel[i].type) {
        questionData.testModel[i].useTable = false;//!questionData.testModel[i-1].useTable 
      } else {
        questionData.testModel[i].useTable = Math.round(Math.random()) === 1;
      }
      model.push(questionData.testModel[i]);
    }
  //  const m = JSON.stringify(model);
 //   cookie.save('model', m, { path: '/' });
  //  console.log(JSON.stringify(model));
    return model;
  },

  goToNext(val, changes) {

    const question = this.state.testModel[this.props.params.question-1];
    const answer ={
      userId: parseInt(this.props.params.userID, 10),
      questionId: parseInt(this.props.params.question, 10),
      blockId: question.blockId,
      type: question.type,
      answer: val,
      answerTime: new Date().getTime() - this.state.answerStartTime,
      secondaryTaskTime: this.state.secondaryTime,
      answerChanges: changes,
      prompt: question.useTable ? 0 : 1,
    };

    console.log(this.props.params.question)

    api.addAnswer(answer).then((result) => {
      if (this.state.testModel[this.props.params.question-1].blockId != this.state.testModel[this.props.params.question].blockId
            || this.props.params.question === this.state.testModel.length) {
        console.log('show feedback')
        this.setState({
          showFeedback: true,
          feedbackStartTime: new Date().getTime(),
        });
        // also need to kill timer in case question was answered before timer fired.
      } else {
        this.setStateAndNavigate();
      }
    }).catch((err) => {
      if (err.response.status !== 404) {
        window.error(err.response.data.message);
      }
      else {
        throw err;
      }
    });
  },

  setStateAndNavigate() {
    const next = parseInt(this.props.params.question, 10)+1
    browserHistory.push('/test/' + this.props.params.userID + '/' + next);
    this.setState({
      showFeedback: false,
      secondaryActive: false,
      secondaryTime: -1,
      secondaryStartTime: 0,
      answerTime: 0,
      feedbackTime: 0,
    });
    setTimeout(() => this.fireTimeout(this.name), Math.random()*20000 + 10000); 
  },

  submitFeedback(data) {
    const question = this.state.testModel[this.props.params.question-1];
    const feedback = {
      userId: parseInt(this.props.params.userID, 10),
      blockId: question.blockId,
      mental: data[0].score,
      temporal: data[1].score,
      performance: data[2].score,
      effort: data[3].score,
      frustration: data[4].score,
      feedbackTime: new Date().getTime() - this.state.feedbackStartTime,
    };

    api.addFeedback(feedback).then((feedback) => {
      this.setStateAndNavigate();
    }).catch((err) => {
    if (err.response.status !== 404) {
      window.error(err.response.data.message);
    }
    else {
      throw err;
    }
    });
  },

  handleKeyDown(e) {
    if (e.code === 'Space') {
      if (this.state.secondaryActive) {
        this.setState({ 
         secondaryActive: false,
         secondaryTime: new Date().getTime() - this.state.secondaryStartTime,
        });
        console.log(this.state.secondaryTime);
      }
      e.preventDefault();  
    }
  },

  render() {
    const col = this.state.secondaryActive ? '#AAD219' : '#e6e6e6';

    return (
      <div className="App container question">
        <div>
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
            <div style={{paddingTop: '5px', marginLeft: '-15px'}}>
              Question {this.props.params.question} of {this.state.testModel.length}
              <ProgressBar 
                className='progress' 
                now={(this.props.params.question-1)/this.state.testModel.length*100} 
                style={{marginTop: '5px', marginBottom: '5px'}} />
            </div>
          </Nav>
          <Nav pullRight>
            <div className="small-circle" style={{backgroundColor: col }} />
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