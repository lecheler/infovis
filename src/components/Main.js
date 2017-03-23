import React from 'react';
import { browserHistory } from 'react-router';
import { Button, Checkbox } from 'react-bootstrap';

import '../App.css';

const Main = React.createClass({
  componentWillMount() {
    this.setState( { page: this.props.params.page });
  },
  getInitialState() {
    return {
      checked: false,
    }
  },
  goToDemographics() {
    if (this.state.checked) {
      browserHistory.push('/survey');
    }
  },
  toggleCheckbox() {
    this.setState({checked: !this.state.checked});
  },
  render() {
    const disabled = this.state.checked ? 'btn btn-primary btn-large centerButton' : 'btn disabled btn-primary btn-large centerButton';
    return (
      <div className="App container">
        <h1>Welcome</h1>
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
        <Checkbox onChange={this.toggleCheckbox}>I agree</Checkbox>
        <Button onClick={this.goToDemographics} className={disabled}>continue</Button>
      </div>
    );
  }
});

// http://surveyjs.org/examples/jquery/survey-customnavigation.html

module.exports = Main;