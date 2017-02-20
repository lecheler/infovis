import React from 'react';
import {Motion, spring} from 'react-motion';

const springSetting1 = {stiffness: 180, damping: 20};
const springSetting2 = {stiffness: 297, damping: 18};

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

const avg = 60;

const StudentHypothetical = React.createClass({
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
        <Motion 
          style={{
            height: spring(450-this.state.yPosition, springSetting1), 
            y: spring(this.state.yPosition, springSetting1),
            scale: spring(((450-this.state.yPosition)/450), springSetting2)
          }}>
          {({height, y, scale}) =>
            <div>
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
                      WebkitTransform: `scale(${scale})`,
                      transform: `scale(${scale})`,
                    }}
                  >
                  </div>
                </div>
              </div>
            </div>
          }
        </Motion>
        
      </div>
    );
  },
});

export default StudentHypothetical;