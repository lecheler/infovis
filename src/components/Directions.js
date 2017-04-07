import React from 'react';
import { browserHistory } from 'react-router';
import { Button, Navbar, Nav, NavItem, ProgressBar, Well } from 'react-bootstrap';

const Directions = React.createClass({
  getInitialState() {
    return {
      secondaryActive: true,
    };
  },

  componentWillMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  },

  handleKeyDown(e) {
    if (e.code === 'Space') {
      if (this.state.secondaryActive) {
        this.setState({ 
         secondaryActive: false,
        });
      }
      e.preventDefault();  
    }
  },

  next() {
    browserHistory.push('/test/' + this.props.params.userID + '/1');
  },

  render() {
    let btn = <Button className="pull-right" bsStyle="primary" onClick={this.next} disabled>Submit</Button>;
    let instruction = <div />
    if (!this.state.secondaryActive) {
      btn = <Button className="pull-right" bsStyle="primary" onClick={this.next}>Start</Button>;
      instruction = <p>Clikc <em>Start</em> to begin the test.</p>
    }
    const col = this.state.secondaryActive ? '#AAD219' : '#e6e6e6';
    return (
      <div className="container">
        <h1>Directions</h1>
        <Well>
          <div style={{textAlign: 'left'}}>
            <h4>Scenario</h4>
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
            <h4>Tasks</h4>
            <p>
              You will be asked to look at various ways in which the above data can be displayed and answer 18 questions. 
              After each question, you will be asked to assess the difficulty of the task and how confident you are in your 
              answer. At the end of the test, you will be asked a few open-ended questions about your experience.
            </p>
            <p>
              In addtion to answering the questions, you will need to complete a simple, secondary task at the same time.
              The bar below will be at the top of your screen throughout the questions.
            </p>

            <div>
              <div pullRight>
                <div className="small-circle" style={{backgroundColor: col }} />
              </div>
              <div pullRight>
                <div style={{lineHeight: '50px', paddingRight: '10px'}}>(press spacebar when green)</div>          
              </div>
            </div>

            <p>
              When the circle turns <font color="#AAD219">green</font>, press <em>spacebar</em>. <b>Try it now.</b>
            </p>
            { instruction }
          </div>
        </Well>
        { btn }
      </div>
    );
  }
});

module.exports = Directions;