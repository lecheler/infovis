import React from 'react';
import { Motion, spring } from 'react-motion';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';


import data from '../data';
import constants from '../../constants';

const springSetting1 = {stiffness: 180, damping: 20};
const springSetting2 = {stiffness: 297, damping: 18};
const studentIndex = 5;

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

    this.setState({ 
      scores: scores,
      name: data.STUDENT_CHARTS.datasets[studentIndex].name,
      aims: aims,
      scale: scale,
      color: color,
      yPosition: 450 - (regression[scores.length]/150*450),
      aim: aim,
      barColor: this.getRGBForScale(regression[scores.length]/aims[scores.length]),
    });
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
    const scale = newRegression[newRegression.length-1]/115;
    const color = this.getRGBForScale(scale);
    const barScale = nextScore/this.state.aims[this.state.scores.length];


    if (this.state.isPressed) {
      this.setState({
        yPosition: y, 
        scale: scale,
        color: color,
        barColor: this.getRGBForScale(barScale),
      });
    }
  },

  handleMouseUp() {
    this.setState({isPressed: false});
  },

  getRGBForScale(scale) {
    let color = {red: 200, green: 0, blue: 84};
    if (scale >= 1.00) {
      color = {red: 170, green: 210, blue: 25};
    } else if (scale >= 0.90) {
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
    const nextScore = (450-e.nativeEvent.layerY)/450 * 150;
    const arr = []; //data.STUDENT_CHARTS.datasets[1].data;
    for (var index = 0; index < data.STUDENT_CHARTS.datasets[1].data.length; index++) {
      arr.push(data.STUDENT_CHARTS.datasets[studentIndex].data[index]);
    }
    arr.push(nextScore);

    const newRegression = data.getRegressionLine(arr);
    const scale = newRegression[newRegression.length-1]/115;
    const barScale = nextScore/this.state.aims[this.state.scores.length];
    const color = this.getRGBForScale(scale);
    this.setState({
      yPosition: e.nativeEvent.layerY,
      pressY: e.nativeEvent.pageY,
      layerY: e.nativeEvent.layerY,
      scale: scale,
      color: color,
      isPressed: true,
      barColor: this.getRGBForScale(barScale),
    });
  },

  handleTouchStart(e) {
    e.preventDefault();
    this.handleMouseDown();
  },

  render() {
    return (
      <div className='bar-container'>
        <h4>{this.state.name} Next Score vs. Projected</h4>
        <p><em>The last bar represents the student's next score. Click or drag it to update the circle representing progress to his or her end of year goal.</em></p>
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
                <OverlayTrigger placement="top" overlay={<Tooltip id="tooltip">Score: {Math.round(scores)}</Tooltip>}>
                  <div 
                    className="demo0-block" 
                    style={{
                      backgroundColor: col,
                      height: val,
                      WebkitTransform: `translate3d(0, ${aim-val}px, 0)`,
                      transform: `translate3d(0, ${aim-val}px, 0)`,
                    }} 
                  />
                </OverlayTrigger>
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
            red: this.state.color.red,
            green: this.state.color.green,
            blue: this.state.color.blue,
            bRed: this.state.barColor.red,
            bGreen: this.state.barColor.green,
            bBlue: this.state.barColor.blue,
          }}>
          {({height, y, scale, red, green, blue, bRed, bGreen, bBlue}) =>
            <div>
              <div className="demo0-i"
                onMouseDown={this.handleMouseDown}
                onTouchStart={this.handleTouchStart}>
                  <div 
                    className="demo0-block" 
                    style={{
                      height: height,
                      backgroundColor: `rgb(${bRed}, ${bGreen}, ${bBlue})`,
                      WebkitTransform: `translate3d(0, ${y}px, 0)`,
                      transform: `translate3d(0, ${y}px, 0)`,
                    }} 
                  > 
                    <Tooltip placement="right" className="in unselectable" id="tooltip-dynamic-right">
                      Projected: { Math.round((450-y)/450 * 150) }
                    </Tooltip>
                  </div>
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
            </div>
          }
        </Motion>
      </div>
    );
  },
});

export default StudentHypothetical;