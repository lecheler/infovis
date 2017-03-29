import React from 'react';
import { Button, Well } from 'react-bootstrap';

import TLXItem from './TLXItem';

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
    description: 'How hard did you have to work (mentally and physically) to accomplish your level of performance?',
  },
  {
    title: 'Frustration',
    score: -1,
    description: 'How insecure, discouraged, irritated, stressed and annoyed versus secure, gratified, content, relaxed and complacent did you feel during the task?',
  },
];

const TLX = React.createClass({
  getInitialState() {
    return {
      measures: measures,
    };
  },

  handleScaleClick(key, value) {
    console.log(measures[key].title + ' = ' + value);
    measures[key].score = value;

    this.setState({ measures: measures });
  },

  submit() {
    for (let i=0; i < this.state.measures.length; i++) {
      console.log(this.state.measures[i].score);

      if (this.state.measures[i].score === -1) {
        alert('please answer all of the questions');
        return;
      }
    }
  },

  render() {
    return (
      <div>
        <h1>Performance Feedback</h1>
        <em>Please rate your experience with the questions you just answered on the following scales:</em>
        <Well>
        {
          measures.map((measure, key) => {
            return (
              <TLXItem key={key} title={measure.title} description={measure.description} scaleClick={this.handleScaleClick.bind(null, key)} />
            );
          })
        }
        </Well>
        <Button bsStyle="primary pull-right" onClick={this.submit}>Submit</Button>
      </div>
    );
  },
});

export default TLX;
