import React from 'react';
import {Motion, spring} from 'react-motion';
import Chart from '../Chart';
import Table from '../Table';

import data from '../data';
import constants from '../../constants';

const springSetting1 = {stiffness: 180, damping: 20};
const springSetting2 = {stiffness: 297, damping: 18};
const studentIndex = 6;

const StudentHypothetical = React.createClass({  

  componentWillMount() {
    window.addEventListener('touchmove', this.handleTouchMove);
    window.addEventListener('touchend', this.handleMouseUp);
    window.addEventListener('mousemove', this.handleMouseMove);
    window.addEventListener('mouseup', this.handleMouseUp);

    const scores = data.STUDENT_CHARTS.datasets[studentIndex].data;
    const aims = data.getAimLine(scores);
    const regression = data.getRegressionLine(scores);
    const scale = regression[regression.length-1]/115;
    const color = this.getRGBForScale(scale);
    const aim = 450 - (aims[scores.length]/150*450);

   // console.log(data.STUDENT_CHARTS.datasets[studentIndex]);
    this.setState({ 
      scores: scores,
      aims: aims,
      scale: scale,
      red: color.red,
      green: color.green,
      blue: color.blue,
      yPosition: regression[scores.length]/150*450,
      aim: aim,
    });
  //  console.log(aim)
  },

  handleTouchMove(e) {
    e.preventDefault();
    this.handleMouseMove(e.touches[0]);
  },

  handleMouseMove(e) {
    let y = e.pageY + this.state.layerY - this.state.pressY;
    if (y > 450) {
      y = 450;
    }
    if (y < 0) {
      y = 0;
    }



      const nextScore = (450-y)/450 * 150;
      const arr = []; //data.STUDENT_CHARTS.datasets[1].data;
      for (var index = 0; index < data.STUDENT_CHARTS.datasets[1].data.length; index++) {
        arr.push(data.STUDENT_CHARTS.datasets[studentIndex].data[index]);
      }
      arr.push(nextScore);

      const newRegression = data.getRegressionLine(arr);
      const newAim = data.getAimLine(arr);
    //  console.log(newAim[arr.length-1]);
     // console.log(newRegression[newRegression.length-1]);
      const scale = newRegression[newRegression.length-1]/115;
      const color = this.getRGBForScale(scale);


    if (this.state.isPressed) {
      this.setState({
        yPosition: y, 
        scale: scale,
        red: color.red,
        green: color.green,
        blue: color.blue,
      });
    }
  },

/*
pressY = 267
StudentHypothetical.js:53 layerY = 73
StudentHypothetical.js:54 pageY = 196

*/

  handleMouseUp() {
    this.setState({isPressed: false});
  },

  getRGBForScale(scale) {
    let color = {red: 200, green: 0, blue: 84};
    if (scale > 1.00) {
      color = {red: 170, green: 210, blue: 25};
    } else if (scale > 0.90) {
      color = {red: 32, green: 168, blue: 204};
    }
    return color;
  },

  getInitialState() {
    return {
      open: false, 
      yPosition: 450,
      scores: [],
    };
  },

  handleMouseDown(e) {
  //  console.log(' e.nativeEvent.pageY = ' + e.nativeEvent.pageY)
    console.log('yPosition = ' + e.nativeEvent.layerY)

    const nextScore = (450-e.nativeEvent.layerY)/450 * 150;
    const arr = []; //data.STUDENT_CHARTS.datasets[1].data;
    for (var index = 0; index < data.STUDENT_CHARTS.datasets[1].data.length; index++) {
      arr.push(data.STUDENT_CHARTS.datasets[studentIndex].data[index]);
    }
    arr.push(nextScore);

    const newRegression = data.getRegressionLine(arr);
    const newAim = data.getAimLine(arr);
  //  console.log(newAim[arr.length-1]);
   // console.log(newRegression[newRegression.length-1]);
    const scale = newRegression[newRegression.length-1]/115;
    const color = this.getRGBForScale(scale);
    this.setState({
      yPosition: e.nativeEvent.layerY,
      pressY: e.nativeEvent.pageY,
      layerY: e.nativeEvent.layerY,
      scale: scale,
      red: color.red,
      green: color.green,
      blue: color.blue,
      isPressed: true,
    });
  },

  handleTouchStart(e) {
    e.preventDefault();
    this.handleMouseDown();
  },

  render() {
    console.log('render')
    return (
      <div className='bar-container'>
        {
          this.state.scores.map((scores, key) => {
            const aim = this.state.aims[key]/150 * 450;
            const val = scores/this.state.aims[key] * aim;
            
            let col = constants.RED;
            if (val/aim >= 1.0) {
              col = constants.GREEN;
            } else if (val/aim >= 0.9) {
              col = constants.BLUE;
            }

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
                    backgroundColor: col,
                    height: val,
                    WebkitTransform: `translate3d(0, ${aim-val}px, 0)`,
                    transform: `translate3d(0, ${aim-val}px, 0)`,
                  }} 
                />
                { val > aim  ? <div className="line" style={{'height': this.state.val}}></div> : '' }
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
            blue: this.state.blue,
            col: '#ff0000',
          }}>
          {({height, y, scale, red, green, blue, col}) =>
            <div>
              <div className="demo0-i"
                onMouseDown={this.handleMouseDown}
                onTouchStart={this.handleTouchStart}>
                <div 
                  className="demo0-block" 
                  style={{
                    color: col,
                    height: height,
                    WebkitTransform: `translate3d(0, ${y}px, 0)`,
                    transform: `translate3d(0, ${y}px, 0)`,
                  }} 
                />
                <div className="vertical-text">{ Math.round((450-y)/450 * 150) }</div>
                <div className="line" style={{'height': this.state.aim}}></div>
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
              Next Score: { Math.round((450-y)/450 * 150) }, scale: {Math.round(scale*100)}
            </div>
          }
        </Motion>
        <Chart student={studentIndex} />
      </div>
    );
  },
});

export default StudentHypothetical;