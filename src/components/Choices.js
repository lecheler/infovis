import React from 'react';
import { Jumbotron, Panel, Well, Button, ButtonGroup } from 'react-bootstrap';
import '../App.css';

const App = React.createClass({
  render() {
    return (
      <div>
        <Jumbotron>
          <h1>Hello, world!</h1>
          <p>This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
          <p><Button bsStyle="primary">Learn more</Button></p>
        </Jumbotron>
        <Well>Which student is most likely to succeed?</Well>
        <ButtonGroup vertical block>
          <Button>Jane Smith</Button>
          <Button>Greg Johnson</Button>
          <Button>Jeff Stevenson</Button>
          <Button>Beth Fry</Button>
        </ButtonGroup>
        <Button>Continue</Button>
      </div>
    );
  }
});

module.exports = App;
