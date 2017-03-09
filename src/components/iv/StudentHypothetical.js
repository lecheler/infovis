import React from 'react';
import {Motion, spring} from 'react-motion';
import regression from 'regression';

import data from '../data';

const springSetting1 = {stiffness: 180, damping: 20};
const springSetting2 = {stiffness: 297, damping: 18};
const studentIndex = 3;

const StudentHypothetical = React.createClass({
  //    const s = this.state.regression[this.state.regression.length-1]/115;
  

  componentWillMount() {
    const scores = data.STUDENT_CHARTS.datasets[studentIndex].data;
    const aims = this.getAimLine(scores);
    const regression = this.getRegressionLine(scores);
    const scale = regression[regression.length-1]/115;
    const color = this.getRGBForScale(scale);

    this.setState({ 
      scores: scores,
      aims: aims,
      scale: scale,
      red: color.red,
      green: color.green,
      blue: color.blue
    });
  },

  getRGBForScale(scale) {
    console.log(scale)
    let color = {red: 200, green: 0, blue: 84};
    if (scale > 1.10) {
      color = {red: 170, green: 210, blue: 25};
    } else if (scale > 0.90) {
      color = {red: 32, green: 168, blue: 204};
    }
    return color;
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
      scores: [],
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
      arr.push(data.STUDENT_CHARTS.datasets[studentIndex].data[index]);
    }
    arr.push(nextScore);

    const newRegression = this.getRegressionLine(arr);
    const scale = newRegression[newRegression.length-1]/115;
    const color = this.getRGBForScale(scale);
    this.setState({
      yPosition: e.nativeEvent.layerY,
      scale: scale,
      red: color.red,
      green: color.green,
      blue: color.blue
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
            red: this.state.red,
            green: this.state.green,
            blue: this.state.blue
          }}>
          {({height, y, scale, red, green, blue}) =>
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
                      backgroundColor: `rgb(${red}, ${green}, ${blue})`,
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