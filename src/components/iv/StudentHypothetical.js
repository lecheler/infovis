import React from 'react';
import {Motion, spring} from 'react-motion';
import regression from 'regression';

import data from '../data';

const springSetting1 = {stiffness: 180, damping: 20};
const springSetting2 = {stiffness: 297, damping: 18};

const StudentHypothetical = React.createClass({
  //    const s = this.state.regression[this.state.regression.length-1]/115;
  

  componentWillMount() {
    const scores = data.STUDENT_CHARTS.datasets[4].data;
    const aims = this.getAimLine(scores);
    const regression = this.getRegressionLine(scores);
    const scale = regression[regression.length-1]/115;

    this.setState({ 
      scores: scores,
      aims: aims,
      scale: scale,
    });
  },

  getAimLine(points) {
    const interval = (115 - points[0])/(data.STUDENT_CHARTS.labels.length-1);

    let start = points[0];
    let val = [start];

    for (var index = 1; index < data.STUDENT_CHARTS.labels.length; index++) {
      val.push(start+=interval);
    }

    return val;
  },

  getInitialState() {
    return {
      open: false, 
      yPosition: 450,
      scores: []
    };
  },

  getRegressionLine(points) {
    const d = points.map((student, key) => {
      return([key, student]);
    });

    const result = regression('linear', d); 
    const m = result.equation[0];
    const y = result.equation[1];

    let val = [];
    for (var index = 0; index < data.STUDENT_CHARTS.labels.length; index++) {
      val.push(m*index + y);
    }

    return val;
  },

  handleMouseDown(e) {
    const nextScore = (450-e.nativeEvent.layerY)/450 * 150;
    const arr = []; //data.STUDENT_CHARTS.datasets[1].data;
    for (var index = 0; index < data.STUDENT_CHARTS.datasets[1].data.length; index++) {
      arr.push(data.STUDENT_CHARTS.datasets[4].data[index]);
    }
    arr.push(nextScore);

    const newRegression = this.getRegressionLine(arr);

  //  console.log(newRegression);

    this.setState({
      yPosition: e.nativeEvent.layerY,
      scale: newRegression[newRegression.length-1]/115
    });
  },

  handleTouchStart(e) {
    e.preventDefault();
    this.handleMouseDown();
  },

  render() {
    return (
      <div className='bar-container'>
        {
          this.state.scores.map((scores, key) => {
            const aim = this.state.aims[key]/150 * 450;
            const val = scores/this.state.aims[key] * aim;
   
            return (
              <div key={key} className="demo0" 
                style={{
                  height: aim,
                  WebkitTransform: `translate3d(0, ${450-aim}px, 0)`,
                  transform: `translate3d(0, ${450-aim}px, 0)`,
                }} 
              >
              <div 
                  className="demo0-block" 
                  style={{
                    height: val,
                    WebkitTransform: `translate3d(0, ${aim-val}px, 0)`,
                    transform: `translate3d(0, ${aim-val}px, 0)`,
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
            scale: spring(this.state.scale, springSetting2),
            color: 'red'
          }}>
          {({height, y, scale, color}) =>
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
                      backgroundColor: '#ff0000',
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