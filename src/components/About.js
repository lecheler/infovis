import React from 'react';
import {browserHistory} from 'react-router';
import { Button, Jumbotron } from 'react-bootstrap';
import Choices from './Choices.js';
import logo from '../logo.svg';
import '../App.css';

const App = React.createClass({
  componentWillMount() {
    this.setState( { page: this.props.params.page });
  },
  goToMain() {
    browserHistory.push('/main');
  },
  render() {
    return (
      <div className="App container">
        <Jumbotron>
          <h1>About</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sollicitudin quam a mattis condimentum. Integer varius, lectus in finibus facilisis, est arcu vehicula tellus, faucibus sagittis magna ligula sit amet turpis. Nulla malesuada diam in vestibulum dapibus. Curabitur dignissim lectus nisi. Nulla facilisi. Integer congue erat dui, vel elementum ligula hendrerit in. Integer malesuada neque vel sem cursus, nec viverra lectus ultricies. Donec neque est, commodo quis iaculis sed, rutrum quis nulla.</p>
          <p><Button bsStyle="primary" onClick={this.goToMain}>Return to the test</Button></p>
        </Jumbotron>
      </div>
    );
  }
});

module.exports = App;