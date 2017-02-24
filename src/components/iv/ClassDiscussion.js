import React from 'react';
import Graph from 'react-graph-vis'
// https://sites.dartmouth.edu/learninganalytics/category/datavisualization/
// https://sites.dartmouth.edu/learninganalytics/2016/09/21/visualizing-discussion-interactions-in-a-network-graph/

let graph = {
  nodes: [
      {id: 1, color: '#e04141', shape: 'circle', value: 1},
      {id: 2, color: '#e09c41', size: 25},
      {id: 3, label: 'Node 3', color: '#e0df41', shape: 'circle'},
      {id: 4, label: 'Node 4', color: '#7be041'},
      {id: 5, label: 'Node 5', color: '#41e0c9'}
    ],
  edges: [
      {from: 1, to: 2, value: 5},
      {from: 2, to: 1, value: 2},
      {from: 1, to: 3, value: 1},
      {from: 2, to: 4, value: 1},
      {from: 1, to: 5, value: 1}
    ]
};

let options = {
  layout: {
      hierarchical: false
  },
  "edges": {
    "smooth": {
      "type": "continuous",
      "forceDirection": "vertical",
      "roundness": 0.45
    }
  },
  physics:{
    enabled: false
  }
};

let events = {
    select: function(event) {
        var { nodes, edges } = event;
        console.log("Selected nodes:");
        console.log(nodes);
        console.log("Selected edges:");
        console.log(edges);
    }
}

const ClassDiscussion = React.createClass({
  getInitialState() {
    return {open: false, yPosition: 450};
  },

  handleMouseDown(e) {
    this.setState({yPosition: e.nativeEvent.layerY});
  },

  handleTouchStart(e) {
    e.preventDefault();
    this.handleMouseDown();
  },

  render() {
    return (
      <div>
        <Graph graph={graph} options={options} />
      </div>
    );
  },
});

export default ClassDiscussion;