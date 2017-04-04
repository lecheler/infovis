import React from 'react';
import { browserHistory } from 'react-router';
import { Button, Navbar, Nav, NavItem, Well } from 'react-bootstrap';

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
              You are a 3rd Grade reading teacher interested in the oral reading fluency of your students. 
              You have been using a curriculum-based measure that involves counting the number of correct 
              words a student reads aloud from a passage in one minute. You know that these measurements, 
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
              You will be asked to look at various ways in which the above data can be displayed and answer 18 questions. 
              After each question, you will be asked to assess the difficulty of the task and how confident you are in your 
              answer. At the end of the test, you will be asked a few open-ended questions about your experience.
            </p>
            <p>
              In addtion to answering the questions, you will need to complete a simple, secondary task at the same time.
              The bar below will be at the top of your screen throughout the questions.
            </p>

            <Navbar style={{marginLeft: "-60px" }}>
              <Nav pullRight>
                <NavItem>
                  <div style={{lineHeight: '35px'}}>(press spacebar when green)</div>
                </NavItem> 
                <NavItem>
                  <div className="small-circle" style={{backgroundColor: '#AAD219'}} />
                </NavItem> 
              </Nav>
            </Navbar>
            <p>
              When the circle turns <font color="#AAD219">green</font>, press <em>spacebar</em>. Try it now.
            </p>
            <p>
              <b>Please do not refresh your browser or use the back and forward buttons.</b>
            </p>
          </div>
        </Well>
        <Button bsStyle="primary pull-right" onClick={this.next}>Continue</Button>
      </div>
    );
  }
});

module.exports = Directions;