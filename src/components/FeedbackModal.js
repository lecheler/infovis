import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import * as Survey from "survey-react";


const survey2 = new Survey.Model(
  {
   pages: [
    {
     name: "page1",
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
       title: "How would you rate the difficulty of this question?"
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
   ]
  }
);


const FeedbackModal = React.createClass({
  componentDidMount() {
    console.log('feedbackModal mounted');
  },

  submitSurvey2() {
    console.log('submit feedback!');
 //   this.setState({ showModal: false });
 //   this.props.feedbackClose();
  },

  render() {
    return (
      <div>
        <Modal show={this.props.show}>
          <Modal.Header>
            <Modal.Title>Question Feedback</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Survey.Survey model={survey2} onComplete={this.props.feedbackClose} />
          </Modal.Body>
        </Modal>
      </div>
    );
  }
});

export default FeedbackModal;
