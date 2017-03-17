import React from 'react';
import {Motion, spring} from 'react-motion';
import { Grid, Row, Col } from 'react-bootstrap';

import data from '../data';

// http://chenglou.github.io/react-motion/demos/demo5-spring-parameters-chooser/
const springSetting1 = {stiffness: 180, damping: 20};

const ClassView = React.createClass({
  getInitialState() {

    const d = data.STUDENT_CHARTS.datasets.map((student, key) => {
      const r = data.getRegressionLine(student.data);
      const a = data.getAimLine(student.data);
      const scale = r[r.length-1]/a[a.length-1];
      
      return { name: student.name, scale: scale }
    });

    return {
      mouse: [0, 0],
      delta: [0, 0], // difference between mouse and circle pos, for dragging
      lastPress: null, // key of the last pressed component
      isPressed: false,
      students: d.sort((a, b) => b.scale - a.scale),
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
    this.setState({ready: true});
  },
  render() {
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

              const dashColor = student.scale < 1 ? '#AAD219' : '#ffffff';
              let col = '#AAD219';
              if (student.scale < 0.90) {
                col = '#C80054';
              } else if (student.scale < 1.0) {
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
                          WebkitTransform: `scale(${student.scale})`,
                          transform: `scale(${student.scale})`,
                        }}
                      >
                      </div>
                    </div>
                  </div>
                  {student.name} ({Math.round(student.scale*100)}%)
                </Col>
              );
            })
          }
        </Row>
      </Grid>
    );
  },
});

export default ClassView;
