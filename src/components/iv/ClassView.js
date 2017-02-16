import React from 'react';
import {Motion, spring} from 'react-motion';
import { Grid, Row, Col } from 'react-bootstrap';

// http://chenglou.github.io/react-motion/demos/demo5-spring-parameters-chooser/
const springSetting1 = {stiffness: 180, damping: 20};

const students = [
  { name:'a', score: Math.round(Math.random()*100)}, // note: name treated as unique below...
  { name:'b', score: Math.round(Math.random()*100)},
  { name:'c', score: Math.round(Math.random()*100)},
  { name:'d', score: Math.round(Math.random()*100)},
  { name:'e', score: Math.round(Math.random()*100)},
  { name:'f', score: Math.round(Math.random()*100)},
  { name:'g', score: Math.round(Math.random()*100)},
  { name:'h', score: Math.round(Math.random()*100)},
  { name:'i', score: Math.round(Math.random()*100)},
  { name:'j', score: Math.round(Math.random()*100)},
  { name:'k', score: Math.round(Math.random()*100)},
  { name:'l', score: Math.round(Math.random()*100)},
  { name:'m', score: Math.round(Math.random()*100)},
  { name:'n', score: Math.round(Math.random()*100)},
  { name:'o', score: Math.round(Math.random()*100)},
];

const avg = 80;

const Demo = React.createClass({
  getInitialState() {
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
    students.forEach((student, key) => {
      
     let col = '#C80054';
     if (student.score > 60) {
       col = '#AAD219';
     } else if (student.score > 30) {
       col = '#20A8CC';
     }

     student.color = col;
    });

    this.setState({ready: true});
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
        <Row className="show-grid">
  
          {
            this.state.students.map((student, key) => {
              
              let scale = (student.score/avg);
              const col = scale < 1 ? '#AAD219' : '#ffffff';

              return (
                <Col key={key} xs={3} md={4}>
                  <div className='student-score-wrapper'>
                    <div className='student-score-circle-avg' 
                      style={
                        {
                          borderColor: col
                        }}>
                      <div className='student-score-circle' 
                      style={
                        {
                          backgroundColor: student.color,
                          WebkitTransform: `scale(${scale})`,
                          transform: `scale(${scale})`,
                        }}
                      >
                      {student.score}
                      </div>
                    </div>
                  </div>
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
