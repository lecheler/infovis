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
        {
          ivType: 1,
          name: 'questions',
          questions: [{ 
            type: "radiogroup",
            name: "answer", 
            title: "Which student(s) should be given extra attention or modified instruction? ", 
            isRequired: true, 
            colCount: 2, 
            choices: [
              "Elene, Arlinda, Joseph, Sheila, and Leota",
              "Justa, Anette, Tegan, and Zackary", 
              "Sang, Damaris, Reagan, Corinne, Allegra, and Shayla", 
              "",
            ] 
          }]
        },
        {
          ivType: 1,
          name: 'questions',
          questions: [{ 
            type: "checkbox", 
            name: "answer", 
            title: "Which student(s) are making adequate progress toward their goal?", 
            isRequired: true, 
            colCount: 3, 
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
          }]
        }
      ],
    });
  },

  getInitialState() {
    return {
      model: this.getSurveyModel(1),
    }
  },

  componentWillReceiveProps(props) {
 //    console.log('question prompt receiving props = ');
 //    console.log(props);
 // //   this.setState({ model: this.getSurveyModel(this.props.question) });
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

    survey.clear();
    // this.setState({
    //   model: this.getSurveyModel(this.props.question)
    // });
  },

  handlePageChange() {
    feedbackStartTime = new Date().getTime();
    questionTime = new Date().getTime() - questionStartTime;
  },

  handleValueChange(e) {
    changes++;
  },

  render() {
    console.log('survey render...');
    const survey = (
      <Survey.Survey 
        model={this.state.model} 
        css={cssOverride}
        onValueChanged={this.handleValueChange}
        onCurrentPageChanged={this.handlePageChange}  
        onComplete={this.submitSurvey} />
    )
    return (
      <Well>
        { survey }
      </Well>
    );
  }
});

module.exports = QuestionPrompt;
