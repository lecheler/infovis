import React from 'react';
import * as Survey from "survey-react";
import { browserHistory } from 'react-router';
import { Button } from 'react-bootstrap';

import FeedbackModal from '../FeedbackModal';

// import constants from '../constants';

Survey.defaultBootstrapCss.navigationButton = "btn btn-primary";
Survey.Survey.cssType = "bootstrap";

// const survey = new Survey.Model(
//   { 
//     questions: [
//       { 
//         type: "checkbox", 
//         name: "q1", 
//         title: "Select all students that are on track to be within 10% of reaching their goals by the end of the term.", 
//         isRequired: true, 
//         colCount: 4, 
//         choices: [
//           "Elene",
//           "Reagan", 
//           "Zackary", 
//           "Justa", 
//           "Corinne", 
//           "Tegan", 
//           "Damaris", 
//           "Shayla", 
//           "Sang", 
//           "Anette", 
//           "Leota",
//           "Joseph",
//           "Shiela",
//           "Arlinda",
//           "Allegra",
//         ] 
//       }
// ]});

// const q2 = new Survey.Model(
// {
//   type: "radiogroup",
//   choices: [
//     {
//      value: "1",
//      text: "Elene"
//     },
//     {
//      value: "2",
//      text: "Sang"
//     },
//     {
//      value: "3",
//      text: "Sheila"
//     },
//     {
//      value: "4",
//      text: "Justa"
//     }
//   ],
//   name: "q2",
//   title: "Who is the best?"
//   }
// )


const survey = new Survey.Model(
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
     name: "q1",
     questions: [
      {
       type: "radiogroup",
       isRequired: true,
       choices: [
        {
         value: "1",
         text: "Elene"
        },
        {
         value: "2",
         text: "Sang"
        },
        {
         value: "3",
         text: "Sheila"
        },
        {
         value: "4",
         text: "Justa"
        }
       ],
       name: "q2",
       title: "Who is the best?"
      }
     ]
    },
     {
      name: "feedback",
     questions: [
      {
       type: "rating",
       isRequired: true,
       maxRateDescription: "very difficult",
       minRateDescription: "very easy",
       name: "difficulty",
       rateValues: [
        "easy - 1",
        "2",
        "3",
        "4",
        "5 - difficult"
       ],
       title: "How difficult was this question?"
      },
      {
       type: "rating",
       isRequired: true,
       maxRateDescription: "very confident",
       minRateDescription: "not at all confident",
       name: "confidence",
       rateValues: [
        "not confident - 1",
        "2",
        "3",
        "4",
        "5 - confident"
       ],
       title: "How confident are you in your answer?"
      },
      {
       type: "rating",
       isRequired: true,
       maxRateDescription: "very much",
       minRateDescription: "not at all",
       name: "experience",
       rateValues: [
        "not at all - 1",
        "2",
        "3",
        "4",
        "5 - very much"
       ],
       title: "How much did you enjoy answering this question?"
      }
     ]
    }
   ],

  }
);


// const survey = Survey.Model(
//  {
//  pages: [
//   {
//    name: "page1",
//    questions: [
//     {
//      type: "radiogroup",
//      choices: [
//       {
//        value: "1",
//        text: "first item"
//       },
//       {
//        value: "2",
//        text: "second item"
//       },
//       {
//        value: "3",
//        text: "third item"
//       }
//      ],
//      name: "question1"
//     }
//    ]
//   },
//   {
//    name: "page2",
//    questions: [
//     {
//      type: "rating",
//      name: "question2"
//     },
//     {
//      type: "rating",
//      name: "question3"
//     },
//     {
//      type: "rating",
//      name: "question4"
//     }
//    ]
//   }
//  ]
// }
// );

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
    {
     name: val,
     questions: [
      {
       type: "radiogroup",
       isRequired: true,
       choices: [
        {
         value: "1",
         text: "Elene"
        },
        {
         value: "2",
         text: "Sang"
        },
        {
         value: "3",
         text: "Sheila"
        },
        {
         value: "4",
         text: "Justa"
        }
       ],
       name: "q2",
       title: questions[val-1]
      }
     ]
    },
     {
      name: "feedback",
     questions: [
      {
       type: "rating",
       isRequired: true,
       maxRateDescription: "very difficult",
       minRateDescription: "very easy",
       name: "difficulty",
       rateValues: [
        "easy - 1",
        "2",
        "3",
        "4",
        "5 - difficult"
       ],
       title: "How difficult was this question?"
      },
      {
       type: "rating",
       isRequired: true,
       maxRateDescription: "very confident",
       minRateDescription: "not at all confident",
       name: "confidence",
       rateValues: [
        "not confident - 1",
        "2",
        "3",
        "4",
        "5 - confident"
       ],
       title: "How confident are you in your answer?"
      },
      {
       type: "rating",
       isRequired: true,
       maxRateDescription: "very much",
       minRateDescription: "not at all",
       name: "experience",
       rateValues: [
        "not at all - 1",
        "2",
        "3",
        "4",
        "5 - very much"
       ],
       title: "How much did you enjoy answering this question?"
      }
     ]
    }
   ],

  }
);
  },
  getInitialState() {
    return {
      question: 1,
      model: this.getSurveyModel(1),
    }
  },
  submitSurvey(survey) {
    console.log(survey.data);
    survey.clear();
    this.setState({question: 2, mode: this.getSurveyModel(2)});
    this.props.next();
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
      <div>
        Question: {this.state.question}
        <Survey.Survey model={this.state.model}  onComplete={this.submitSurvey} />
      </div>
    );
  }
});

module.exports = MultipleSelect;

const questions = [
  "Who is the best",
  "Who is the worst"
]

// <FeedbackModal show={this.state.showFeedback} feedbackClose={this.goToNextPage} />
// <Button style={{marginRight: '5px'}} onClick={this.goToNextPage}>Next</Button>
// onCurrentPageChanged={this.goToNext}