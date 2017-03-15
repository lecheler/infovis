import React from 'react';
import {Motion, spring} from 'react-motion';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

import data from '../data';
import constants from '../../constants';

const studentIndex = 10;
const circleRadius = 200;
const ballSize = 60;

import Table from '../Table';
import Chart from '../Chart';

// http://chenglou.github.io/react-motion/demos/demo5-spring-parameters-chooser/
const springSetting1 = {stiffness: 180, damping: 20};

const ClassDrag = React.createClass({
  getInitialState() {

    const students = data.STUDENT_CHARTS.datasets.map((student, key) => {
      const regression = data.getRegressionLine(student.data);
      const aim = data.getAimLine(student.data);
      const score = regression[regression.length-1]/115;
      return {
        name: student.name, 
        score: score, 
        aim: 115, 
        projected: regression[regression.length-1], 
        projectedNext: regression[student.data.length],
        aimNext: aim[student.data.length],
        newAim: aim[student.data.length],
        newEndOfYear: Math.round(regression[student.data.length]),
        data: student.data
      };
    });

    return {
      mouse: [0, 0],
      delta: [0, 0], // difference between mouse and circle pos, for dragging
      lastPress: null, // key of the last pressed component
      isPressed: false,
      students: students,
      ready: false,
    };
  },

  componentDidMount() {
    window.addEventListener('touchmove', this.handleTouchMove);
    window.addEventListener('touchend', this.handleMouseUp);
    window.addEventListener('mousemove', this.handleMouseMove);
    window.addEventListener('mouseup', this.handleMouseUp);

    this.setInitialLayout();
  },

  handleTouchStart(key, pressLocation, e) {
    this.handleMouseDown(key, pressLocation, e.touches[0]);
  },

  handleTouchMove(e) {
    e.preventDefault();
    this.handleMouseMove(e.touches[0]);
  },

  handleMouseMove({pageX, pageY}) {
    const {isPressed, delta: [dx, dy]} = this.state;
    if (isPressed) {
      const mouse = [pageX - dx, pageY - dy];
      this.setState({mouse: mouse});
    }
  },

  handleMouseDown(key, [pressX, pressY], {pageX, pageY}) {
    this.setState({
      lastPress: key,
      isPressed: true,
      delta: [pageX - pressX, pageY - pressY],
      mouse: [pressX, pressY],
    });

  //  console.log('key:' + key + '::(pressX: ' + pressX + ', pressY: '+ pressY + ')::(pageX: ' + pageX + ', pageY: ' + pageY + ')');
  },

  handleMouseUp() {
    this.setState({isPressed: false});
  },

  setInitialLayout() {
    this.state.students.forEach((student, key) => {

      let radius =  300;
      let a = student.projectedNext/student.aimNext;
      let col = constants.RED;
      let s = this.state.students.filter(function(x){return x.score < 0.90});

     // a = (0.5 + d/380) * projected
    //  student.aimNext = student.projectedNext * (0.5 + d/380)
    // student.aimNext/student.projectedNext = 0.5 + d/380
    // student.aimNext/student.projectedNext - 0.5 = d/380
    // 380*(student.aimNext/student.projectedNext - 0.5) = d

      if (a >= 1.0) {
        radius = 0;
       col = constants.GREEN;
      } else if (a >= 0.90) {
       col = constants.BLUE;
      }

      s = this.state.students;
    //  radius = 200; // 380*a - 190;
      radius = 380*(student.aimNext/student.projectedNext - 0.5);

      let testX  = radius * Math.cos(s.findIndex(x => x.name===student.name) * 2 * Math.PI / s.length) + circleRadius - ballSize/2;
      let testY  = radius * Math.sin(s.findIndex(x => x.name===student.name) * 2 * Math.PI / s.length) + circleRadius - ballSize/2;

      student.position = {x: testX, y: testY};
      student.color = col;
    });

    this.setState({ready: true});
  },

  getPropsForScore(score) {

  },

  render() {
    const {lastPress, isPressed, mouse} = this.state;
    if (!this.state.ready) {
      return(
        <div>not ready</div>
      );
    }

    let selectedStudent = '---';
    if (this.state.lastPress) {
      selectedStudent = this.state.students[this.state.lastPress];
    }

    let studentInfo = (
      <div>Select a student</div>
    );
    let fontColor = constants.RED;
    if (selectedStudent.newEndOfYear/115 >= 1.0) {
      fontColor = constants.GREEN;
    } else if (selectedStudent.newEndOfYear/115 >= 0.9) {
      fontColor = constants.BLUE;
    }

    return (
      <div>        
        <div className="class-drag" ref="classDrag">
          
          <div style={{padding: '20px'}}>
            <p><b>{selectedStudent ? selectedStudent.name : 'Select a Student'}</b> will now see a goal of 
              <b> {Math.round(selectedStudent.newAim)}</b>. By reaching this goal, she is projected to achieve
              <b style={{color: fontColor}}> {selectedStudent.newEndOfYear}</b> by the end of the year.
            </p>
          </div>
          <div className="ball-background">
    
            {
              this.state.students.map((student, key) => {
                let scale = 1;
                let style = {
                  scale: spring(1, springSetting1),
                };

                if (key === lastPress && isPressed) {

                  // Limit x, y of circle dragging
                  const xMax = 500;
                  const xMin = -170;
                  const yMax = 500;
                  const yMin = -170;

                  if (mouse[1] > yMin && mouse[1] <= yMax) {
                    student.position.y = mouse[1];
                  } else if (mouse[1] > yMax) {
                    student.position.y = yMax;
                  } else {
                    student.position.y = yMin;
                  }

                  if (mouse[0] > xMin && mouse[0] <= xMax) {
                    student.position.x = mouse[0];
                  } else if (mouse[0] > xMax) {
                    student.position.x = xMax;
                  } else {
                    student.position.x = xMin;
                  }
               
                  // Calculate newAim for distance

                  const centerX = circleRadius - ballSize/2;
                  const centerY = circleRadius - ballSize/2;

                  const mx = student.position.x - centerX;
                  const my = student.position.y - centerY;
                  const d = Math.sqrt( mx*mx + my*my );
                  const p = 0.5 + d/380;

                  const newAim = p * student.projectedNext;
                  // a = (0.5 + d/380) * projected
                  student.newAim = newAim;

                  const arr = [];
                  for (var index = 0; index < student.data.length; index++) {
                    arr.push(student.data[index]);
                  }
                  arr.push(newAim); 
                  
                  const regression = data.getRegressionLine(arr);

                  student.newEndOfYear = Math.round(regression[regression.length-1]);


                  if (p > 1.1) {
                    student.color = constants.RED;
                  } else if (p > 1.0) {
                    student.color = constants.BLUE;
                  } else {
                    student.color = constants.GREEN;
                  }

                  style = {
                    scale: spring(1.1, springSetting1),
                    distance: Math.round(d),
                    newAim: Math.round(newAim),
                  };
                }

                return (
                  <Motion key={key} style={style}>
                    {({scale, distance, newAim}) =>
                      <div>
                        <div 
                          onMouseDown={this.handleMouseDown.bind(null, key, [student.position.x, student.position.y])}
                          onTouchStart={this.handleTouchStart.bind(null, key, [student.position.x, student.position.y])}
                          key={key}
                          className="student-ball"
                          style={
                            {
                              backgroundColor: student.color,
                              WebkitTransform: `translate3d(${student.position.x}px, ${student.position.y}px, 0) scale(${scale})`,
                              transform: `translate3d(${student.position.x}px, ${student.position.y}px, 0) scale(${scale})`,
                            }}>
                            <div className="unselectable" style={{paddingTop: '17px'}}>{newAim ? Math.round(newAim) : student.name}</div>
                        </div>
                      </div>
                    }
                  </Motion>
                );
              })
            }
            </div>
          </div>
        <div>
          <img src='../../drag_key.png' />
          <em>The chart below shows your students relative to their next measure goals. 
              The further away from the center circle, the further away from meeting their next measure goal. 
              Drag each student to change their next measure goal.</em>
        </div>
      </div>
    );
  },
});

export default ClassDrag;

/*

<div style={{paddingTop: '17px'}}>{newAim ? Math.round(newAim) : student.name}</div>

 <Tooltip placement="top" className="in" id="tooltip-top" style={
                        {
                          visibility: hidden,
                          WebkitTransform: `translate3d(${student.position.x}px, ${student.position.y-60}px, 0) scale(${scale})`,
                          transform: `translate3d(${student.position.x}px, ${student.position.y-25}px, 0) scale(${scale})`,
                        }}>
                        {Math.round(newAim)}
                      </Tooltip>
*/
