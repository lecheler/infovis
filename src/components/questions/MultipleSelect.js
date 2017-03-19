import React from 'react';
import * as Survey from "survey-react";
import { browserHistory } from 'react-router';
// import constants from '../constants';

Survey.defaultBootstrapCss.navigationButton = "btn btn-primary";
Survey.Survey.cssType = "bootstrap";

const survey = new Survey.Model(
  { 
    questions: [
      { 
        type: "checkbox", 
        name: "car", 
        title: "Select all students that are on track to be within 10% of reaching their goals by the end of the term.", 
        isRequired: true, 
        colCount: 4, 
        choices: [
          "Elene",
          "Reagan", 
          "Zackary", 
          "Justa", 
          "Corinne", 
          "Tegan", 
          "Damaris", 
          "Shayla", 
          "Sang", 
          "Anette", 
          "Leota",
          "Joseph",
          "Shiela",
          "Arlinda",
          "Allegra",
        ] 
      }
]});

const MultipleSelect = React.createClass({
  getInitialState() {
    return {
      model: {}
    }
  },
  submitSurvey(survey) {
    console.log('submit');
    this.props.next();
  },
  componentWillMount() {
   // this.setState( { model: new survey.Model(constants.SURVEY_DEMOGRAPHIC)});
  },
  render() {
    return (
      <Survey.Survey model={survey} onComplete={this.submitSurvey} />
    );
  }
});

module.exports = MultipleSelect;