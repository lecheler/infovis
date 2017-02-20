import React from 'react';
import {Motion, spring} from 'react-motion';

const StudentHypothetical = React.createClass({
  getInitialState() {
    return {open: false, yPosition: 0};
  },

  handleMouseDown(e) {
    console.log(e.nativeEvent)
    this.setState({yPosition: e.nativeEvent.layerY});
  },

  handleTouchStart(e) {
    e.preventDefault();
    this.handleMouseDown();
  },

  render() {
    return (
      <div>
        <Motion style={{height: spring(450-this.state.yPosition), y: spring(this.state.yPosition)}}>
          {({height, y}) =>
            // children is a callback which should accept the current value of
            // `style`
            <div className="demo0"
              onMouseDown={this.handleMouseDown}
              onTouchStart={this.handleTouchStart}>
              <div 
                className="demo0-block" 
                style={{
                  height: height,
                  WebkitTransform: `translate3d(0, ${y}px, 0)`,
                  transform: `translate3d(0, ${y}px, 0)`,
                }} 
              />
            </div>
          }
        </Motion>
      </div>
    );
  },
});

export default StudentHypothetical;