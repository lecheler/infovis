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
        id: key,
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

      const distance =  380*(student.aimNext/student.projectedNext - 0.5);
      let col = constants.RED;
      let s = 5;
      if (student.projectedNext/student.aimNext >= 1.0) {
        s = 1
        col = constants.GREEN;
      } else if (student.projectedNext/student.aimNext >= 0.9) {
        col = constants.BLUE;
        s = 3
      }
      s = 15;

      let testX  = distance * Math.cos(student.id * 2 * Math.PI / s) + circleRadius - ballSize/2;
      let testY  = distance * Math.sin(student.id * 2 * Math.PI / s) + circleRadius - ballSize/2;

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

    let studentInfo = (
      <div style={{padding: '20px'}}>
        <h3>Select a student</h3>
        <p>Dragging the student circle relative to the center changes the student's goal for the next measure</p>
      </div>
    );
    let selectedStudent;

    if (this.state.lastPress) {
      selectedStudent = this.state.students[this.state.lastPress];
      let eoyColor = constants.RED;
      if (selectedStudent.newEndOfYear/115 >= 1.0) {
        eoyColor = constants.GREEN;
      } else if (selectedStudent.newEndOfYear/115 >= 0.9) {
        eoyColor = constants.BLUE;
      }
      studentInfo = (
        <div style={{padding: '20px'}}>
          <h3>{selectedStudent.name}</h3>
          <p><b>{selectedStudent.name}</b> will now see a goal 
          of <span style={{backgroundColor: selectedStudent.color, color: 'white', padding: '5px', borderRadius: '5px'}}> {Math.round(selectedStudent.newAim)}</span>.
            If she reaches this goal, she is projected to 
            achieve <span style={{backgroundColor: eoyColor, color: 'white', padding: '5px', borderRadius: '5px'}}>
              {selectedStudent.newEndOfYear}
            </span> by the end of the year.
          </p>
        </div>
      );
    }
    return (
      <div>        
        <div className="class-drag" ref="classDrag">
          {studentInfo}
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
          <img src='../../drag_key.png' width="600px" />
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
