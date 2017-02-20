import React from 'react';
import {Motion, spring} from 'react-motion';

const scores = [
  Math.round(Math.random()*100),
  Math.round(Math.random()*100),
  Math.round(Math.random()*100),
  Math.round(Math.random()*100),
  Math.round(Math.random()*100),
  Math.round(Math.random()*100),
  Math.round(Math.random()*100),
  Math.round(Math.random()*100),
  Math.round(Math.random()*100),
  Math.round(Math.random()*100) 
];

const StudentHypothetical = React.createClass({
  getInitialState() {
    return {open: false, yPosition: 450};
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
      <div className='bar-container'>
        {
          scores.map((scores, key) => {
            const val = (scores/100) * 450;
            
            return (
              <div key={key} className="demo0">
                <div 
                  className="demo0-block" 
                  style={{
                    height: 450-val,
                    WebkitTransform: `translate3d(0, ${val}px, 0)`,
                    transform: `translate3d(0, ${val}px, 0)`,
                  }} 
                />
              </div>
            );
          })
        }
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
        <div className='student-score-wrapper-lg'>
          <div className='student-score-circle-avg-lg' 
            style={
              {
                borderColor: '#e6e6e6'
              }}>
            <div className='student-score-circle-lg' 
            style={
              {
                backgroundColor: '#AAD219',
                WebkitTransform: `scale(${0.8})`,
                transform: `scale(${0.8})`,
              }}
            >
            </div>
          </div>
        </div>
      </div>
    );
  },
});

export default StudentHypothetical;