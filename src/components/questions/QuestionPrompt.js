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

const QuestionPrompt = React.createClass({

  componentDidMount() {
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
      question: 1,
      model: this.getSurveyModel(1),
    }
  },

  submitSurvey(survey) {

    const questionNumber = this.state.question + 1;
    this.setState({question: questionNumber, model: this.getSurveyModel(questionNumber)});

    let val = survey.data;
    questionStartTime = new Date().getTime();
    val.feedbackTime = new Date().getTime() - feedbackStartTime;
    val.questionTime = questionTime;

    this.props.next(val);
  },

  handlePageChange() {
    feedbackStartTime = new Date().getTime();
    questionTime = new Date().getTime() - questionStartTime;
  },

  render() {
    return (
      <Well>
        <Survey.Survey model={this.state.model} onCurrentPageChanged={this.handlePageChange}  onComplete={this.submitSurvey} />
      </Well>
    );
  }
});

module.exports = QuestionPrompt;
