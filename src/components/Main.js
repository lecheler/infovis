import React from 'react';
import logo from '../logo.svg';
import '../App.css';

const App = React.createClass({
  componentWillMount() {
    this.setState( { page: this.props.params.page });
  },
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React (npm run build worked!)</h2>
        </div>
        <p className="App-intro">
          { this.state.page }
        </p>
      </div>
    );
  }
});

module.exports = App;