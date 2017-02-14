import React from 'react';
import {
  Router,
  Route,
  browserHistory,
} from 'react-router'; 
import Main from './components/Main';
import Question from './components/Question';
import About from './components/About';
// import api from './api.js';
import './App.css';

const App = React.createClass({
  componentWillMount() {
    // console.log('pinging api...');
    // api.ping().then((result) => {
    //   console.log('...' + result);
    // });
  },
  render() {
    return (
      <Router history={browserHistory} >
        <Route path="/about" component={About} />
        <Route path="/test/:question" component={Question} />
        <Route path="/" component={Main} />
      </Router>
    );
  }
});

module.exports = App;
