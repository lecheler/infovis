import React from 'react';
import {
  Router,
  Route,
  browserHistory,
} from 'react-router'; 
import Main from './components/Main';
import NotFound from './components/NotFound';
import './App.css';

const App = React.createClass({
  render() {
    return (
      <Router history={browserHistory} >
        <Route path="/" component={NotFound} />
        <Route path="/main/:page" component={Main} />
      </Router>
    );
  }
});

module.exports = App;
