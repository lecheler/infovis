import React from 'react';
import {browserHistory} from 'react-router';
import { Button, Jumbotron, FormGroup, FormControl } from 'react-bootstrap';
import api from '../api.js';
import '../App.css';

const Main = React.createClass({
  componentWillMount() {
    this.setState( { page: this.props.params.page });
  },
  getInitialState() {
    return {
      email: ''
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
    api.addUser(this.state.email).then((result) => {
    //  console.log(result);
      browserHistory.push('/test/1'); // maybe this? https://github.com/insin/react-router-form
    });
  },
  render() {
    return (
      <div className="App container">
        <Jumbotron>
          <h1>Welcome</h1>
          <p>Description...</p>
          <FormGroup role="form">
            <FormControl value={this.state.email} onChange={this.handleChange}
              onKeyPress={this.enterListener}
              type="text" className="form-control"/>
            <Button className="btn disabled btn-primary btn-large centerButton" type="button" onClick={this.goToTest}>Send</Button>
          </FormGroup>
        </Jumbotron>
      </div>
    );
  }
});

module.exports = Main;