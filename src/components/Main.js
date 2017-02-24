import React from 'react';
import {browserHistory} from 'react-router';
import { Button, Jumbotron, FormGroup, FormControl } from 'react-bootstrap';
import api from '../api.js';
import '../App.css';

import constants from '../constants'

import Survey from './Survey';

const Main = React.createClass({
  componentWillMount() {
    this.setState( { page: this.props.params.page });
  },
  getInitialState() {
    return {
      email: '',
    }
  },
  handleChange(event) {
     this.setState({email: event.target.value});
  },
  enterListener(event) {
    if (event.key === 'Enter') {
      this.goToTest();
    }
  },
  goToTest() {
    if(this.state.email.length < 1) {
      alert('Please enter an email');
      return;
    }
    api.addUser(this.state.email).then((result) => {
    //  console.log(result);
      browserHistory.push('/test/1'); // maybe this? https://github.com/insin/react-router-form
    });
  },
  render() {
    const desc = (
      <div style={{textAlign: 'left'}}>
        <p>
          You are being invited to participate in a research study about explain the study’s purpose in a few words. 
          This study is being conducted by insert name of PI and name of faculty sponsor (if PI is a student), from the insert 
          department affiliation at Michigan Technological University. If PI is a student, indicate that the study is being 
          conducted as part of an undergraduate project, graduate student project, thesis, or dissertation. If funded, identify 
          the funding agency.
        </p>
        <p>
          There are no known risks if you decide to participate in this research study. There are no costs to you for participating 
          in the study. The information you provide will briefly explain what the information is being used for. The questionnaire 
          will take about approximate amount of time to complete. The information collected may not benefit you directly, but the 
          information learned in this study should provide more general benefits.
        </p>
        <p>
          This survey is anonymous. Do not write your name on the survey. If this is a web-based survey, indicate how you will 
          provide anonymity (e.g., not collect IP addresses) Also indicate that absolute anonymity cannot be guaranteed over the 
          Internet. No one will be able to identify you or your answers, and no one will know whether or not you participated in the 
          study. Individuals from give name of the funding agency, if any, and the Institutional Review Board may inspect these records. 
          Should the data be published, no individual information will be disclosed.
        </p>
      </div>
    )
    const btnClass = this.state.email.length > 0 ? 'btn btn-primary btn-large centerButton' : 'btn disabled btn-primary btn-large centerButton';
    return (
      <div className="App container">
        <h1>Welcome</h1>
        {desc}
        <Jumbotron>
          <FormGroup role="form">
            <FormControl value={this.state.email} onChange={this.handleChange}
              onKeyPress={this.enterListener}
              type="text" className="form-control"/>
            <Button className={btnClass} type="button" onClick={this.goToTest}>Send</Button>
          </FormGroup>
          <Survey />
        </Jumbotron>
      </div>
    );
  }
});

// http://surveyjs.org/examples/jquery/survey-customnavigation.html

module.exports = Main;