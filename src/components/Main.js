import React from 'react';
import {browserHistory} from 'react-router';
import { Button, Jumbotron, FormGroup, FormControl } from 'react-bootstrap';
import Choices from './Choices.js';
import Table from './Table.js';
import logo from '../logo.svg';
import '../App.css';

const Main = React.createClass({
  componentWillMount() {
    this.setState( { page: this.props.params.page });
  },
  goToTest() {
    browserHistory.push('/test/1');
  },
  render() {
    return (
      <div className="App container">
        <Jumbotron>
          <h1>Main</h1>
          <p>What follows is a test of pedagogical reasoning skills.</p>
          <FormGroup>
            <FormControl type="text" placeholder="Enter Email" />
          </FormGroup>
          {' '}
          <Button type="submit" bsStyle="primary" onClick={this.goToTest}>START</Button>
        </Jumbotron>
      </div>
    );
  }
});

module.exports = Main;