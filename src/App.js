import React from 'react';
import {
  Router,
  Route,
  browserHistory,
} from 'react-router'; 
import Main from './components/Main';
import About from './components/About';
import NotFound from './components/NotFound';
import Api from './api.js';
import './App.css';

const App = React.createClass({
  componentWillMount() {
    console.log('pinging api...');
    Api.ping().then((result) => {
      console.log('...' + result);
    });
  },
  render() {
    return (
      <Router history={browserHistory} >
        <Route path="/about" component={About} />
        <Route path="/main" component={Main} />
      </Router>
    );
  }
});

module.exports = App;
