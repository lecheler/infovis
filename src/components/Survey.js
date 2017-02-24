import React from 'react';
import * as survey from "survey-react";
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
  },
  componentWillMount() {
    this.setState( { model: new survey.Model(constants.SURVEY_DEMOGRAPHIC)});
  },
  render() {
    return (
      <div>
        <survey.Survey model={this.state.model} onComplete={this.submitSurvey} />
      </div>
    );
  }
});

module.exports = Survey;