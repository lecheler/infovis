import React from 'react';

import Table from '../Table';
import ClassDrag from './ClassDrag';
import ClassView from './ClassView';
import StudentHypothetical from './StudentHypothetical';

import questionData from '../questions/questionData';

const questionHistory = [];

const IVContainer = React.createClass({
  getInitialState() {
    return {
      selectedKey: -1,
      hoveredKey: -1,
    };
  },

  getIvPrompt() {
    let iv;
    switch(this.props.blockId) {
      case 0:
        iv = <ClassView />
        break;
      case 1:
        iv = <StudentHypothetical />
        break;
      case 2:
        iv = <ClassDrag />
        break;
    }

    return this.props.useTable ? <Table /> : iv;
  },

  render() {
    return (
      <div style={{ paddingTop: '50px' }}>
        { this.getIvPrompt() }
      </div>
    );
  },
});

export default IVContainer;