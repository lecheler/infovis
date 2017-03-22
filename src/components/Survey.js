import React from 'react';
import * as survey from "survey-react";
import { browserHistory } from 'react-router';
import constants from '../constants'
import api from '../api.js';

survey.Survey.cssType = "bootstrap";


const Survey = React.createClass({
  getInitialState() {
    return {
      model: {}
    }
  },
  submitSurvey(survey) {
    api.addUser(survey.data).then((result) => {
      browserHistory.push('/test/' + result + '/1');
    }).catch((err) => {
      if (err.response.status !== 404) {
        window.error(err.response.data.message);
      }
      else {
        throw err;
      }
    });
  },
  componentWillMount() {
    this.setState( { model: new survey.Model(constants.SURVEY_DEMOGRAPHIC)});
  },
  render() {
    return (
      <div className="App container">
        <h1>Participant Information</h1>
        <div style={{textAlign: 'left'}}>
          <p>
            <i>Please complete the following survey. Your information will never be shared and we will not be able to identify partipants.</i>
          </p>
        </div>
        <survey.Survey 
          model={this.state.model} 
          onComplete={this.submitSurvey}
          css={{navigationButton: "btn btn-primary btn-large centerButton"}} />
      </div>
    );
  }
});

module.exports = Survey;