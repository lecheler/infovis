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
  goToTest() {
    api.addUser(this.state.email).then((result) => {
      browserHistory.push('/test/1'); // maybe this? https://github.com/insin/react-router-form
    });
  },
  render() {
    return (
      <div className="App container">
        <Jumbotron>
          <h1>Welcome</h1>
          <p>What follows is a test of pedagogical reasoning skills.</p>
          <form onSubmit={this.goToTest}>
            <FormGroup role="form">
              <FormControl value={this.state.email} onChange={this.handleChange} type="text" className="form-control"/>
              <Button className="btn btn-primary btn-large centerButton" type="submit">Send</Button>
            </FormGroup>
          </form>
        </Jumbotron>
      </div>
    );
  }
});

module.exports = Main;