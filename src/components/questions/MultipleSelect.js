import React from 'react';
import * as Survey from "survey-react";
import { browserHistory } from 'react-router';
import { Button, Well } from 'react-bootstrap';
import questionData from './questionData';

const questions = questionData.questions;

Survey.defaultBootstrapCss.navigationButton = "btn btn-primary";
Survey.Survey.cssType = "bootstrap";

const MultipleSelect = React.createClass({

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
    this.props.next(survey);
  },
  
  componentWillMount() {
   // this.setState( { model: new survey.Model(constants.SURVEY_DEMOGRAPHIC)});
  },

  showFeedbackModal() {
  //  this.setState({showFeedback: true});
  },

  goToNextPage() {
    // if (survey.isLastPage) {
    //   survey.completeLastPage();
    // } else {
    //   survey.nextPage();
    // }
  },

  pageChange() {
    console.log('page changed');
  //  this.setState({showFeedback: true});
  },

  render() {
    return (
      <Well>
        <Survey.Survey model={this.state.model}  onComplete={this.submitSurvey} />
      </Well>
    );
  }
});

module.exports = MultipleSelect;
