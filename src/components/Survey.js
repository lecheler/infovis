import React from 'react';
import * as survey from "survey-react";
import { browserHistory } from 'react-router';
import constants from '../constants'
import api from '../constants.js';

survey.Survey.cssType = "bootstrap";


const Survey = React.createClass({
  getInitialState() {
    return {
      model: {}
    }
  },
  submitSurvey(survey) {
    console.log(survey.data);
    browserHistory.push('/test/1');
  },
  componentWillMount() {
    this.setState( { model: new survey.Model(constants.SURVEY_DEMOGRAPHIC)});
  },
  render() {
    return (
      <div className="App container">
        <h1>Participant Information</h1>
        Please complete the following survey.
        <survey.Survey
          model={this.state.model} 
          onComplete={this.submitSurvey}
          css={{navigationButton: "btn btn-primary btn-large centerButton"}} />
      </div>
    );
  }
});

module.exports = Survey;