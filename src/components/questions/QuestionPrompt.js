import React from 'react';
import * as Survey from "survey-react";
import { Well } from 'react-bootstrap';

import questionData from './questionData';

Survey.defaultBootstrapCss.navigationButton = "btn btn-primary";
Survey.Survey.cssType = "bootstrap";

// This is bad, but putting it in the component state (or parent state) causes submit to be called twice
let questionStartTime = 0;
let feedbackStartTime = 0;
let questionTime = 0;
let feedbackTime = 0;
let changes = 0;

var cssOverride = {
  "text": "form-control small", 
};

const QuestionPrompt = React.createClass({

  componentDidMount() {
    console.log('questionPrompt mounted!');
    questionStartTime = new Date().getTime();
  },

  getSurveyModel(val) {
    return new Survey.Model(
    {
      showQuestionNumbers: false,
      showNavigationButtons: true,
      requiredText: "",
      showCompletedPage: false,
      pageNextText: 'Answer',
      pagePrevText: 'Go Back',
      completeText: 'Next',
      pages: [
        questionData.questions[val-1],
        questionData.ratings
      ],
    });
  },

  getInitialState() {
    return {
      model: this.getSurveyModel(this.props.question),
    }
  },

  submitSurvey(survey) {

    let val = survey.data;
    val.feedbackTime = new Date().getTime() - feedbackStartTime;
    val.questionTime = questionTime;
    val.changes = changes;

    // reset values for each question
    changes = 0;
    questionStartTime = new Date().getTime();

    this.props.next(val);

    this.setState({
      model: this.getSurveyModel(this.props.question)
    });
  },

  handlePageChange() {
    feedbackStartTime = new Date().getTime();
    questionTime = new Date().getTime() - questionStartTime;
  },

  handleValueChange(e) {
    changes++;
  },

  render() {
    return (
      <Well>
        <Survey.Survey 
          model={this.state.model} 
          css={cssOverride}
          onValueChanged={this.handleValueChange}
          onCurrentPageChanged={this.handlePageChange}  
          onComplete={this.submitSurvey} />
      </Well>
    );
  }
});

module.exports = QuestionPrompt;
