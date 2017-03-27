import React from 'react';
import * as survey from "survey-react";
import { browserHistory } from 'react-router';
import { Well } from 'react-bootstrap';
import constants from '../constants'
import api from '../api.js';

survey.Survey.cssType = "bootstrap";


const Feedback = React.createClass({
  getInitialState() {
    return {
      model: {}
    }
  },
  submitSurvey(survey) {
    api.addUser(survey.data).then((result) => {
      browserHistory.push('/directions/' + result);
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
        <h1>Feedback</h1>
        <Well>
          <div style={{textAlign: 'left'}}>
            <p>
              <i>Please complete the following survey regarding the previous questions.</i>
            </p>
          </div>
          <survey.Survey 
            model={this.state.model} 
            onComplete={this.submitSurvey}
            css={{navigationButton: "btn btn-primary btn-large centerButton"}} />
        </Well>
      </div>
    );
  }
});

module.exports = Feedback;