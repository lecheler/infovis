import React from 'react';
import { Button, Modal } from 'react-bootstrap';

import TLX from './questions/TLX';

const FeedbackModal = React.createClass({
  componentDidMount() {
    console.log('feedbackModal mounted');
  },

  submit() {
    console.log('submit feedback!');
  },

  render() {
    return (
      <div>
        <Modal show={this.props.show}>
          <Modal.Body>
            <TLX />
          </Modal.Body>
          <Modal.Footer>
            <Button bsStyle="primary pull-right" onClick={this.submit}>Submit</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
});

export default FeedbackModal;
