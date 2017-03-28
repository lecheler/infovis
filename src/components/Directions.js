import React from 'react';
import { browserHistory } from 'react-router';
import { Button, Well } from 'react-bootstrap';

const Directions = React.createClass({
  next() {
    browserHistory.push('/test/' + this.props.params.userID + '/1');
  },
  render() {
    return (
      <div className="App container">
        <h1>Directions</h1>
        <Well>
          <div style={{textAlign: 'left'}}>
            <p>
              You are a 5th Grade reading teacher interested in the oral reading fluency of your students. 
              You have been using a curriculum-based measure that involves counting the number of correct 
              words read aloud from a passage by the student in one minute. You know that these measurements, 
              when done frequently and consistently throughout the term, are a great predictor of long-term reading success.
            </p>
            <p>
              All 15 of your students have completed 10 of 16 assessments so far. While each student initially tested at very 
              different levels, you set all of their end of year goals to the <b>115 words per minute</b> recommended by the test publisher. 
              However, you’re now seeing that many of your students are losing motivation – some are getting bored from the lack of 
              challenge, while others are becoming frustrated by consistently missing their goals. <b>You know from experience that students 
              who are within 10% of achieving their goals are most motivated and successful.</b>
            </p>
            <p>
              You will be asked to look at various ways in which the above data can be displayed and answer 18 questions. After each question, you will be asked to assess the difficulty of the task and how confident you are in your answer. At the end of the test, you will be asked a few open-ended questions about your experience.
            </p>
            <p>
              <b>Please do not refresh your browser or use the back and forward buttons.</b>
            </p>
          </div>
          <div className="container">
            <Button bsStyle="primary" onClick={this.next}>Continue</Button>
          </div>
        </Well>
      </div>
    );
  }
});

module.exports = Directions;