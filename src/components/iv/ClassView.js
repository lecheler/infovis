import React from 'react';
import {Motion, spring} from 'react-motion';
import { Grid, Row, Col } from 'react-bootstrap';

// http://chenglou.github.io/react-motion/demos/demo5-spring-parameters-chooser/
const springSetting1 = {stiffness: 180, damping: 20};

const students = [
  { name:'Damaris', score: Math.round(Math.random()*100)}, // note: name treated as unique below...
  { name:'Shayla', score: Math.round(Math.random()*100)},
  { name:'Sang', score: Math.round(Math.random()*100)},
  { name:'Annete', score: Math.round(Math.random()*100)},
  { name:'Leota', score: Math.round(Math.random()*100)},
  { name:'Joseph', score: Math.round(Math.random()*100)},
  { name:'Sheila', score: Math.round(Math.random()*100)},
  { name:'Arlinda', score: Math.round(Math.random()*100)},
  { name:'Allegra', score: Math.round(Math.random()*100)},
  { name:'Melissa', score: Math.round(Math.random()*100)},
  { name:'Cordie', score: Math.round(Math.random()*100)},
  { name:'Shakira', score: Math.round(Math.random()*100)},
  { name:'Tina', score: Math.round(Math.random()*100)},
  { name:'Stephanie', score: Math.round(Math.random()*100)},
  { name:'Anisa', score: Math.round(Math.random()*100)},
];

const Demo = React.createClass({
  getInitialState() {
    return {
      mouse: [0, 0],
      delta: [0, 0], // difference between mouse and circle pos, for dragging
      lastPress: null, // key of the last pressed component
      isPressed: false,
      students: students.sort((a, b) => b.score - a.score),
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
    let total = 0;

    students.forEach((student, key) => {
      total += student.score;

     // let col = '#C80054';
     // if (student.score > 60) {
     //   col = '#AAD219';
     // } else if (student.score > 30) {
     //   col = '#20A8CC';
     // }

     // student.color = col;
    });

    console.log(total/15);
    this.setState({ready: true, avg: total/15});
  },
  render() {
    console.log(this.state.ready);
    const {lastPress, isPressed, mouse} = this.state;
    if (!this.state.ready) {
      return(
        <div>not ready</div>
      );
    }
    return (
      <Grid>
        <Row className="class-view-grid">
  
          {
            this.state.students.map((student, key) => {
              
              let scale = (student.score/this.state.avg);
              const dashColor = scale < 1 ? '#AAD219' : '#ffffff';
              let col = '#AAD219';
              if (scale < 0.75) {
                col = '#C80054';
              } else if (scale < 1.0) {
                col = '#20A8CC';
              }

              return (
                <Col key={key} xs={3} md={3}>
                  <div className='student-score-wrapper'>
                    <div className='student-score-circle-avg' 
                      style={
                        {
                          borderColor: dashColor
                        }}>
                      <div className='student-score-circle' 
                      style={
                        {
                          backgroundColor: col,
                          WebkitTransform: `scale(${scale})`,
                          transform: `scale(${scale})`,
                        }}
                      >
                      </div>
                    </div>
                  </div>
                  {student.name} ({student.score}%)
                </Col>
              );
            })
          }
        </Row>
      </Grid>
    );
  },
});

export default Demo;
