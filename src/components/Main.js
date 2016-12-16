import React from 'react';
import {browserHistory} from 'react-router';
import { Button, Jumbotron, FormGroup, FormControl } from 'react-bootstrap';
import Choices from './Choices.js';
import logo from '../logo.svg';
import '../App.css';

const Main = React.createClass({
  componentWillMount() {
    this.setState( { page: this.props.params.page });
  },
  goToAbout() {
    browserHistory.push('/about');
  },
  render() {
    return (
      <div className="App container">
        <Jumbotron>
          <h1>Main</h1>
          <p>What follows is a test of pedagogical reasoning skills.</p>
          <p><Button bsStyle="primary" onClick={this.goToAbout}>About</Button></p>
          <FormGroup>
            <FormControl type="text" placeholder="Search" />
          </FormGroup>
          {' '}
          <Button type="submit">Submit</Button>
        </Jumbotron>
      </div>
    );
  }
});

module.exports = Main;