import React from 'react';
import {Motion, spring} from 'react-motion';
import { Tooltip } from 'react-bootstrap';

import data from '../data';
import constants from '../../constants';

const studentIndex = 10;
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
        aimNext: aim[student.data.length]
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

    console.log('key:' + key + '::(pressX: ' + pressX + ', pressY: '+ pressY + ')::(pageX: ' + pageX + ', pageY: ' + pageY + ')');
  },

  handleMouseUp() {
    this.setState({isPressed: false});
  },

  setInitialLayout() {
    this.state.students.forEach((student, key) => {

      /* 
        Distance from center = projected/aim

        distance = student likelihood to hit next goal (pNext/pAim)
          d > 1 = center
          d < 0.8 = perimeter

        d = pNext/pAim * 300

        1.5 = center (0)
        ex: 1.3/1.5 = 87%
        0.75 = perimeter (300)

        0.75x = 300
        x = 400

        300 + -1*(score * 400 - 300)

        300 + score*-400 + 300

        600 - score*400

        0.9x = 100

      */
      console.log(student)
     let radius =  200;
     let col = constants.RED;
     let s = this.state.students.filter(function(x){return x.score < 0.90});

     if (student.score >= 1.0) {
     //  radius = 100;
       col = constants.GREEN;
       s = this.state.students.filter(function(x){return x.score >= 1.0});
     } else if (student.score >= 0.90) {
     //  radius = 200;
       col = constants.BLUE;
       s = this.state.students.filter(function(x){return x.score > 0.90 && x.score < 1.0});
     }
     s = this.state.students;
     radius = 200;// - (student.projectedNext/student.aimNext*400) - 50;

     let testX  = radius * Math.cos(s.findIndex(x => x.name===student.name) * 2 * Math.PI / s.length) + 950/2 - 30;
     let testY  = radius * Math.sin(s.findIndex(x => x.name===student.name) * 2 * Math.PI / s.length) + 200/2 + 20;

     student.position = {x: testX, y: testY};
     student.color = col;
    });

    this.setState({ready: true});
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
    console.log(selectedStudent);
    /*

      Show (1) What they should shoot for (2) Likelihood
      OnChange (1) What they should shoot for, (2) How this impacts their EoY projection


      Sang needs to increase every measure by 6 in order to hit 115
    */
    return (
      <div className="demo2">
        <Table student={studentIndex} />
        <Chart student={studentIndex} />
        <h3>Selected Student: {selectedStudent.name}</h3>
        <div>
          <em>aim:</em> {selectedStudent.aim}, 
          <em> score:</em> {Math.round(selectedStudent.score*100)},
          <em> projected:</em> {Math.round(selectedStudent.projected)}, 
          <em> projectedNext:</em> {Math.round(selectedStudent.projectedNext)},
          <em> aimNext:</em> {Math.round(selectedStudent.aimNext)}
        </div>
        <h2>{Math.round(selectedStudent.projectedNext/selectedStudent.aimNext*100)}</h2>
        <div>
          <em>The chart below shows your students relative to their next measure goals. 
              The further away from the center circle, the further away from meeting their next measure goal. 
              Drag each student to change their next measure goal.</em>
        </div>
        <div className="demo2-main" />
  
          {
            this.state.students.map((student, key) => {
              let scale = 1;
              let style = {
                scale: spring(1, springSetting1),
              };

              if (key === lastPress && isPressed) {
                scale = 1.2;
                student.position.x = mouse[0];
                student.position.y = mouse[1];
             
                const a = mouse[0] - 450; // why is (450, 80) the center?
                const b = mouse[1] - 80;
                const distance = Math.sqrt( a*a + b*b );

                if (distance >= 250) {
                  student.color = constants.RED;
                } else if (distance >= 150) {
                  student.color = constants.BLUE;
                } else {
                  student.color = constants.GREEN;
                }

                // Math.sqrt( a*a + b*b ) = 600 - (student.projectedNext/x *400) - 50
                // Math.sqrt( a*a + b*b ) + 50 = 600 - (student.projectedNext/x *400)
                // Math.sqrt( a*a + b*b ) + 50 = 600 + -1*(student.projectedNext/x * 400)
                // Math.sqrt( a*a + b*b ) + 50 - 600 = -400 * student.projectedNext/x
                // -(Math.sqrt( a*a + b*b ) + 50 - 600)/400 = student.projectedNext/1 * 1/x
                // 1/student.projectedNext * -(Math.sqrt( a*a + b*b ) + 50 - 600)/400 = 1/x


                const n = 1/student.projectedNext * -(distance+ 50 - 600)/400;
                console.log("d = " + distance);
                console.log("new aim = " + 1/n);

                // 1/x = n
                // 1 = x * n
                // 1/n = x
                style = {
                  scale: spring(1.3, springSetting1),
                  distance: Math.round(distance),
                  newAim: 1/n,
                };
              }

              return (
                <Motion key={key} style={style}>
                  {({scale, distance, newAim}) =>
                    <div>
                      <Tooltip placement="top" className="in" id="tooltip-top" style={
                        {
                          WebkitTransform: `translate3d(${student.position.x}px, ${student.position.y-60}px, 0) scale(${scale})`,
                          transform: `translate3d(${student.position.x}px, ${student.position.y-25}px, 0) scale(${scale})`,
                        }}>
                        {Math.round(newAim)}
                      </Tooltip>
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
                          <div style={{paddingTop: '15px'}}>{newAim ? Math.round(newAim) : student.name}</div>
                      </div>
                    </div>
                  }
                </Motion>
              );
            })
          }
      </div>
    );
  },
});

export default ClassDrag;
