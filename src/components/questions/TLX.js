import React from 'react';
import { Alert, Button, Modal, Well } from 'react-bootstrap';

import TLXItem from './TLXItem';

const TLX = React.createClass({

  getInitialState() {
    return {
      measures: measures,
      scores: [],
    };
  },

  handleScaleClick(key, value) {
    measures[key].score = value;

    if (this.surveyComplete()) {
      this.setState({ submitActive: true });
    };

    this.setState({ measures: measures });
  },

  surveyComplete() {
    for (let i=0; i < this.state.measures.length; i++) {
      if (this.state.measures[i].score === -1) {
        return false;
      }
    }
    return true;
  },

  submit() {
    // let m = [];
    // for (let i=0; i < this.state.measures.length; i++) {
    //   this.state.measures[i].score = -1;
    //   m.push(this.state.measures[i].score);
    // }

    // need to clear measures score somehow;

    this.props.submit(this.state.measures);
 //   this.setState({measures: m});
  },

  render() {
    let btn = <Button className="pull-right" bsStyle="primary" onClick={this.submit} disabled>Submit</Button>;
    if (this.state.submitActive) {
      btn = <Button className="pull-right" bsStyle="primary" onClick={this.submit}>Submit</Button>;
    }
    return (
      <div>
        <Modal show={this.props.show}>
          <Modal.Body>
            { alert }
            <div>
              {
                measures.map((measure, key) => {
                  return (
                    <TLXItem 
                      key={key} 
                      title={measure.title} 
                      description={measure.description} 
                      scaleClick={this.handleScaleClick.bind(null, key)} />
                  );
                })
              }
            </div>
          </Modal.Body>
          <Modal.Footer>
            {btn}
          </Modal.Footer>
        </Modal>
      </div>
    );
  },
});

export default TLX;

const measures = [
  {
    title: 'Mental Demand',
    score: -1,
    description: 'How much mental and perceptual activity was required (e.g. thinking, deciding, calculating, remembering, looking, searching, etc)? Was the task easy or demanding, simple or complex, exacting or forgiving?',
  },
  {
    title: 'Temporal Demand',
    score: -1,
    description: 'How much time pressure did you feel due to the rate of pace at which the tasks or task elements occurred? Was the pace slow and leisurely or rapid and frantic?',
  },
  {
    title: 'Performance',
    score: -1,
    description: 'How successful do you think you were in accomplishing the goals of the task set by the experimenter (or yourself)? How satisfied were you with your performance in accomplishing these goals?',
  },
  {
    title: 'Effort',
    score: -1,
    description: 'How hard did you have to work to accomplish your level of performance?',
  },
  {
    title: 'Frustration',
    score: -1,
    description: 'How insecure, discouraged, irritated, stressed and annoyed versus secure, gratified, content, relaxed and complacent did you feel during the task?',
  },
];